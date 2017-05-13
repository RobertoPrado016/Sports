/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.mail', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stats.mail', {
                url: '/Player',
                abstract: true,
                templateUrl: 'admin/app/pages/stats/mail/mail.html',
                controller: "MailTabCtrl",
                controllerAs: "tabCtrl",
                title: 'Entrenamiento',
                sidebarMeta: {
                    order: 0,
                },
            }).state('stats.mail.label', {
            url: '/:label',
            templateUrl: 'admin/app/pages/stats/mail/list/mailList.html',
            title: 'Entrenamiento',
            controller: "MailListCtrl",
            controllerAs: "listCtrl"
        }).state('stats.mail.detail', {
            url: '/:label/:id',
            templateUrl: 'admin/app/pages/stats/mail/detail/mailDetail.html',
            title: 'Entrenamiento',
            controller: "MailDetailCtrl",
            controllerAs: "detailCtrl"
        });
        $urlRouterProvider.when('/stats/Player', '/stats/Player/inbox');
    }

})();
