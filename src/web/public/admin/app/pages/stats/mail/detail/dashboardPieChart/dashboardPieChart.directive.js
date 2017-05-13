/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats')
        .directive('dashboardPieChart', dashboardPieChart);

    /** @ngInject */
    function dashboardPieChart() {
		console.log('Directiva pie');
        return {
            restrict: 'E',
            controller: 'DashboardPieChartCtrl',
            templateUrl: 'admin/app/pages/stats/mail/detail/dashboardPieChart/dashboardPieChart.html'
        };
    }
})();