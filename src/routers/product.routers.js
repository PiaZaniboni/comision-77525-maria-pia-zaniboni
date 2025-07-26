import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

import ProductManager from "../managers/ProductManager.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

const manager = new ProductManager( path.join(__dirname, '../data/products.json') );


router.get('/', async(req, res) => {
    try {
        const products = await manager.getProducts();
        res.json(products);
    } catch {
        res.status(500).json({ error: 'Error getting products'});
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await manager.getProductById(id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

export default router;