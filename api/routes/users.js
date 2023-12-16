import { Router } from "express";
import {updateUser, deleteUser, getUser} from "../controllers/users.js";

const router = Router();

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET A USER
router.get("/:id", getUser);

export default router;