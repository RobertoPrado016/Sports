/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.performance', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stats.performance', {
                url: '/performance',
                templateUrl: 'admin/app/pages/stats/performance/smart/tables.html',
                title: 'Registros',
                controller: 'TablesPageCtrl',
                sidebarMeta: {
                    order: 100,
                },
            });
    }

})();
