import mongoose from "mongoose";

// Schema defines the structure of our documents
const CardSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name:{type:String, required:true},
  description: { type: String, required: true },
  address: { type: String, required: true },
  // images: [{ type: String}], // Unique identifier for the page
});

// Export the model as default
export default mongoose.model("Card", CardSchema);


// can add image field to a card
// can add a status field to a card (approved/pending/reject)
