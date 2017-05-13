/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats')
      .directive('statsCalendar', statsCalendar);

  /** @ngInject */
  function statsCalendar() {
	  console.log('Calendar Directiva');
    return {
      restrict: 'E',
      controller: 'StatsCalendarCtrl',
      templateUrl:   'admin/app/pages/stats/mail/detail/dashboardCalendar/dashboardCalendar.html'
	  //templateUrl: 'admin/app/pages/stats/mail/detail/trafficChart/trafficChart.html'
    };
  }
})();