import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager(  './src/data/products.json' );


router.get('/', async(req, res) => {
    const products = await productManager.getProducts();
    products ? res.json(products) : res.status(500).json({ error: 'Error getting products'});
});

router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    product ? res.json(product) : res.status(404).json({ error: err.message });
});

//Post
router.post('/', async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);

    res.status(201).json(newProduct);
});

//update
router.put('/:pid', async (req, res) => {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    updated ? res.json(updated) : res.status(404).json({ error: err.message });
});

//delete
router.delete('/:pid', async (req, res) => {
    const result = await productManager.deleteProduct(req.params.pid);
    res.json(result);
});

export default router;