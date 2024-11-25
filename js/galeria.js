



function hacerFlip() {

  const flipCard = document.querySelector('.flip-card'); // Selecciona la tarjeta
  flipCard.classList.toggle('flipped'); // Alterna la clase
}

function cargarImagen(imagen) {
    
    const principal = document.getElementById("principal")
    const texto = document.getElementById("textoOculto")
    switch(imagen.alt){
        case "imagen 1":
            texto.innerHTML = "Sofá pequeño con reposabrazos"
            break;
        case "imagen 2":
            texto.innerHTML = "Sofá de 2 plazas marrón con cojines extendibles"
            break;
        case "imagen 3":
            texto.innerHTML = "Sofá de 2 plazas blanco, sencillo con apoyo lumbar independiente"
            break;
        case "imagen 4":
            texto.innerHTML = "Sofá cama grande con módulos en L independientes"
            break;
        case "imagen 5":
            texto.innerHTML = "Sofá de 3 plazas sencillo, color verde bosque"
            break;
        case "imagen 6":
            texto.innerHTML = "Sofá de 4 plazas en L con cojines independientes a juego"
            break;
        case "imagen 7":
            texto.innerHTML = "Sofá cama con reposapiés extensibles y reposabrazos ajustables"
            break;
        case "imagen 8":
            texto.innerHTML = "Sofá de 2 plazas sencillo, color rojo con 2 cojines independientes a juego"
            break;
        
    }
    principal.src = imagen.src
}