document.addEventListener('DOMContentLoaded', () => {
    pintarProd();

    if (localStorage.getItem('carrito')) {
        carrito = obtenerCarritoStorage();
        actualizarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
})