import { getAllProducts, addProduct, deleteProductById } from "../models/productsRepository.js";

export function getProducts(){
    return getAllProducts();
}

export function createProduct(data){
    const product = {
        id: Date.now(),
        name: String(data?.name ?? "").trim(),
        price: Number(data?.price ?? 0)
    };

    if (isNaN(product.price)) {
        throw new Error("Invalid price");
    }

    return addProduct(product);
}

export function deleteProduct(id){
    const idProduct =  Number(id);
    deleteProductById(idProduct);
}