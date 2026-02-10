import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true
  },
  email: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    min: [13, "Must be at least 13 years old"]
  }
});

export default mongoose.model("User", userSchema);