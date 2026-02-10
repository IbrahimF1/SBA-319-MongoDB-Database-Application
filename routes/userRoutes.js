import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();


router // /api/users
  .route("/")
  // Get all users
  .get(async (req, res, next) => {
    try {
      const allUsers = await User.find({});
      res.json(allUsers);
    } catch (error) {
      next(error);
    }
  })
  // Add a new user
  .post(async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });


router // /api/users/:id
  .route("/:id")
  // Get one user by ID
  .get(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return res.status(404).json({ error: "User Not Found" });

      res.json(user);
    } catch (error) {
      next(error);
    }
  })
  // Update a user by ID
  .put(async (req, res, next) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } // runValidators ensures updates follow schema rules
      );

      if (!updatedUser)
        return res.status(404).json({ error: "User Not Found" });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  })
  // Remove a user by ID
  .delete(async (req, res, next) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ error: "User Not Found" });
    
      res.json({ message: "User deleted", deletedUser });
    } catch (error) {
      next(error);
    }
  });

export default router;