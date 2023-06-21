import express from "express";
import { addPost, getPosts, getPost, updatePost, deletePost } from "../Controllers2/postController.js";

const router = express.Router();
router.get("/" , getPosts)
router.get("/:id" , getPost)
router.post("/" , addPost)
router.delete("/:id" , deletePost)
router.put("/:id" , updatePost)

export default router;