import express from "express";
import Category from "../models/categorySchema.js";

const router = express.Router();


router // /api/categories
  .route("/")
  .get(async (req, res, next) => {
    try {
      const cats = await Category.find({});
      res.json(cats);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newCat = await Category.create(req.body);
      res.status(201).json(newCat);
    } catch (error) {
      next(error);
    }
  });


router // /api/categories/test-validation
.get("/test-validation", async (req, res, next) => {
  try {
    const invalidCat = new Category({ description: "This should fail" });
    await invalidCat.save();
    res.json(invalidCat);
  } catch (error) {
    next(error);
  }
});

router // /api/categories/:id
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const cat = await Category.findById(req.params.id);
      if (!cat) return res.status(404).json({ error: "Category Not Found" });
      res.json(cat);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedCat = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedCat);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category deleted" });
    } catch (error) {
      next(error);
    }
  });

export default router;