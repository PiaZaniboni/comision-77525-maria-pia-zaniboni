import { Router } from "express";

import {
  getCart,
  createNewCart,
  addProduct,
  updateCart,
  updateProduct,
  deleteProduct,
  clearCartProducts
} from "../controllers/CartController.js";

const router = Router();

router.post("/", createNewCart); // Crear nuevo carrito
router.get("/:cid", getCart); // Obtener un carrito por id (con populate)
router.post("/:cid/product/:pid", addProduct); // Agregar producto al carrito
router.put("/:cid", updateCart); // Actualizar TODO el carrito con un array de productos
router.put("/:cid/products/:pid", updateProduct); // Actualizar cantidad de un producto en el carrito
router.delete("/:cid/products/:pid", deleteProduct); // Eliminar un producto del carrito
router.delete("/:cid", clearCartProducts); // Vaciar el carrito (productos)

export default router;