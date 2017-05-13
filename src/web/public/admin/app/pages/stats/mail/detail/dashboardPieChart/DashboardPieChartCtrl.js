/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.stats')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.3);

        $scope.charts = [{
            color: pieColor,
            description: 'Caminó',
            stats: '5859',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Trotó',
            stats: '',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Corrió',
            stats: '',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Picó',
            stats: '',
            icon: 'refresh',
        }, ];

        function initialize() {
            // boxes = new google.maps.MVCArray();
            //
            // // map = new google.maps.Map(document.getElementById('gmap_geocoding'), {
            // //     center: {
            // //         lat: -0.209292,
            // //         lng: -78.419442
            // //     },
            // //     zoom: 18,
            // //     mapTypeId: google.maps.MapTypeId.SATELLITE
            // // });
            //
            // mapMoves = new google.maps.Map(document.getElementById('gmap_moves'), {
            //     center: {
            //         lat: -0.209292,
            //         lng: -78.419442
            //     },
            //     zoom: 18,
            //     mapTypeId: google.maps.MapTypeId.SATELLITE
            // });
            //
            // // Create the search box and link it to the UI element.
            // var input = document.getElementById('pac-input');
            // searchBox = new google.maps.places.SearchBox(input);
            // // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
            // mapMoves.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
            //
            // // Bias the SearchBox results towards current map's viewport.
            // var markers = [];
            // // map.addListener('bounds_changed', function() {
            // //     searchBox.setBounds(map.getBounds());
            // // });
            //
            // mapMoves.addListener('bounds_changed', function() {
            //     searchBox.setBounds(mapMoves.getBounds());
            // });
            //
            // searchBox.addListener('places_changed', function() {
            //     var places = searchBox.getPlaces();
            //
            //     if (places.length == 0) {
            //         return;
            //     }
            //
            //     // Clear out the old markers.
            //     markers.forEach(function(marker) {
            //         marker.setMap(null);
            //     });
            //     markers = [];
            //
            //     // For each place, get the icon, name and location.
            //     var bounds = new google.maps.LatLngBounds();
            //     places.forEach(function(place) {
            //         if (!place.geometry) {
            //             console.log("Returned place contains no geometry");
            //             return;
            //         }
            //
            //         if (place.geometry.viewport) {
            //             // Only geocodes have viewport.
            //             bounds.union(place.geometry.viewport);
            //         } else {
            //             bounds.extend(place.geometry.location);
            //         }
            //     });
            //     // map.fitBounds(bounds);
            //     // map.setZoom(16);
            //     mapMoves.fitBounds(bounds);
            //     mapMoves.setZoom(16);
            // });
            //
            // // var listener = google.maps.event.addListener(map, "idle", function() {
            // //     map.setZoom(19);
            // //     google.maps.event.removeListener(listener);
            // // });
            //
            // var listenerMoves = google.maps.event.addListener(mapMoves, "idle", function() {
            //     mapMoves.setZoom(19);
            //     google.maps.event.removeListener(listenerMoves);
            // });
            //
            // var drawingManager = new google.maps.drawing.DrawingManager({
            //     drawingMode: google.maps.drawing.OverlayType.MARKER,
            //     drawingControl: true,
            //     drawingControlOptions: {
            //         position: google.maps.ControlPosition.BOTTOM_CENTER,
            //         drawingModes: ['polygon', 'rectangle']
            //     },
            //     markerOptions: {
            //         icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            //     },
            //     circleOptions: {
            //         fillColor: '#ffff00',
            //         fillOpacity: 1,
            //         strokeWeight: 5,
            //         clickable: false,
            //         editable: true,
            //         zIndex: 1
            //     }
            // });
            //
            // // drawingManager.setMap(map);
            //
            // google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            //     var path = polygon.getPath();
            //     var coords = [];
            //     for (var i = 0; i < path.length; i++) {
            //         coords.push({
            //             latitude: path.getAt(i).lat(),
            //             longitude: path.getAt(i).lng()
            //         });
            //     }
            //
            //     console.warn("These are the coordinates");
            //     console.log(coords);
            //
            //     bounds = new google.maps.LatLngBounds();
            //     paths = polygon.getPath();
            //     paths.forEach(function(latlng, i) {
            //         bounds.extend(latlng);
            //     });
            //
            //     console.warn("These are the bounds");
            //     console.log(bounds);
            //
            //     fieldBounds = new google.maps.Rectangle({
            //         bounds: bounds,
            //         map: map,
            //         strokeColor: '#ffff00',
            //         strokeOpacity: 0.5,
            //         strokeWeight: 5
            //     });
            //
            //     //Calculate the small box size.
            //     maxBoxCnt = 20;
            //     sw = bounds.getSouthWest();
            //     ne = bounds.getNorthEast();
            //     ystep = Math.abs(sw.lat() - ne.lat()) / maxBoxCnt;
            //     boxH = Math.abs(sw.lat() - ne.lat()) / (maxBoxCnt + 1);
            //     xstep = Math.abs(sw.lng() - ne.lng()) / maxBoxCnt;
            //     boxW = Math.abs(sw.lng() - ne.lng()) / (maxBoxCnt + 1);
            //
            //     for (y = 0; y < maxBoxCnt; y++) {
            //         for (x = 0; x < maxBoxCnt; x++) {
            //             //Detect that polygon is able to contain a small box.
            //             bounds = new google.maps.LatLngBounds();
            //             posArry = [];
            //             posArry.push(new google.maps.LatLng(sw.lat() + ystep * y, sw.lng() + xstep * x));
            //             posArry.push(new google.maps.LatLng(sw.lat() + ystep * y, sw.lng() + xstep * x + boxW));
            //             posArry.push(new google.maps.LatLng(sw.lat() + ystep * y + boxH, sw.lng() + xstep * x));
            //             posArry.push(new google.maps.LatLng(sw.lat() + ystep * y + boxH, sw.lng() + xstep * x + boxW));
            //             flag = true;
            //             for (i = 0; i < posArry.length; i++) {
            //                 pos = posArry[i];
            //                 // if (flag) {
            //                 flag = google.maps.geometry.poly.containsLocation(pos, polygon);
            //                 bounds.extend(pos);
            //                 // }
            //             }
            //
            //             //Draw a small box.
            //             if (flag) {
            //                 box = new google.maps.Rectangle({
            //                     bounds: bounds,
            //                     map: map,
            //                     strokeColor: '#00ffff',
            //                     strokeOpacity: 0.5,
            //                     strokeWeight: 1,
            //                     fillColor: '#00ffff',
            //                     fillOpacity: 0.5,
            //                     clickable: false
            //                 });
            //                 boxes.push(box);
            //             }
            //         }
            //     }
            //
            //
            // });
            var mapCanvas = document.getElementById('gmap_moves');
            var mapOptions = {
              center: new google.maps.LatLng(44.5403, -78.5463),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(mapCanvas, mapOptions);
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function loadPieCharts() {
            $('.chart').each(function() {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function(from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round',
                });
            });

            $('.refresh-data').on('click', function() {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function(index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
            });
        }

        $timeout(function() {
            loadPieCharts();
            updatePieCharts();
            initialize();
        }, 1000);
    }
})();
