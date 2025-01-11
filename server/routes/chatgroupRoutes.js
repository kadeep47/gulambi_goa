// file name is chatgroupRoutes.js


import express from "express";
import User from "../models/User.js"; // Import user model
import { Group, Message } from "../models/Chat.js";

const router = express.Router();

router.post("/groups", async (req, res) => {
  const { name, createdBy, members } = req.body;

  if (members.length < 3) {
    return res.status(400).json({ message: "A group must have at least 3 members" });
  }

  try {
    const group = new Group({ name, createdBy, members });
    await group.save();

    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
});


router.get("/groups/:userId", async (req, res) => {
    try {
      const groups = await Group.find({ members: req.params.userId }).populate("members", "name email");
      res.status(200).json({ groups });
    } catch (error) {
      res.status(500).json({ message: "Error fetching groups", error });
    }
  });

export default router; 
  