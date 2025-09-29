import Product from "../models/product.model.js";

export const getAllProducts = async (query = {}, options = {}) => {
  const { limit = 10, page = 1, sort } = options;

  const filter = {};

  if (query.category) {
    filter.category = query.category;
  }

  if (query.status !== undefined) {
    filter.status = query.status === "true";
  }

  const sortOption = {};
  if (sort === "asc") sortOption.price = 1;
  if (sort === "desc") sortOption.price = -1;

  const paginateOptions = {
    page,
    limit,
    sort: sortOption
  };

  const result = await Product.paginate(filter, { ...paginateOptions, lean: true });

  return result;
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

export const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
