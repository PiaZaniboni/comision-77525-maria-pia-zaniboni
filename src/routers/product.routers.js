import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import ProductManager from "../managers/ProductManager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const manager = new ProductManager( path.join(__dirname, '../data/products.json') );


router.get('/', (req, res) => {
    try {
        const products = manager.getProducts();
        res.json(products);
    } catch {
        res.status(500).json({ error: 'Error getting products'});
    }
});

export default router;