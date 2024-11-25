function inicializarMapa(){
    // Inicializar el mapa centrado en un punto arbitrario
    const map = L.map('map').setView([51.505, -0.09], 13); // Latitud, Longitud y zoom
    
    // Añadir una capa de mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    //añadimos la ubicación de la empresa al mapa
    const empresaLatLng = [38.77777, -1.32849]; 
    L.marker(empresaLatLng).addTo(map).bindPopup('Ubicación de la Empresa');
    
    //añadimos la ubicacion del cliente 
    navigator.geolocation.getCurrentPosition((position) => {
        const userLatLng = [position.coords.latitude, position.coords.longitude];
        L.marker(userLatLng).addTo(map).bindPopup('Tu ubicación');
        map.setView(userLatLng, 10); // Centrar el mapa en la ubicación del usuario
    
        // Llamar a la función para calcular la ruta
        calcularRuta(empresaLatLng, userLatLng, map);

        //nos aseguramos de que ambas ubicaciones sean visibles cuando se cargue el mapa
        map.fitBounds([empresaLatLng, userLatLng]);
    });

    

}

function calcularRuta(origen, destino, map) {

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${origen[1]},${origen[0]};${destino[1]},${destino[0]}?geometries=geojson`;

    //llamamos a la api de osrm para que calcule por nosotros la ruta
    fetch(osrmUrl)
    .then((response) => response.json())
    .then((data) => {

        if (data.code === 'Ok' && data.routes.length > 0) {
            // Obtén la geometría de la ruta
            const route = data.routes[0].geometry;

            // Usa L.geoJSON para convertir y agregar la ruta al mapa
            const routeLayer = L.geoJSON(route, {
                style: { color: 'blue', weight: 4 }
            });

            // Agrega la capa de ruta al mapa
            routeLayer.addTo(map);
        } else {
            //mostramos el error si no se puede calcular la ruta
            console.error('No se encontró una ruta válida:', data);
            alert('No se pudo calcular una ruta entre las ubicaciones.');
        }
    })
    .catch((error) => console.error('Error al calcular la ruta:', error)); 
}