import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router()

const cartManager = new CartManager('./data/carts.json');

router.post('/', async(req , res) =>{
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    }catch(err){
        console.error("Error creating cart:", err.message);
        res.status(500).json({ error: 'Failed to create cart' });
    }
})

router.get('/:cid', async(req, res)=>{
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);

        if ( !cart ) return res.status(404).json({ error: 'Cart not found' });

        res.json(cart.products);
    }catch(err){
        console.error("Error fetching cart:", err.message);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
})

router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartManager.addProductToCart(cid,pid);
        
        if (updatedCart.error) return res.status(404).json({ error: updatedCart.error });

        res.json(updatedCart);
    }catch(err){
        console.error("Error adding product to cart:", err.message);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
})

export default router;