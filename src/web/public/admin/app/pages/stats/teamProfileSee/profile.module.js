/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfileSee', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stats.teamProfileSee', {
                url: '/teamProfileSee',
                templateUrl: 'admin/app/pages/stats/teamProfileSee/profile.html',
                title: 'Perfil de equipo',
                controller: 'ProfileTeamSeePageCtrl',
                sidebarMeta: {
                    order: 100,
                },
            });
    }

})();
