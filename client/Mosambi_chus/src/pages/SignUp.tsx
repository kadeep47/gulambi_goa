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
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    try {
      const url = `http://localhost:5050/auth/signup`;

      console.log("signupInfo", signupInfo);

      // Using axios to make the POST request
      const response = await axios.post(url, signupInfo);

      const { success, message, error } = response.data;
      // console.log("success:", success);
      // console.log("message:", message);
      // console.log("error:", error);
      if (success) {
        console.log("aaa1 success:", success);
        handleSuccess("bruh mosambi chus le , tera account ban gya");
        // Clear the form fields
        setSignupInfo({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        console.log("aaa2 error:", error);
        // Loop through validation errors and display them
        error.forEach((error: { message: string }) => {
          handleError(error.message);
        });
      } else if (!success) {
        console.log("aaa3 message:", message);
        handleError(message || " An error occured");
      }
    } catch (err) {
      // Handling errors using axios error response structure
      if (axios.isAxiosError(err) && err.response) {
        handleError(err.response.data.message || "Something went wrong");
      } else {
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
