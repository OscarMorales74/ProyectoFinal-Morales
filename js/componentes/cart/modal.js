const fondoCarrito = document.querySelector('.fondo-carrito');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const ventanaCarrito = document.querySelector('.ventana-carrito');

abrirCarrito.addEventListener('click', () => {
    fondoCarrito.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    fondoCarrito.classList.toggle('modal-active')
});

fondoCarrito.addEventListener('click', () => {
    cerrarCarrito.click()
});

ventanaCarrito.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoEnCarrito(e.target.value);
    }
})