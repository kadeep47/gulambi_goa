// file name is PageRoutes.js 
// Utilize multer for image or file uploads related to experiences

import express from "express";
import multer from "multer";
import Card from "../models/Card.js"; // Import Card model

const router = express.Router(); // Create an Express router

// Configure multer for parsing multipart/form-data
// When a client sends form data that may include files, multer helps parse and process it for easy access in the server.
const upload = multer();  

// Route: Create a new page
// Why use upload.none()?
// You expect multipart/form-data requests but don't need to handle file uploads. Ensures that if files are accidentally sent, they are ignored and not processed.
// Avoids the unnecessary overhead of configuring file storage for non-file data.
router.post("/postExperience",upload.none(),  async (req, res) => {
  
  try {
    const { category, name, description, address } = req.body;
    
    // Create a new page document
    console.log(category)
    console.log(name)
    console.log(description)
    console.log(address)

    const newCard = new Card({ category, name, description, address});
    
    await newCard.save(); // Save to MongoDB
    
    res.status(201).json({ message: "Page created successfully", card: newCard });
  } catch (error) {
    res.status(500).json({ error: "Failed to create page" });
  }
});

// Route: Get all pages
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find(); // Fetch all pages from MongoDB
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pages" });
  }
});

// Route: Get a single page by its slug
// router.get("/:slug", async (req, res) => {
//   try {
//     const card = await Page.findOne({ slug: req.params.slug }); // Find a page by its slug
//     if (!page) return res.status(404).json({ error: "Page not found" });

//     res.json(page); // Return the found page
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch page" });
//   }
// });

export default router; // Export the router








// Only the user who is logged in can post through postExperience