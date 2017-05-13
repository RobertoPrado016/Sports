/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
	var url_session='/users/session';
		
	var dataString= $.ajax({type: "GET", url: url_session, async: false}).responseText;
	var dataJson=JSON.parse(dataString);
	var config=dataJson.app_config;
	var modulos=[];
	if(config.type==='DIR'){
		modulos=[
			'BlurAdmin.pages.stats.mail',
            'BlurAdmin.pages.stats.teamProfile',
            'BlurAdmin.pages.stats.performance'
			];
	}
	else if(config.type==='TRN'){
		modulos=[
			'BlurAdmin.pages.stats.mail',
			'BlurAdmin.pages.stats.teamProfileSee',
            'BlurAdmin.pages.stats.performance'
		];
	}

    angular.module('BlurAdmin.pages.stats', modulos)
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('stats', {
                url: '/stats',
                abstract: true,
                template: '<div ui-view></div>',
                title: 'Estadísticas',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0,
                },
            });
    }

})();
