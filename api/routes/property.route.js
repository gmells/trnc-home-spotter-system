import express from "express";
import { createProperty } from "../controllers/property.controller.js";
import { verifyToken } from "../utility/verification.js";

const router = express.Router();

router.post("/create", verifyToken, createProperty);

export default router;
