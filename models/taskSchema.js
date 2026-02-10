import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Task title is required"],
    trim: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  priority: { 
    type: Number, 
    min: 1, 
    max: 5, 
    default: 3
  },
  // Links task to a specific user
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    index: true
  },
  // Links task to a category
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category" 
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);