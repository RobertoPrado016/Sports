/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfile', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stats.teamProfile', {
                url: '/teamProfile',
                templateUrl: 'admin/app/pages/stats/teamProfile/profile.html',
                title: 'Team Profile',
                controller: 'ProfileTeamPageCtrl',
                sidebarMeta: {
                    order: 100,
                },
            });
    }

})();
