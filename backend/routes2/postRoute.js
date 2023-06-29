import express from "express";
import { addPost, getAllPosts, getPost, updatePost, deletePost } from "../Controllers/postController.js";
import { loginRequired } from "../Controllers/authentication.js";

const router = express.Router();
router.get("/",loginRequired, getAllPosts),
router.get("/:id", getPost),
router.post("/",loginRequired, addPost),
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

export default router;