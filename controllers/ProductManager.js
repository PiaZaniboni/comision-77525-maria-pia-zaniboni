import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ProductManager {

    constructor(filePath){
        this.path = path.resolve(__dirname, '..', filePath); 
    }

    async getProducts(){
        try{
          const data = await fs.readFile(this.path, 'utf-8');
          return JSON.parse(data);
        }catch(err){
          console.error(`Error reading product file: ${err.message}`);
          throw new Error('Failed to load products');
        } 
    }

    async getProductById(id){
      try {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if(!product){
            throw new Error("Product not found");
        }
        return product;
      }catch(err){
        throw err;
      }
    }

    async addProduct ({title, description, code, price, status, stock, category, thumbnails}){
        status = status ?? true;
        thumbnails = thumbnails || [];

        if ( !title || !description || !price || !thumbnails || !code || !stock || !status || !category){
          throw new Error("All fields are mandatory.");
        }

        const products = await this.getProducts();
        const codeExist = products.some( product => product.code === code );

        if (codeExist){
          throw new Error(`Product code "${code}" already exists.`);
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

        products.push(newProduct);
        await fs.writeFile( this.path, JSON.stringify(products, null, 2) );

        return newProduct;
    }

    async updateProduct (id, updatedProduct){
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if(index === -1) throw new Error('Product not found');

        //Borramos id para no reemplazarlo
        delete updatedProduct.id;

        products[index] = {
            ...products[index],
            ...updatedProduct
        }

        await fs.writeFile( this.path, JSON.stringify(products, null, 2) );
        return products[index];
    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);

        if(index === -1) throw new Error ('Produnt not found');
        
        const deleted = products.splice( index, 1 )[0];
        await fs.writeFile( this.path, JSON.stringify(products, null, 2) );
        return deleted;
    }


}

export default ProductManager;