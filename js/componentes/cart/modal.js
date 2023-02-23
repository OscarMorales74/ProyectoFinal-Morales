//archivo reservado para eventos

const fondoCarrito = document.querySelector('.fondo-carrito');
const abrirCarrito = document.getElementById('cesta-carrito');
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
const ventanaCarrito = document.querySelector('.ventana-carrito');
const vaciarCarritoBtn = document.getElementById('btn-vaciar-carrito')

//AGREGO EVENTO PARA MOSTRAR CARRITO
abrirCarrito.addEventListener('click', () => {
    fondoCarrito.classList.toggle('modal-active');
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
if (carrito.length === 0) {
    Swal.fire({
        position: 'center',
        title: 'CARRITO VACIO',
        color: '#fff',
        text: 'Tu carrito ya se encuentra vacio',
        background: '#333',
        timer: 3000
    });
}
else {
    carrito.splice(0, carrito.length);
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'CARRITO VACIO',
        color: '#fff',
        text: 'Tu carrito se vacio con exito',
        background: '#333',
        timer: 3000
    });
}
});