import { getAllProducts } from "../services/productService.js";

export const renderProducts = async (req, res) => {
  //console.log("req.query:", req.query);
  try {
    const { limit, page, sort, category, status } = req.query;

    const options = { limit: Number(limit) || 10, page: Number(page) || 1, sort };
    const query = {};
    if (category) query.category = category;
    if (status !== undefined) query.status = status;

    const productsData = await getAllProducts(query, options);
    console.log("productsData:", productsData);

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
