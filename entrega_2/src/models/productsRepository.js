let listProducts = [
  { id: 1, name: "Abbey Road - The Beatles", price: 25000 },
  { id: 2, name: "Thriller - Michael Jackson", price: 28000 },
  { id: 3, name: "Back in Black - AC/DC", price: 26000 },
  { id: 4, name: "The Dark Side of the Moon - Pink Floyd", price: 30000 },
  { id: 5, name: "Nevermind - Nirvana", price: 27000 },
  { id: 6, name: "Rumours - Fleetwood Mac", price: 24000 },
  { id: 7, name: "OK Computer - Radiohead", price: 29000 },
  { id: 8, name: "Born to Run - Bruce Springsteen", price: 23000 },
  { id: 9, name: "Hotel California - Eagles", price: 25000 },
  { id: 10, name: "21 - Adele", price: 22000 }
]

export function getAllProducts(){
    return listProducts;
}

export function addProduct(product){
    listProducts.push(product);
    return product;
}

export function deleteProductById(id){
    listProducts = listProducts.filter( p => p.id !== id);
}