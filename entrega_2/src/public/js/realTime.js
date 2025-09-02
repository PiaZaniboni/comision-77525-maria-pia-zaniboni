const socket = io();

const ulProducts = document.getElementById("listProducts"); 

function renderizar (listProducts){
    ulProducts.innerHTML = "";

    listProducts.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.id} -- ${p.name} -- ${p.price}`;

        ulProducts.appendChild(li);
    });
}

socket.on("products:list", renderizar );


const formCreateProduct = document.getElementById("formCreateProduct");

formCreateProduct.addEventListener( "submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    socket.emit("products:create", {name, price});

    formCreateProduct.reset();
});


const formDeleteProduct = document.getElementById("formDeleteProduct");

formDeleteProduct.addEventListener( "submit", e => {
    e.preventDefault();

    const idProduct = document.getElementById("idProduct").value;
    socket.emit( "products:delete", Number(idProduct) );
    formDeleteProduct.reset();
});

