import express from 'express';
import productsRouter from './routers/product.router.js';
import cartsRouter from './routers/carts.router.js';

const PORT = 8080;

const app = express();
app.use(express.json());

app.listen( PORT,()=>{
    console.log(`listen port ${PORT}`);
});