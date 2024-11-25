//esta funcion se llama cada vez que se debe modificar el precio
function calcularPrecio() {

    //formula para calcular precio
    // (Precio producto  + Precio extras) * (1 - Descuento Plazo)

    //recuperamos el valor de los input que tienen informacion necesaria

    const producto = document.getElementById("producto")
    const plazo = document.getElementById("plazo")

    //recuperamos el input donde vamos a insertar el precio final 
    const precio = document.getElementById("precio")

    //comprobamos que tenemos al menos el producto seleccionado
    if(producto.value == "") {
        //si no hay producto, simplemente asignamos 0 al input del precio
        precio.value = 0 + " €";
    }
    else {
        //calculamos las partes de la fórmula inicial
        const precioProducto = damePrecioProducto(producto.value)
        const precioExtras = damePrecioExtras()
        const descuentoPlazo = dameDescuentoPlazo(plazo.value)
    
        //aplicamos la formula
        const precioFinal = (precioProducto + precioExtras) * (1 - descuentoPlazo)
    
        //introducimos el valor calculado en el input del precio
        precio.value = precioFinal + " €"
    }
}

//esta funcion recibe un producto y nos devuelve su precio base
function damePrecioProducto(producto){

    //creamos un diccionario donde los nombres de los productos son las claves
    // y guardamos en cada clave su respectivo precio

    const precios = {
        "Sofá barato": 100,
        "Sofá clase media-baja": 300,
        "Sofá clase media-alta": 750,
        "Sofá de lujo":2500
    }

    //devolvemos el precio correspondiente
    return precios[producto]
}

//esta funcion devuelve la suma del precio de todos los extras marcados
function damePrecioExtras() {

    //recuperamos los input de todos los extras
    const instalacion = document.getElementById("instalacion")
    const garantia = document.getElementById("garantia")
    const mantenimiento = document.getElementById("mantenimiento")

    //para simplificar el calculo vamos a decir que cada extra tiene un precio asociado
    /*
    instalacion -> 100 €
    garantia -> 150€
    mantenimiento -> 300€
    */
    var precioExtras = 0 

    //comprobamos si los extras estan marcados y si es asi, aumentamos el precio

    if(instalacion.checked) precioExtras += 100
    if(garantia.checked) precioExtras += 150
    if(mantenimiento.checked) precioExtras += 300
    return precioExtras
}

//esta función devuelve un descuento en función del número de días que le pasamos
function dameDescuentoPlazo(plazo) {

    //para seguir algún tipo de lógica, vamos a decir que el descuento
    //irá en función de unos tramos
    /*
    1-2 días -> 0% descuento
    3-6 dias -> 5% descuento
    7-13 dias -> 10% descuento
    14-30 dias -> 15% descuento
    +30 dias -> 20% descuento
    */

    var descuento;
    if(plazo < 3){
        descuento = 0
    } 
    else if(plazo < 7){
        descuento = 0.05
    }
    else if(plazo < 14){
        descuento = 0.1
    }
    else if(plazo < 31) {
        descuento = 0.15
    }
    else {
        descuento = 0.2
    }
    return descuento
}

//esta funcion simplemente habilita o deshabilita el boton de enviar
//cambiando al mismo tiempo unas clases css para que se refleje visualmente
function habilitarEnviar() {
    
    const terminos = document.getElementById("terminos")
    const inputSubmit = document.getElementById("submit")
    const producto = document.getElementById("producto")
    
    if(terminos.checked && producto.value != "") {
        inputSubmit.classList.remove("myButtonDisabled")
        inputSubmit.classList.add("myButton")
        inputSubmit.disabled = false
    }
    else {
        inputSubmit.classList.remove("myButton")
        inputSubmit.classList.add("myButtonDisabled")
        inputSubmit.disabled = true
    }
}
