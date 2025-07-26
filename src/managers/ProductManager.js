import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ProductManager {

    constructor(filePath){
        this.filePath = filePath || path.join(__dirname, '../data/products.json'); 
    }

    async saveFile(){
        await fs.writeFile( this.filePath, JSON.stringify(this.products, null, 2) );
    }

    async getProducts(){
        try{
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        }catch{
            return [];
        } 
    }

    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if(!product){
            console.log( "Not found");
            return;
        }
        return product;
    }

    async addProduct ({title, description, code, price, status, stock, category, thumbnails}){

        if ( !title || !description || !price || !thumbnails || !code || !stock || !status || !category){
            console.log("All fields are mandatory.");
            return;
        }

        const codeExist = this.products.some( product => product.code === code );

        if (codeExist){
            console.log(`Product code "${code}" already exists.`);
            return;
        }

        const newId = products.length > 0 ? products.at(-1).id + 1 : 1;

        const newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        };

        this.products.push(newProduct);
        await this.saveFile();

        return newProduct;
    }

    async updateProduct (id, updatedProduct){
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if(index === -1) return { error:'Produnt not found' };

        //Borramos id para no reemplazarlo
        delete updatedProduct.id;

        products[index] = {
            ...products[index],
            ...updatedProduct
        }

        await this.saveFile();
        return products[index];
    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if(index === -1) throw new Error ('Produnt not found');
        
        const deleted = this.products.splice( index, 1 )[0];
        await this.saveFile();
        return deleted;
    }


}

export default ProductManager;