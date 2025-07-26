
import { error } from 'console';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
class CartManager {
    constructor(filePath){
        this.filePath = filePath || path.join(__dirname, '../data/carts.json'); 
    }

    async saveCarts(){
        await fs.writeFile( this.filePath, JSON.stringify(this.carts, null, 2) );
    }

    async getCarts(){
        try{
            const data = await fs.readFile( this.filePath, 'utf-8' );
            return JSON.parse(data);
        }catch{
            return [];
        }
    }

    async createCart (){
        const carts = await this.getCarts();
        const newId = carts.length > 0 ? carts.at(-1).id + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        }

        carts.push(newCart);
        await this.saveCarts();

        return newCart;
    }

    async getCartById (id){
        const carts = await this.getCarts();
        return carts.find( c => c.id === id );
    }

    async addProductToCart( cartId, productId ){
        const carts = await this.getCarts();
        const cart = carts.find( c => c.id === id );

        if ( !cart ) return { error: 'Cart not found' };

        const existingProduct = cart.products.find( p => p.product === productId );

        if(existingProduct){
            existingProduct.quantify += 1;
        }else{
            cart.products.push( { product:productId, quantify: 1 });
        }

        await this.saveCarts();
        return cart;
    }

}

export default CartManager;