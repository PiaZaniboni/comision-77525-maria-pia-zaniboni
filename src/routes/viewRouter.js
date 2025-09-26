import { Router } from "express";
import { showHome, showTimeReal } from "../controllers/ProductController.js";

export function createRouterViews(){
    const router = Router();

    router.get("/", showHome);
    router.get("/realtimeproducts", showTimeReal);

    return router;
}