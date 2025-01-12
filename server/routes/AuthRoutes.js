// file name is AuthRoutes.js 
// rate limiting implementation incase of brute force 

import express from "express";
import User from "../models/User.js"; // Import user model
import bcrypt from "bcrypt"; // For hashing passwords
import { signupValidation, loginValidation } from "../middlewares/AuthValidation.js";
import jwt from "jsonwebtoken"; // For generating authentication tokens

const router = express.Router(); // Create an Express router

//Route: for SignUp
router.post("/signup", signupValidation, async (req, res) => {
    console.log("hey 1")
    try {
      const { name, email, password } = req.body;
  
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error:true, message: "User already exists with this email" });
      }
  
      // Hash the user's password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new userf
      const user = new User({ 
        name, 
        email, 
        password: hashedPassword 
      });
      await user.save();
  
      res.status(201).json({ success:true ,message: "User registered successfully" });
    } catch (error) {
      console.error("Error during signup:", error.message);
      res.status(500).json({error:true, message: "Internal Server Error" });
    }
});
  

//Route: for Login
router.post("/login", loginValidation, async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error:true ,message: "User not found" });
      }
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error:true, message: "Invalid email or password" });
      }
  
      // Generate a JWT token
      //  A JWT token is generated using jwt.sign() with a payload (user ID & email), a secret key (process.env.JWT_SECRET), and an expiry time (expiresIn: "1h").
      // The token is sent to the client for authentication and must be included in future requests (e.g., via Authorization header).
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );
  
      // Respond with success and token
      res.status(200).json({
        success:true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ error:true,message: "Internal Server Error" });
    }
});

// Route: Validate Access Token
// router.get("/validate", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Token missing" });
//   }

//   try {
//     // Verify the access token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     res.status(200).json({
//       success: true,
//       message: "Token is valid",
//       user: {
//         id: decoded.id,
//         email: decoded.email,
//       },
//     });
//   } catch (error) {
//     console.error("Token validation error:", error.message);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// });


export default router; 
