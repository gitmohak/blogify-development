import { Router } from "express";
import {createPost, updatePost, deletePost, getPost, getManyPosts} from "../controllers/posts.js";

const router = Router();

//CREATE POST
router.post("/", createPost);

//UPDATE POST
router.put("/:id", updatePost);

//DELETE POST
router.delete("/:id", deletePost);

//GET POST
router.get("/:id", getPost);

//GET MANY POSTS
router.get("/", getManyPosts);

export default router;