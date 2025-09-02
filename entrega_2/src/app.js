import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRouterViews } from './routes/viewRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json()); //Midleware para que express lea los json
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public" )));

app.engine("handlebars", engine());
app.set( "view engine", "handlebars" );
app.set( "views", path.join(__dirname, "views" ));

app.use( "/", createRouterViews());


export default app;