//archivo reservado para eventos

const fondoCarrito = document.querySelector('.fondo-carrito');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const ventanaCarrito = document.querySelector('.ventana-carrito');
const vaciarCarritoBtn = document.getElementById('btn-vaciar-carrito')

//AGREGO EVENTO PARA MOSTRAR CARRITO
abrirCarrito.addEventListener('click', () => {
    fondoCarrito.classList.toggle('modal-active')
});

cerrarCarrito.addEventListener('click', () => {
    fondoCarrito.classList.toggle('modal-active')
});

fondoCarrito.addEventListener('click', () => {
    cerrarCarrito.click()
});

//ESCUCHAR EVENTO AL HACER CLICK EN BOTON ELIMINAR PRODUCTO
//SE HACE DELEGACION DE EVENTO XQ NOM SABEMOS LA CANTIDAD DE BOTONES ELIMINAR QUE PUEDE HABER EN EL CARRITO
ventanaCarrito.addEventListener('click', (e) => {
    e.stopPropagation(); 
    if (e.target.classList.contains('boton-eliminar')) {
        eliminarProductoEnCarrito(e.target.value);
    }
});

vaciarCarritoBtn.addEventListener('click', () => {
    carrito.innerHTML = '';
});

