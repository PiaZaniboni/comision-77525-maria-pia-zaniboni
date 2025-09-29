import { Router } from "express";
import { renderProducts } from "../controllers/ViewController.js";

const router = Router();

router.get("/products", renderProducts);

export default router;