/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats')
      .controller('BarChartCtrl1', BarChartCtrl1);

  /** @ngInject */
  function BarChartCtrl1($scope, baConfig, $element, layoutPaths) {
    var layoutColors = baConfig.colors;
    var id = 'barChart1';
	
	$scope.CargarDataBar=function(dataBar){
		AmCharts.makeChart(id, {
		  type: 'serial',
		  theme: 'blur',
		  color: layoutColors.defaultText,
		  dataProvider: [
			{
			  zonas: 'Alta desaceleracion',
			  visits: dataBar[0],
			  color: layoutColors.primary
			},
			{
			  zonas: 'Moderada desaceleración',
			  visits: dataBar[1],
			  color: layoutColors.danger

			},
			{
			  zonas: 'Baja desaceleración',
			  visits: dataBar[2],
			  color: layoutColors.info
			},
			{
			  zonas: 'Baja aceleración',
			  visits: dataBar[3],
			  color: layoutColors.success
			},
			{
			  zonas: 'Moderada aceleración',
			  visits: dataBar[4],
			  color: layoutColors.warning
			},
			{
			  zonas: 'Alta aceleración',
			  visits: dataBar[5],
			  color: layoutColors.primaryLight
			}
		  ],
		  valueAxes: [
			{
			  axisAlpha: 0,
			  position: 'left',
			  title: 'Actividad por zona',
			  gridAlpha: 0.5,
			  gridColor: layoutColors.border,
			}
		  ],
		  startDuration: 1,
		  graphs: [
			{
			  balloonText: '<b>[[category]]: [[value]]</b>',
			  fillColorsField: 'color',
			  fillAlphas: 0.7,
			  lineAlpha: 0.2,
			  type: 'column',
			  valueField: 'visits'
			}
		  ],
		  chartCursor: {
			categoryBalloonEnabled: false,
			cursorAlpha: 0,
			zoomable: false
		  },
		  categoryField: 'zonas',
		  categoryAxis: {
			gridPosition: 'start',
			labelRotation: 0,
			gridAlpha: 0.5,
			gridColor: layoutColors.border,
		  },
		  export: {
			enabled: true
		  },
		  creditsPosition: 'top-right',
		  pathToImages: layoutPaths.images.amChart
		});
	}
    var barChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: [
        {
          zonas: 'Alta desaceleracion',
          visits: 0,
          color: layoutColors.primary
        },
        {
          zonas: 'Moderada desaceleración',
          visits: 0,
          color: layoutColors.danger

        },
        {
          zonas: 'Baja desaceleración',
          visits: 0,
          color: layoutColors.info
        },
        {
          zonas: 'Baja aceleración',
          visits: 0,
          color: layoutColors.success
        },
        {
          zonas: 'Moderada aceleración',
          visits: 0,
          color: layoutColors.warning
        },
        {
          zonas: 'Alta aceleración',
          visits: 0,
          color: layoutColors.primaryLight
        }
      ],
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Actividad por zona',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      startDuration: 1,
      graphs: [
        {
          balloonText: '<b>[[category]]: [[value]]</b>',
          fillColorsField: 'color',
          fillAlphas: 0.7,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'visits'
        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'zonas',
      categoryAxis: {
        gridPosition: 'start',
        labelRotation: 0,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
      },
      export: {
        enabled: true
      },
      creditsPosition: 'top-right',
      pathToImages: layoutPaths.images.amChart
    });
	
  }
})();
