import express from 'express';
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from 'url';
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/carts.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public" )));

//Handlebars
app.engine ("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join( __dirname, "views" ));

//Routes
app.use("/api/products", productRoutes );
app.use("/api/carts", cartRoutes );

export default  app;