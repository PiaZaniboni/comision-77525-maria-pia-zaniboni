import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../services/productService.js";

export const getProducts = async (req, res) => {
  try {
    const { limit, page, sort, category, status } = req.query;

    const options = { limit: Number(limit) || 10, page: Number(page) || 1, sort };
    const query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = status;


    const products = await getAllProducts(query, options);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
    const prevLink = products.hasPrevPage ? `${baseUrl}?page=${products.prevPage}&limit=${limit || 10}` : null;
    const nextLink = products.hasNextPage ? `${baseUrl}?page=${products.nextPage}&limit=${limit || 10}` : null;

    res.json({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink,
      nextLink
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExistingProduct = async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExistingProduct = async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
