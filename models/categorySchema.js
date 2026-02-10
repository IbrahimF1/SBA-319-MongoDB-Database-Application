import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    default: "No description provided" 
  }
});

export default mongoose.model("Category", categorySchema);