/**
 * Rutas para Manejo de Carritos (/api/carts/)
POST /:
Debe crear un nuevo carrito con la siguiente estructura:
id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

products: Array que contendrá objetos que representen cada producto.



GET /:cid:
Debe listar los productos que pertenecen al carrito con el cid proporcionado.


POST /:cid/product/:pid:
Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
product: Solo debe contener el ID del producto.

quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).


Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.
 */

class CartManager {

}

export default CartManager;