import { getAllProducts, getProductById } from "../services/productService.js";
import Cart from "../models/cart.model.js";

export const renderProducts = async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;

    const options = { limit: Number(limit) || 10, page: Number(page) || 1, sort };
    const query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = status;

    const productsData = await getAllProducts(query, options);

    res.render("products", {
      title: "Listado de Productos",
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevLink: productsData.hasPrevPage ? `/products?page=${productsData.prevPage}&limit=${limit || 10}` : null,
      nextLink: productsData.hasNextPage ? `/products?page=${productsData.nextPage}&limit=${limit || 10}` : null
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById( id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).render("error", { message: error.message });
  }
};

export const renderCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.product").lean();
    if (!cart) return res.status(404).render("error", { message: "Cart not found" });

    res.render("cartDetail", { cart });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
