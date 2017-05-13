/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats.mail')
      .controller('AreaChartCtrlPlayer', AreaChartCtrlPlayer);

  /** @ngInject */
  function AreaChartCtrlPlayer($scope, baConfig, $element, layoutPaths) {
	//console.log('AreaChartCtrlPlayer');
    var layoutColors = baConfig.colors;
    var id = 'areaChart1';
	$scope.CargarDataChart=function(dataChart){
		AmCharts.makeChart(id, {
		  "type": "serial",
		  "theme": "none",
		  "color": layoutColors.defaultText,
		  "dataDateFormat": "YYYY-MM-DD",
		  "precision": 2,
		  "valueAxes": [
		  {
			color: layoutColors.defaultText,
			axisColor: layoutColors.defaultText,
			gridColor: layoutColors.defaultText,
			"id": "v2",
			"title": "Velocidad (m/s)",
			"gridAlpha": 0,
			"position": "left",
			"autoGridCount": false
		  }],
		  "graphs": [{
			"id": "g1",
			"valueAxis": "v2",
			"bullet": "round",
			"bulletBorderAlpha": 1,
			"bulletColor": layoutColors.defaultText,
			color: layoutColors.defaultText,
			"bulletSize": 5,
			"hideBulletsCount": 50,
			"lineThickness": 2,
			"lineColor": layoutColors.success,
			"type": "smoothedLine",
			"title": "Velocidad",
			"useLineColorForBulletBorder": true,
			"valueField": "market1",
			"balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]] m/s</b>"
		  }],
		  "chartScrollbar": {
			"graph": "g1",
			"oppositeAxis": false,
			"offset": 30,
			gridAlpha: 0,
			color: 'none',
			scrollbarHeight: 50,
			backgroundAlpha: 0,
			selectedBackgroundAlpha: 0.05,
			selectedBackgroundColor: layoutColors.defaultText,
			graphFillAlpha: 0,
			autoGridCount: true,
			selectedGraphFillAlpha: 0,
			graphLineAlpha: 0.2,
			selectedGraphLineColor: layoutColors.defaultText,
			selectedGraphLineAlpha: 1
		  },
		  "chartCursor": {
			"pan": true,
			"cursorColor" : layoutColors.danger,
			"valueLineEnabled": true,
			"valueLineBalloonEnabled": true,
			"cursorAlpha": 0,
			"valueLineAlpha": 0.2
		  },
		  "categoryField": "date",
		  "categoryAxis": {
			"axisColor": layoutColors.defaultText,
			"color": layoutColors.defaultText,
			"gridColor": layoutColors.defaultText,
			"parseDates": false,
			"dashLength": 1,
			"minorGridEnabled": true,
			"autoRotateAngle": 25,
			"autoRotateCount": 10
		  },
		  "legend": {
			"useGraphSettings": true,
			"position": "top",
			"color": layoutColors.defaultText
		  },
		  "balloon": {
			"borderThickness": 1,
			"shadowAlpha": 0
		  },
		  "export": {
			"enabled": true
		  },
		  "dataProvider": dataChart,
		  pathToImages: layoutPaths.images.amChart
		});
	}
	AmCharts.makeChart(id, {
	  "type": "serial",
	  "theme": "none",
	  "color": layoutColors.defaultText,
	  "dataDateFormat": "YYYY-MM-DD",
	  "precision": 2,
	  "valueAxes": [
	  {
		color: layoutColors.defaultText,
		axisColor: layoutColors.defaultText,
		gridColor: layoutColors.defaultText,
		"id": "v2",
		"title": "Velocidad (m/s)",
		"gridAlpha": 0,
		"position": "left",
		"autoGridCount": false
	  }],
	  "graphs": [{
		"id": "g1",
		"valueAxis": "v2",
		"bullet": "round",
		"bulletBorderAlpha": 1,
		"bulletColor": layoutColors.defaultText,
		color: layoutColors.defaultText,
		"bulletSize": 5,
		"hideBulletsCount": 50,
		"lineThickness": 2,
		"lineColor": layoutColors.success,
		"type": "smoothedLine",
		"title": "Velocidad",
		"useLineColorForBulletBorder": true,
		"valueField": "market1",
		"balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]] m/s</b>"
	  }],
	  "chartScrollbar": {
		"graph": "g1",
		"oppositeAxis": false,
		"offset": 30,
		gridAlpha: 0,
		color: 'none',
		scrollbarHeight: 50,
		backgroundAlpha: 0,
		selectedBackgroundAlpha: 0.05,
		selectedBackgroundColor: layoutColors.defaultText,
		graphFillAlpha: 0,
		autoGridCount: true,
		selectedGraphFillAlpha: 0,
		graphLineAlpha: 0.2,
		selectedGraphLineColor: layoutColors.defaultText,
		selectedGraphLineAlpha: 1
	  },
	  "chartCursor": {
		"pan": true,
		"cursorColor" : layoutColors.danger,
		"valueLineEnabled": true,
		"valueLineBalloonEnabled": true,
		"cursorAlpha": 0,
		"valueLineAlpha": 0.2
	  },
	  "categoryField": "date",
	  "categoryAxis": {
		"axisColor": layoutColors.defaultText,
		"color": layoutColors.defaultText,
		"gridColor": layoutColors.defaultText,
		"parseDates": false,
		"dashLength": 1,
		"minorGridEnabled": true,
		"autoRotateAngle": 25,
		"autoRotateCount": 10
	  },
	  "legend": {
		"useGraphSettings": true,
		"position": "top",
		"color": layoutColors.defaultText
	  },
	  "balloon": {
		"borderThickness": 1,
		"shadowAlpha": 0
	  },
	  "export": {
		"enabled": true
	  },
	  "dataProvider": [{"date": "00:00:00","market1": 0}],
	  pathToImages: layoutPaths.images.amChart
	});

  }

})();
