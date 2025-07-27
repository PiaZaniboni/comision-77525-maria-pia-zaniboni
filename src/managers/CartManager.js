import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class CartManager {
    constructor(filePath){
        this.path = path.resolve(__dirname, '..', filePath);
    }

    async getCarts(){
        try{
            const data = await fs.readFile( this.path, 'utf-8' );
            return JSON.parse(data);
        }catch{
            if (err.code === 'ENOENT') return [];
            throw new Error('Error reading carts file');
        }
    }

    async createCart (){
        try {
            const carts = await this.getCarts();
            const newId = carts.length > 0 ? carts.at(-1).id + 1 : 1;

            const newCart = {
                id: newId,
                products: []
            }

            carts.push(newCart);
            await fs.writeFile( this.path, JSON.stringify(carts, null, 2) );

            return newCart;
        }catch(err){
            throw new Error('Error creating cart: ' + err.message);
        }
    }

    async getCartById (id){
        try{
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id == id);
            
            if(!cart) throw new Error('Cart not found');

            return cart;
        }catch(err){
            throw new Error('Error retrieving cart: ' + err.message);
        }
        
    }

    async addProductToCart( cartId, productId ){
        try {
            const cartIdNum = Number(cartId);
            const carts = await this.getCarts();
            const cart = carts.find( c => c.id === cartIdNum );

            if ( !cart ) throw new Error('Cart not found');

            const existingProduct = cart.products.find( p => p.product === productId );

            if(existingProduct){
                existingProduct.quantity += 1;
            }else{
                cart.products.push( { product: productId, quantity: 1 });
            }

            await fs.writeFile( this.path, JSON.stringify(carts, null, 2) );
            return cart;
        }catch(err){
            throw new Error('Error adding product to cart: ' + err.message);
        }
    }

}

export default CartManager;