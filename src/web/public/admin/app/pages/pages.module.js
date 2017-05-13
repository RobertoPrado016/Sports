/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages', [
            'ui.router',
            'BlurAdmin.pages.analytics',
            'BlurAdmin.pages.stats',
			//'BlurAdmin.pages.charts',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
		$urlRouterProvider.otherwise('/analytics');
		/*baSidebarServiceProvider.addStaticItem({
             title: 'Stats',
             icon: 'ion-compose',
             subMenu: [
			 {
                 title: 'Training Results',
                 fixedHref: '/home#/stats/Player/inbox',
                 blank: false
             }, 
			 {
                 title: 'Team Profile',
                 fixedHref: '/home#/stats/teamProfile',
                 blank: false
             },
			 {
                 title: 'Team Profile',
                 fixedHref: '/home#/stats/teamProfile',
                 blank: false
             }, 			 
			 {
                 title: 'Performance',
                 fixedHref: '/home#/stats/performance',
				 blank: false
             }
			 ]
         });*/

    }

})();
