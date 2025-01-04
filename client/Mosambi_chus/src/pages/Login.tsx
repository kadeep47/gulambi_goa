import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importing axios
import { handleError, handleSuccess } from "../utils";
import { useAuth } from "../context/AuthContext"; // Importing AuthContext
import "./Login.css"; // Import the CSS file

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName, setUserEmail } = useAuth(); // Access AuthContext
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `http://localhost:5050/auth/login`;

      // Using axios to make the POST request
      const response = await axios.post(url, loginInfo);

      const { success, message, token, user, error } = response.data;

      if (success) {
        handleSuccess(message);

        // Store token and user info in localStorage (optional, for persistence)
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", user.name);
        localStorage.setItem("userEmail", user.email);

        // Update the context state to reflect login status
        setIsLoggedIn(true);
        setUserName(user.name);
        setUserEmail(user.email);

        // Navigate to the main page after successful login
        navigate("/goa");
      } else if (error) {
        // Loop through validation errors and display them
        error.forEach((error: { message: string }) => {
          handleError(error.message);
        });
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      // Handling axios error
      if (axios.isAxiosError(err) && err.response) {
        handleError(
          err.response.data.message || "An error occurred while logging in"
        );
      } else {
        handleError("An unexpected error while logging in");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
            required
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
              value={loginInfo.password}
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
        <button className="login-button" type="submit">
          Login
        </button>
        <span className="signup-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
