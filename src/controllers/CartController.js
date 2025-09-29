import {
  getCartById,
  createCart,
  addProductToCart,
  updateCartProducts,
  updateProductQuantity,
  deleteProductFromCart,
  clearCart
} from '../services/cartService.js';

export const getCart = async (req, res) => {
  try {
    const cart = await getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewCart = async (req, res) => {
  console.log("cart");
  try {
    const cart = await createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await addProductToCart(req.params.cid, req.params.pid, quantity || 1);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await updateCartProducts(req.params.cid, req.body.products);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await updateProductQuantity(req.params.cid, req.params.pid, quantity);
    if (!cart) return res.status(404).json({ message: "Cart or product not found" });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const cart = await deleteProductFromCart(req.params.cid, req.params.pid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCartProducts = async (req, res) => {
  try {
    const cart = await clearCart(req.params.cid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};