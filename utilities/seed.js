import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/userSchema.js';
import Category from '../models/categorySchema.js';
import Task from '../models/taskSchema.js';
import { users, categories, tasks } from './data.js';

async function seedDatabase() {
  console.log(`${new Date().toLocaleTimeString()} -- Starting Seed...`);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`${new Date().toLocaleTimeString()} -- Connected to DB`);

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Task.deleteMany({});
    console.log(`${new Date().toLocaleTimeString()} -- Cleared existing data`);

    // Seed Users and Categories
    const createdUsers = await User.create(users);
    const createdCategories = await Category.create(categories);
    console.log(`${new Date().toLocaleTimeString()} -- Users and Categories seeded`);

    // Assigning random User and Category IDs
    const taskData = tasks.map((task, index) => {
      return {
        ...task,
        userId: createdUsers[index % createdUsers.length]._id,
        categoryId: createdCategories[index % createdCategories.length]._id
      };
    });

    await Task.create(taskData);
    console.log(`${new Date().toLocaleTimeString()} -- Tasks seeded with relationships`);

    console.log(`${new Date().toLocaleTimeString()} -- ✅ Database Successfully Seeded`);
    process.exit(0);
  } catch (err) {
    console.error(`${new Date().toLocaleTimeString()} -- ❌ Seed Error:`, err.message);
    process.exit(1);
  }
}

seedDatabase();