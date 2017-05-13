function populateHeatMap(readings) {
//console.log('populateHeatMap');
datosRes=readings;

  var heatmapData = [];
  var xyPoints = [];

  var lon_min=-78.483521;
  var lat_min=-0.181361;
  var lon_max=-78.48592;
  var lat_max=-0.184431;
  var width_field_m=196.0;
  var height_field_m=332.0;

  var imageWidth = $("#fieldIMG").width();
  var imageHeight = $("#fieldIMG").height();

  var correccion=((25*imageWidth)/100)
  var pixels_width=imageWidth-correccion;
  var pixels_height=imageHeight+correccion;

  y_dis=lat_max-lat_min;
  x_dis=lon_max-lon_min;
 
  metres_per_pixel_width=width_field_m/pixels_width+0;
  metres_per_pixel_height=height_field_m/pixels_height+0;
  
  $( "div" ).remove( ".dot-img" );
  for (var i = 0; i < readings.length; i++) {
      if (i==0){
		//console.log("LATLON: ",readings[i].lat,readings[i].lng);
        mapMoves.panTo(new google.maps.LatLng(readings[i].lat,readings[i].lng));
        mapMoves.setZoom(18);
      }
      y = ((parseFloat(readings[i].lat)-lat_min)*width_field_m/x_dis)/metres_per_pixel_width;
      x = ((parseFloat(readings[i].lng)-lon_min)*height_field_m/y_dis)/metres_per_pixel_height;

      $("#fieldIMG").append(	
          $('<div class="dot-img"></div>')
              .css('top', (x+50) + 'px')
              .css('left',(y+0) + 'px')
      );

     heatmapData[i] = new google.maps.LatLng(readings[i].lat, readings[i].lng);
  }

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    radius: 15
  });
  heatmap.setMap(mapMoves);

}

function populateSpeedResults(speed_results) {

  $("#caminaNum").empty();
  $("#caminaNum").append(speed_results.distancia_caminar);

  $("#trotaNum").empty();
  $("#trotaNum").append(speed_results.distancia_trotar);

  $("#correNum").empty();
  $("#correNum").append(speed_results.distancia_correr);

  $("#picaNum").empty();
  $("#picaNum").append(speed_results.distancia_sprints);

  $("#totalNum").empty();
  $("#totalNum").append(speed_results.distancia_total);
  
  $("#velocidadMax").empty();
  $("#velocidadMax").append(speed_results.max_speed);

  $("#distanciaRelativa").empty();
  $("#distanciaRelativa").append(speed_results.distancia_relativa);

  $("#numeroSprints").empty();
  $("#numeroSprints").append(speed_results.num_sprints);

  $("#hmld").empty();
  $("#hmld").append(speed_results.HMLD);
}

function populateDon(speed_results) {
  var scope=angular.element(document.getElementById('doughnut')).scope();
  var data=scope.percentMet;
  //console.log(scope);
  
  for(i=0; i<4;i++){
	  data.splice(0, 1);
  }
  var d1=((speed_results.distancia_caminar*100)/speed_results.distancia_total).toFixed(2);
  var d2=((speed_results.distancia_trotar*100)/speed_results.distancia_total).toFixed(2);
  var d3=((speed_results.distancia_correr*100)/speed_results.distancia_total).toFixed(2);
  var d4=((speed_results.distancia_sprints*100)/speed_results.distancia_total).toFixed(2);
  scope.percentMet.push(d1);
  scope.percentMet.push(d2);
  scope.percentMet.push(d3);
  scope.percentMet.push(d4);
  
  $("#per_0").empty();
  $("#per_0").append('+'+d1+'%');

  $("#per_1").empty();
  $("#per_1").append('+'+d2+'%');

  $("#per_2").empty();
  $("#per_2").append('+'+d3+'%');

  $("#per_3").empty();
  $("#per_3").append('+'+d4+'%');
  
  $("#dataTotalMet").empty();
  $("#dataTotalMet").append(speed_results.distancia_total+"m");
}
function populateBar(speed_results) {
  var scope=angular.element(document.getElementById('barChart1')).scope();
  var barras_datos=[speed_results.zona_alta_desacel,speed_results.zona_moderada_desacel,speed_results.zona_baja_desacel,speed_results.zona_baja_acel,speed_results.zona_moderada_acel,speed_results.zona_alta_acel];
  var cargar=scope.CargarDataBar;
  cargar(barras_datos);
}
function populateCharts(insights) {
  var scope=angular.element(document.getElementById('areaChart1')).scope();
  var scope2=angular.element(document.getElementById('areaChart2')).scope();
  
  var dataChartVel=[];
  var dataChartAc=[];
  
  for(var i=0;i<insights.length;i++){
	  dataChartVel.push({"date": insights[i].time,"market1": insights[i].vmps});
	  dataChartAc.push({"date": insights[i].time,"market1": insights[i].accel});
  }
  var cargar1=scope.CargarDataChart;
  var cargar2=scope2.CargarDataChart;
  cargar1(dataChartVel); 
  cargar2(dataChartAc);
}
//Funcion para reacomodar puntos de mapa
function resizePoints(readings) {
  //console.log('resizePoints');
  var xyPoints = [];
  var lon_min=-78.483521;
  var lat_min=-0.181361;
  var lon_max=-78.48592;
  var lat_max=-0.184431;
  var width_field_m=196.0;
  var height_field_m=332.0;

  var imageWidth = $("#fieldIMG").width();
  var imageHeight = $("#fieldIMG").height();
  
  var correccion=((25*imageWidth)/100)
  var pixels_width=imageWidth-correccion;
  var pixels_height=imageHeight+correccion;

  y_dis=lat_max-lat_min;
  x_dis=lon_max-lon_min;
 
  metres_per_pixel_width=width_field_m/pixels_width+0;
  metres_per_pixel_height=height_field_m/pixels_height+0;
  
	$( "div" ).remove( ".dot-img" );
  for (var i = 0; i < readings.length; i++) {
      if (i==0){
		//console.log("LATLON: ",readings[i].lat,readings[i].lng);
        mapMoves.panTo(new google.maps.LatLng(readings[i].lat,readings[i].lng));
        mapMoves.setZoom(18);
      }
	  
      y = ((parseFloat(readings[i].lat)-lat_min)*width_field_m/x_dis)/metres_per_pixel_width;
      x = ((parseFloat(readings[i].lng)-lon_min)*height_field_m/y_dis)/metres_per_pixel_height;

      $("#fieldIMG").append(	
          $('<div class="dot-img"></div>')
			//.css('top', 'calc(100% - '+(x+130) + 'px)')
              .css('top', (x+50) + 'px')
              .css('left',(y+0) + 'px')
      );
  }
}