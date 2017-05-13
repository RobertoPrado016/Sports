// function populateHeatMap(readings) {
//
//   heatmap = new HeatmapOverlay(mapMoves, {
//       "radius": 0.0001,
//       "maxOpacity": .7,
//       "scaleRadius": true,
//       "useLocalExtrema": true,
//       latField: 'lat',
//       lngField: 'lng',
//       valueField: 'count'
//   });
//
//   var heatmapData = [];
//   var xyPoints = [];
//
//   for (var i = 0; i < readings.length; i++) {
//
//       if (i==0){
//         map.panTo(new google.maps.LatLng(readings[i].lat,readings[i].lng));
//         map.setZoom(17);
//         mapMoves.panTo(new google.maps.LatLng(readings[i].lat,readings[i].lng));
//         mapMoves.setZoom(17);
//       }
//
//       x = (550) * (180 + (parseFloat(readings[i].lat))) / 360;
//       y = (385) * (90 - (parseFloat(readings[i].lng))) / 180;
//       console.log(x+','+y);
//       // var color = '#00000' + i;
//       // var size = '1px';
//       $("#fieldIMG").append(
//           $('<div class="dot-img"></div>')
//               // .css('position', 'absolute')
//               .css('top', x + 'px')
//               .css('left', y + 'px')
//               // .css('width', size)
//               // .css('height', size)
//               // .css('background-color', color)
//       );
//
//       heatmapData[i] = new google.maps.LatLng(readings[i].lat, readings[i].lng);
//   }
//
//   // console.log(xyPoints);
//
//   var heatmap = new google.maps.visualization.HeatmapLayer({
//     data: heatmapData,
//     radius: 15
//   });
//   heatmap.setMap(mapMoves);
//
// }
//
// function populateLineVelocityChart(insights) {
//
//     var dat = [];
//     var cat = [];
//
//     for (var i=0; i< insights.length; i++){
//       dat[i] = parseFloat(insights[i].vkph);
//       cat[i] = insights[i].time;
//     }
//
//     $(function() {
//         Highcharts.chart('container-linechart', {
//             title: {
//                 text: '',
//                 x: -20 //center
//             },
//             // subtitle: {
//             //     text: 'Source: WorldClimate.com',
//             //     x: -20
//             // },
//             credits: {
//                 enabled: false
//             },
//             xAxis: {
//                 categories: cat
//             },
//             yAxis: [{ // Primary yAxis
//                 labels: {
//                     format: '{value}',
//                     style: {
//                         color: Highcharts.getOptions().colors[1]
//                     }
//                 },
//                 title: {
//                     text: 'Mts/s',
//                     style: {
//                         color: Highcharts.getOptions().colors[1]
//                     }
//                 }
//             }],
//             tooltip: {
//                 valueSuffix: 'Mts/s'
//             },
//             plotOptions: {
//                 line: {
//                     dataLabels: {
//                         enabled: true
//                     },
//                     enableMouseTracking: false
//                 }
//             },
//
//             series: [{
//                 name: 'Meta',
//                 type: 'spline',
//                 data: dat,
//                 tooltip: {
//                     valueSuffix: ' Mts/s'
//                 }
//             }]
//         });
//     });
//
// }

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

}
