//PRIMERO CREAR ARRAY CARRITO
let carrito = [];


//CONSTANTE PARA ESCUCHAR AL HACER CLICK EN EL BOTON CARRITO
//SE VINCULA EL DIV CON ID=cont-figuritas QUE ES EL CONTENEDOR QUE TIENE LAS CARDS
const productoContenedor = document.getElementById('cont-figuritas');


//APLICAR METODO (addEventListener) PARA ESCUCHAR EL EVENTO 'CLICK' 
//PRIMER ARGUM (CLICK) Y SEGUNDO ARG UNA ARROW FUNCTION QUE ACTUA COMO(callback)
//USAR DELEGACION DE EVENTOS
//CADA VEZ QUE SE EJECUTA EN EVENTO SE CREA UN OBJETO ASOCIADO A ESE EVENTO DE NOMBRE E DE EVENTO
//SE AGREGA UN IF PARA QUE DETECTE EL EVENTO SOLO EN EL OBJETO CON CLASE "AGREGAR" QUE DEFINIMOS EN app.js
//SI EL IF SE CUMPLE SE INVOCA A LA FUNCION VALIDARPRODENCARRITO CREADA MAS ABAJO 
productoContenedor.addEventListener('click', (e) => {
    if(e.target.classList.contains('agregar')) {
    validarProdEnCarrito(e.target.id);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'LISTO!',
        color: '#fff',
        text: 'Se agregó el producto a tu carrito',
        background: '#333',
        timer: 3000
    })
    }
});

//SE CREA LA FUNCION VALIDARPROD... QUE EN EL IF MAS ARRIBAA CONTIENE EL ID DEL PRODUCTO. ACA EN EL PARAMETRO SE LE CAMBIA EL NOMBRE
//DENTRO SE CREA UNA FUNCION PARA VER SI HAY PRODUCTOS REPETIDOS
//CON EL METODO FIND, SI NO SE ENCUENTRA UN PRODUCTO REPETIDO DEVUELVE UNDEFINED. Y SI LO ENCUENTRA VA A GUARDAR EL OBJETO
//UNDEFINED ES UN VALOR FALSO
//SE CREA CONDICIONAL PARA PRODUCTO REPETIDO, TRABAJANDO CON SU TRUE Y SU FALSE
//SI NO ES REPETIDO DEBE AGREGARLO AL CARRITO
//ANTES, CON FIND HAY QUE BUSCAR EL PRODUCTO EN EL ARRAY STOCKPROD
//CUANDO LO ENCUENTRE CON EL METODO PUSH SE AGREGA AL CARRITO
const validarProdEnCarrito = async (productoId) => {
    const prodRepetido = carrito.find(producto => producto.id == productoId);
    
    if (!prodRepetido){
        const stock = await productController();
        const producto = stock.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProdCarrito(producto);
        actualizarTotalesCarrito(carrito);
    } else {
        prodRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${prodRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${prodRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);
    }
};
// FUNCION PARA RENDERIZAR EL CARRITO
const pintarProdCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('prodEnCarrito');
    div.innerHTML =`
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    //CON APPENDCHILD SE AGREGAN PRODUCTOS AL CARRITO
    contenedor.appendChild(div);
};

// const pintarProdCarrito = (producto) => {
//     if(carrito.length = 0) {
//         div.innerHTML =`
//            <p>Aun no hay productos en tu carrito</p>
//         `
//     }
//     else {
//         const contenedor = document.getElementById('carrito-contenedor');
//     const div = document.createElement('div');
//     div.classList.add('prodEnCarrito');
//     div.innerHTML =`
//         <p>${producto.nombre}</p>
//         <p>Precio: $${producto.precio}</p>
//         <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
//         <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
//     `

//     contenedor.appendChild(div);
//     }
// }


//FUNCION PARA ACTUALIZAR LA CANTIDAD TOTAL DE CADA PRODUCTO EN LA VENTANA DEL CARRITO
//DAMOS COMO PARAMATRO 'carrito'
const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

//FUNCION PARA QUE APAREZCA NUMERO DE PRODUCTOS EN EL ICONO DE ARRIBA Y PARA SUMAR PRECIO TOTAL 
const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

//ELIMINAR PRODUCTOS EN LA VENTANA CARRITO
//PRIMERO SE BUSCA EL ELEMENTO POR SU INDICE
//SE USA FINDINDEX
//UNA VEZ ENCONTRADO EL PRODUCTO SE PLICA SPLICE PARA ELIMINARLO
//PARA BAJAR LA CANTIDAD CUANDO ELIMINAMOS UN PRODUCTO, VER MINURO 1:46:00 EN ADELANTE. SE AGREGA EN ESTA FUNCION
const eliminarProductoEnCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

//FUNCION PARA ACTUALIZAR PRODUCTOS DEL CARRITO CUANDO SE ELIMINA ALGUNO
const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('prodEnCarrito');
        div.innerHTML =`
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        //CON APPENDCHILD SE AGREGAN PRODUCTOS AL CARRITO
        contenedor.appendChild(div);
    });
}

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage
};

