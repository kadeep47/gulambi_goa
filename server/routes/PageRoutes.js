import express from "express";
import multer from "multer";
import Card from "../models/Card.js"; // Import Card model

const router = express.Router(); // Create an Express router

// Configure multer for parsing multipart/form-data
const upload = multer();  

// Route: Create a new page
router.post("/postExperience",upload.none(),  async (req, res) => {
  console.log("reched till here 2")
  try {
    const { category, name, description, address } = req.body;
    console.log("reched till here 3")
    // Create a new page document
    console.log(category)
    console.log(name)
    console.log(description)
    console.log(address)

    const newCard = new Card({ category, name, description, address});
    console.log("reched till here 4");
    await newCard.save(); // Save to MongoDB
    console.log("reched till here 5");
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
