import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ProductManager {

    constructor(filePath){
        this.filePath = filePath || path.join(__dirname, '../data/products.json'); 
        this.products = [];
        this.nextId = 1;

        this.init();
    }

    async init (){
        try{
            if( fs.existsSync(this.filePath) ){
                const data = await fs.promises.readFile( this.filePath, 'utf-8');
                this.products = JSON.parse(data);

                if( this.products.length > 0 ){
                    this.nextId = Math.max( ...this.products.map( product => product.id ) ) + 1; 
                }
            }else{
                await fs.promises.writeFile( this.filePath, JSON.stringify( [], null, 2) );
            }
        }catch (err){
            console.error('Error initializing ProductManager: ', err );
        }
    }

    async saveFile(){
        await fs.promises.writeFile( this.filePath, JSON.stringify(this.products, null, 2) );
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        if(!product){
            console.log( "Not found");
            return;
        }
        return product;
    }

    async addProduct ({title, description, price, thumbnail, code, stock}){

        if ( !title || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are mandatory.");
            return;
        }

        const codeExist = this.products.some( product => product.code === code );

        if (codeExist){
            console.log(`Product code "${code}" already exists.`);
            return;
        }

        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        await this.saveFile();
        this.nextId++;

        return newProduct;
    }

    async updateProduct (id, updatedProduct){
        const index = this.products.findIndex(product => product.id == id);
        if(index === -1) throw new Error ('Produnt not found');

        //Borramos id para no reemplazarlo
        if (updatedProduct.id) delete updatedProduct.id;

        this.products[index] ={
            ...this.products[index],
            ...updatedProduct
        }

        await this.saveFile();
        return this.products[index];
    }

    async deleteProduct(id){
        const index = this.products.findIndex(product => product.id == id);
        if(index === -1) throw new Error ('Produnt not found');
        
        const deleted = this.products.splice( index, 1 )[0];
        await this.saveFile();
        return deleted;
    }


}

export default ProductManager;