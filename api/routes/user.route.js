import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserProperties,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/properties/:id", verifyToken, getUserProperties);

export default router;
