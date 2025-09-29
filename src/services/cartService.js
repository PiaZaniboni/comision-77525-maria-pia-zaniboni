import Cart from '../models/cart.model.js';

export const getCartById = async (id) => {
    return await Cart.findById(id).populate("products.product");
}

export const createCart = async () => {
    const cart = new Cart ({ products: []});
    return await cart.save();
}

export const addProductToCart = async ( cid, pid, quantify = 1 ) => {
    const cart = await Cart.findById(cid);
    
    if (!cart) return null;

    const existingProduct = cart.products.find( p => p.product.toString() === pid );

    if (existingProduct) {
        existingProduct.quantify += quantify
    }else{
        cart.products.push({ product: pid, quantify });
    }

    return await cart.save();
}

export const updateCartProducts = async ( cid, products ) => {
    return await Cart.findByIdAndUpdate(
        cid,
        { products },
        { new: true }
    ).populate("products.product");
 }

 export const updateProductQuantity =  async () => {
    const cart = await Cart.findById(cid);
    
    if (!cart) return null;

    const productInCart = cart.products.find( p => p.product.toString() === pid );

    if( !productInCart ) return null;

    productInCart.quantify = quantify;

    return await cart.save();
 }

 export const deleteProductFromCart = async (cid, pid) => {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter ( p => p.product.toString() !== pid );

    return await cart.save();
 }

export const clearCart = async (cid) => {
    return await Cart.findByIdAndUpdate(
        cid,
        { products: [] },
        { new: true }
    );
}