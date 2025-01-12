import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importing axios
import { handleError, handleSuccess } from "../utils";
import "./SignUp.css"; // Import the CSS file

interface SignupInfo {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  // initialise the field values for signup
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: "",
    email: "",
    password: "",
  });

  // for to show password option on password filed
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  // A developer uses useNavigate() in React (from react-router-dom) to programmatically navigate between routes.
  // It provides a way to redirect users or change the URL without using <Link> or <NavLink>.
  const navigate = useNavigate();

  // handles user's input for all the signupinfo input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));

    // Show dropdown only while typing in the password field
    if (name === "password") {
      setShowDropdown(value.length > 0);
    }
  };

  // important function handles submission of user info
  const handleSignup = async (e: FormEvent): Promise<void> => {
    // Prevent the form's default behavior of refreshing the page
    e.preventDefault();

    // Destructure user inputs from the signupInfo state
    const { name, email, password } = signupInfo;

    // Validation: Check if all required fields are filled
    if (!name || !email || !password) {
      // Display an error message if any field is missing
      return handleError("Name, email, and password are required");
    }

    try {
      // API endpoint for the signup process
      const url = `http://localhost:5050/auth/signup`;

      // Send a POST request to the server with user data
      const response = await axios.post(url, signupInfo);

      // Destructure the response to extract important data
      const { success, message, error } = response.data;

      // Handle a successful signup response
      if (success) {
        console.log("aaa1 success:", success);

        // Display success feedback to the user
        handleSuccess("bruh mosambi chus le , tera account ban gya"); // Fun message :)

        // Clear the signup form fields
        setSignupInfo({
          name: "",
          email: "",
          password: "",
        });

        // Navigate to the login page after 1 second
        setTimeout(() => {
          navigate("/login");
        }, 1000);

        // Handle validation errors returned by the server
      } else if (error) {
        // Display each validation error (e.g., "Email is invalid")
        error.forEach((error: { message: string }) => {
          handleError(error.message);
        });

        // Handle any other case where success is `false` but no specific error is returned
      } else if (!success) {
        // Show a general error message or use the message provided by the server
        handleError(message || "An error occurred");
      }

      // Handle errors during the API request
    } catch (err) {
      // Check if the error is an Axios error and contains a server response
      if (axios.isAxiosError(err) && err.response) {
        // Display the server-provided error message (if available)
        handleError(err.response.data.message || "Something went wrong");
      } else {
        // Handle unexpected errors (e.g., network issues)
        handleError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {showDropdown && (
            <div className="password-requirements-dropdown">
              <p>Password Requirements:</p>
              <ul>
                <li>6-30 characters</li>
                <li>At least 1 uppercase letter (A-Z)</li>
                <li>At least 1 lowercase letter (a-z)</li>
                <li>At least 1 number (0-9)</li>
                <li>
                  At least 1 special character (@, $, !, %, *, ?, &, -, _)
                </li>
              </ul>
            </div>
          )}
        </div>
        <button className="signup-button" type="submit">
          Signup
        </button>
        <span className="login-link">
          Already have an account? <Link to="/Login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
