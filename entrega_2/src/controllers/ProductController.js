import { getProducts } from '../services/serviceProducts.js';

export function showHome ( req, res ){
    const products = getProducts();

    res.render("home", { title : "Home", products }); 
}

export function showTimeReal (req, res){
    res.render("realTimeProducts", { title : "Real Time Products" });
}