/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analytics', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
		
    $stateProvider
        .state('analytics', {
          url: '/analytics',
          templateUrl: 'admin/app/pages/analytics/analytics.html',
          title: 'Analítica',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
          authenticate: true
        });
  }
})();
