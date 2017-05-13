/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analytics')
      .directive('analyticsCalendar', analyticsCalendar);

  /** @ngInject */
  function analyticsCalendar() {
    return {
      restrict: 'E',
      controller: 'AnalyticsCalendarCtrl',
      templateUrl: 'admin/app/pages/analytics/dashboardCalendar/dashboardCalendar.html'
    };
  }
})();