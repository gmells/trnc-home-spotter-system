import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getUserProperties,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/properties/:id", verifyToken, getUserProperties);
router.get("/:id", getUser);

export default router;
