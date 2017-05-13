function initMap(zoom_var) {
	//console.log("Inciando mapa");
    boxes = new google.maps.MVCArray();

	mapMoves="";
    mapMoves = new google.maps.Map(document.getElementById('gmap_moves'), {
        center: {
            lat: -0.209292,
            lng: -78.419442
        },
        zoom: zoom_var,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });
	reloadMap(mapMoves);
}
function reloadMap(mapa){
	google.maps.event.trigger(mapa, 'resize');
}
