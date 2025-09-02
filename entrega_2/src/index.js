import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { getProducts, createProduct, deleteProduct } from "./services/serviceProducts.js";

const serverHttp = http.createServer(app);
const io = new Server (serverHttp);

const port = 8080;

app.set( "io", io );

io.on ( "connection", socket => {
    socket.emit( "products:list" , getProducts());

    socket.on( "products:create", data => {
        const product = createProduct(data);
        io.emit( "products:list" , getProducts() );

        socket.emit( "products:create", product);
    })

    socket.on( "products:delete", idProduct =>{
        deleteProduct(idProduct);
        io.emit( "products:list" , getProducts() );

        socket.emit( "products:delete", idProduct);
    })
})

serverHttp.listen( port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

