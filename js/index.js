function cargarPagina() {
    //esta funcion llama a todas las demás funciones que deban ejecutarse nada más cargar la página
    dameNoticias()
    dameProductos()
}

//esta función realiza una petición AJAX para cargar las noticias desde un archivo JSON externo
function dameNoticias() {

    //creamos el objeto Request para hacer la petición AJAX
    const xhr = new XMLHttpRequest();

    /*
    Le pasamos los parámetros a la petición AJAX
    primer parámetro: tipo de la petición, en este caso tipo GET porque solo queremos consultar los datos
    segundo parámetro: ruta del archivo json con los datos
    tercer parámetro: booleano para especificar si la petición es síncrona o asíncrona,
    como en este caso queremos que sea asíncrona le pasamos true
    */
    xhr.open("GET","resources/JSON/noticias.json", true)

    //especificamos lo que queremos que haga esta peticion
    xhr.onload = function () {
        //si el status es 200 es porque ha encontrado el archivo y tenemos los datos
        if(xhr.status === 200) {
            //recogemos los datos de las noticias en texto del archivo usando responseText y lo guardamos
            //en un objeto usando JSON.parse()
            const data = JSON.parse(xhr.responseText);
            const section = document.getElementById("section_noticias")
            var article, titulo, fecha, contenido,imagen,imagenNode, tituloNode, fechaNode, contenidoNode;
           
            //por cada noticia que devuelva el archivo, añadimos el html correspondiente a la sección de noticias
            data.noticias.forEach((noticia) => {
                article = document.createElement("article")
                titulo = noticia.titulo
                fecha = noticia.fecha
                contenido = noticia.contenido
                imagen = noticia.imagen
                tituloNode = document.createElement("h4")
                contenidoNode = document.createElement("p")
                fechaNode = document.createElement("p")
                tituloNode.textContent = titulo
                fechaNode.textContent = fecha
                contenidoNode.textContent = contenido

                article.appendChild(tituloNode)
                insertarImagen(article,imagen, "Descripcion de la imagen de la noticia", "imagen-noticia")
                article.appendChild(fechaNode)
                article.appendChild(contenidoNode)
                section.appendChild(article)
            })
        }
    }
    //especificamos que ocurre en caso de que la petición falle
    xhr.onerror = function () {
        console.error('Error al realizar la solicitud');
      };
    
    //enviamos la petición
    xhr.send();
    
}

//esta funcion carga 2 imagenes aleatorias en la seccion de productos de temporada
function dameProductos() {
    const primera = Math.floor(Math.random() * 9) + 1
    var segunda = Math.floor(Math.random() * 9) + 1
    while(segunda == primera) {
        segunda = Math.floor(Math.random() * 9) + 1
    }
    const productos = document.getElementById("productos")

    insertarImagen(productos, primera + ".jpg", "Descripcion de la imagen del producto", "imagen-producto")
    insertarImagen(productos, segunda + ".jpg", "Descripcion de la imagen del producto", "imagen-producto")
}
//esta funcion simula una busqueda por coleccion de las imagenes y cambia el contenido de la seccion
//de productos de temporada
function dameProductosPorColeccion(coleccion) {

    desactivarBoton()
    coleccion.classList.add("activado")
    //por simplificar el código, las imagenes tienen un número asignado en lugar de un nombre
    const colecciones = {
        "Eterna Comfort":[1,2],
        "Plenitud":[3,4],
        "Hogar Vivo":[5,6],
        "Abrazo Sereno":[7,8],
        "Nube Suave":[9]
    }

    //recogemos las imagenes de la coleccion que queremos mostrar
    const imagenes = colecciones[coleccion.textContent]

    //borramos el contenido html de la seccion de productos
    const productos = document.getElementById("productos");
    productos.innerHTML = "";

    //introducimos las nuevas imagenes en la sección de productos
    var imagen;
    for(i=0; i<imagenes.length; i++) {
        imagen = imagenes[i] + ".jpg";
        insertarImagen(productos, imagen, "Descripcion de la imagen del producto", "imagen-producto");
    }

}
//esta función se encarga de crear e insertar un nodo de imagen en el contenedor que se le pase por parámetro, sería necesario validar
//que contenedor es un nodo del DOM antes de hacer nada, pero voy a obviar esa parte.
function insertarImagen(contenedor, nombreImagen, alt, clase) {
    const imagenNode = document.createElement("img")
    imagenNode.src = "resources/images/"+nombreImagen;
    imagenNode.alt = alt;
    imagenNode.classList.add(clase);
    contenedor.appendChild(imagenNode);
}

//esta funcion elimina la clase activado de los botones cuando se pulsa de nuevo un boton
function desactivarBoton(){
    const botonActivado = document.querySelector(".activado")
    if(botonActivado){
        botonActivado.classList.remove("activado")
    }
}
