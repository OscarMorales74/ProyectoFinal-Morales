//*******APP PARA AGREGAR UN CARRITO DE COMPRAS*******


//CREAMOS UNA CONSTANTE QUE SE VINCULE AL DIV CLASE "cont-pro" DE productos.html PARA AGREGAR LAS CARDS A LA PAGINA
const pintarProd = () => {
    const contenedorProd = document.getElementById('cont-producto')

    //AGREGAMOS EL TITULO
    //AGREGAMOS UNA CLASS AL TITULO
    // contenedorProd.innerHTML = '<h2 class="tituloh2">FIGURITAS</h2>'
    // contenedorProd.className = 'tituloh2';

    let carrito = []

    //RECORREMOS EL STOCK CON forEach.
    stockProd.forEach( producto => {
        const card = document.createElement('div')
        card.classList.add('secciones-pro')
        card.innerHTML += `
            <img class="imagen-pro" src=${producto.img} alt="Darth Vader">
            <h3>${producto.nombre}</h3>
            <h4>${producto.desc}</h4>
            <h5>${producto.medidas}</h5>
            <button id=${producto.id} class="boton-agregar"> <img src="../img/ico-carrito.png" id=${producto.id} class="agregar"> </button>
            <p class="desc">${producto.descuento}% off</p>
            <p class="prec">$${producto.precio}</p>
        `
        contenedorProd.appendChild(card)
})
}

console.log(stockProd)
pintarProd();

//CREAMOS FUNCION agregaralcarrito Y LE DAMOS POR PARAMETRO EL ID DE LOS PRODUCTOS

const agregarAlCarrito = (prodId) => {
    const item = stockProd.find((prod) => prod.id === prodId)
    carrito.push(item)
}
