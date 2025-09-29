import { Router } from "express";
import { renderProducts, renderProductDetail, renderCart } from "../controllers/ViewController.js";

const router = Router();

router.get("/products", renderProducts);
router.get("/products/:id", renderProductDetail);
router.get("/carts/:cid", renderCart);

export default router;