(function() {
    const lat = 8.29755990497009;
    const lng = -62.71151127857323;
    const map = L.map('map').setView([lat, lng ], 16);
    
    //utilizar provider y geocode
    const geocodeService = L.esri.Geocoding.geocodeService();                       //obtener servicios para obtener los nombres

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //pin
    var marker = new L.marker([lat, lng], {
        draggable: true,            //permite mover el pin
        autoPan: true               //tralada el mapa en relacion al pin 
    }).addTo(map)    

    //detectar movimiento del pin
    marker.on('moveend', function(e){        
        marker  = e.target;                                         //instancio      
        console.log(marker);
        
        
        const position = marker.getLatLng();                        //obtener pos
        map.panTo(new L.LatLng(position.lat, position.lng));        //sensacion de posicionar la marca en el centro del mapa

        //obtener informacion de las calles al soltar el pin
        geocodeService.reverse().latlng(position, 16).run(function(error, resultado){
            if (error) console.log( error);
            else  console.log(resultado);

            //mostrar globo de inf en el marker
            marker.bindPopup(resultado.address.LongLabel);

            //llenar los campo
            document.querySelector('.calle').textContent = resultado?.address?.LongLabel  ?? '';
            document.querySelector('#calle').value = resultado?.address.LongLabel  ?? '';
            document.querySelector('#lat').value = resultado?.latlng.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng.lng ?? '';

        })

    })


    

})(map)
