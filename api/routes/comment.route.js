import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
  getComment,
  getComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.delete("/delete/:id", verifyToken, deleteComment);
router.post("/update/:id", verifyToken, updateComment);
router.get("/get/:id", getComment);
router.get("/property/:propertyId", getComments);

export default router;
