import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager('./data/products.json');


router.get('/', async(req, res) => {
    try{
        const products = await productManager.getProducts();
        res.json(products)
    }catch (err){
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: err.message});
    }
});

router.get('/:pid', async (req, res) => {
    try{
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);

        res.json(product);
    }catch(err){
        console.error(`Error fetching product with ID ${req.params.pid}:`, err.message);
        
        if (err.message === "Product not found") {
            return res.status(404).json({ error: err.message });
        }

        res.status(500).json({ error: 'Failed to retrieve product' });
    }
});

//Post
router.post('/', async (req, res) => {
    try {
        const productData = Array.isArray(req.body) ? req.body[0] : req.body;
        const newProduct = await productManager.addProduct(productData);
        res.status(201).json(newProduct);
    }catch (err){
        console.error("Error creating product:", err.message);
    }
    
});

//update
router.put('/:pid', async (req, res) => {
    try{
        const updated = await productManager.updateProduct(req.params.pid, req.body);
        res.status(201).json(updated);
    }catch (err){
        res.status(404).json({ error: err.message });
    }
});

//delete
router.delete('/:pid', async (req, res) => {
    try{
        const deletedProduct = await productManager.deleteProduct(req.params.pid);
        res.json({ message: 'Product deleted successfully', product: deletedProduct });
    }catch(err){
        res.status(404).json({ error: err.message });
    }
    
});

export default router;