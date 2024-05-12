import express from "express";
import {
  createProperty,
  deleteProperty,
  updateProperty,
  getProperty,
} from "../controllers/property.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.post("/create", verifyToken, createProperty);
router.delete("/delete/:id", verifyToken, deleteProperty);
router.post("/update/:id", verifyToken, updateProperty);
router.get("/get/:id", getProperty);

export default router;
