import express from 'express';
import productsRouter from './routers/product.routers.js';

const PORT = 8080;

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);

app.listen( PORT,()=>{
    console.log(`listen port ${PORT}`);
});