//Backend Routes for creating, deleting, and getting (single or many) Posts. Query can be used for many posts.
import { Router } from "express";
import {createPost, deletePost, getPost, getManyPosts} from "../controllers/posts.js";

const router = Router();

//CREATE POST
router.post("/", createPost);

//DELETE POST
router.delete("/:id", deletePost);

//GET POST
router.get("/:id", getPost);

//GET MANY POSTS
router.get("/", getManyPosts);

export default router;