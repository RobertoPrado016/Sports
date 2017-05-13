/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.3);
        $scope.charts = [{
            color: pieColor,
            description: 'Caminó',
            stats: '495',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Trotó',
            stats: '947',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Corrió',
            stats: '328',
            icon: 'refresh',
        }, {
            color: pieColor,
            description: 'Picó',
            stats: '10197',
            icon: 'refresh',
        },
        ];

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
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

            $('.refresh-data').on('click', function () {
                updatePieCharts();
            });
        }

        function updatePieCharts() {
            $('.pie-charts .chart').each(function (index, chart) {
                $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
            });
        }

        $timeout(function () {
            loadPieCharts();
            updatePieCharts();
        }, 1000);
    }
})();
