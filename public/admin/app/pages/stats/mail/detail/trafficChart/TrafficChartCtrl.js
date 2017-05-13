/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats.mail')
      .controller('DataChartCtrl', DataChartCtrl);

  /** @ngInject */
  function DataChartCtrl($scope, baConfig, colorHelper) {

      $scope.transparent = baConfig.theme.blur;
      var dashboardColors = baConfig.colors.dashboard;
      $scope.doughnutData = {
          labels: [
              'Caminar',
              'Trotar',
              'Correr',
              'Sprints',
          ],
          datasets: [
              {
                  data: [2000, 1500, 1000, 1200],
                  backgroundColor: [
                      '#337ab7',
                      'rgba(232, 86, 86, 0.85)',
                      'rgba(223, 184, 28, 0.85)',
                      'rgba(144, 185, 0, 0.85)',

                  ],
                  hoverBackgroundColor: [
                      colorHelper.shade(dashboardColors.white, 15),
                      colorHelper.shade(dashboardColors.blueStone, 15),
                      colorHelper.shade(dashboardColors.surfieGreen, 15),
                      colorHelper.shade(dashboardColors.silverTree, 15)
                  ],
                  percentage: [0, 0, 0, 0]
              }]
      };
	  $scope.dataMet = $scope.doughnutData.datasets[0].data;
	  $scope.percentMet = $scope.doughnutData.datasets[0].percentage;
	  $scope.dataTotalMet=5700;
  }
})();