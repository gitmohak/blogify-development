import { Router } from "express";
import {createCategory, getAllCategories} from "../controllers/categories.js";

const router = Router();

//CREATE CATEGORY
router.post("/", createCategory);

//GET ALL CATEGORIES
router.get("/", getAllCategories);

export default router;