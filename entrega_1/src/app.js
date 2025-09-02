import express from 'express';
import productsRouter from './routers/product.router.js';
import cartsRouter from './routers/carts.router.js';

const PORT = 8080;

const app = express();
app.use(express.json()); //Midleware para que express lea los json

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen( PORT,()=>{
    console.log(`listen port ${PORT}`);
});