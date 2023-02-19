//CONTROLADOR DE UNA PETICION DE PRODUCTO

//CREAMOS FUNCION PRODUCTCONTROLLER
//CON FETCH PEDIMOS DATOS AL ARCHIVO LOCAL JSON
//HACEMOS RETURN PARA APLICAR DATA AL PINTAR LOS OBJETOS
const productController = async () => {
    const resp = await fetch('/js/componentes/data/stock.json')
    const data = await resp.json()
    return data
};
