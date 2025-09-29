import Cart from '../models/cart.model.js';

export const getCartById = async (id) => {
    return await Cart.findById(id).populate("products.product");
}

export const createCart = async () => {
    const cart = new Cart ({ products: []});
    return await cart.save();
}

export const addProductToCart = async ( cid, pid, quantity = 1 ) => {
    const cart = await Cart.findById(cid);
    
    if (!cart) return null;

    const existingProduct = cart.products.find( p => p.product.toString() === pid );

    if (existingProduct) {
        existingProduct.quantity += quantity
    }else{
        cart.products.push({ product: pid, quantity });
    }

    await cart.save();

    return await Cart.findById(cid).populate("products.product");
}

export const updateCartProducts = async ( cid, products ) => {
    return await Cart.findByIdAndUpdate(
        cid,
        { products },
        { new: true }
    ).populate("products.product");
 }

 export const updateProductQuantity =  async ( cid, pid, quantity) => {
    const cart = await Cart.findById(cid);
    
    if (!cart) return null;

    const productInCart = cart.products.find( p => p.product.toString() === pid );

    if( !productInCart ) return null;

    productInCart.quantity = quantity;

    await cart.save();

    return await Cart.findById(cid).populate("products.product");
 }

 export const deleteProductFromCart = async (cid, pid) => {
    const cart = await Cart.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter ( p => p.product.toString() !== pid );

    await cart.save();
    return await Cart.findById(cid).populate("products.product");
 }

export const clearCart = async (cid) => {
    return await Cart.findByIdAndUpdate(
        cid,
        { products: [] },
        { new: true }
    );
}