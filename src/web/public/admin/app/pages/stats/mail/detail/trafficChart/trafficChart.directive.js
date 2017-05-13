/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats.mail')
      .directive('dataChart', dataChart);

  /** @ngInject */
  function dataChart() {
	  console.log('dataChart Directive');
    return {
      restrict: 'E',
      //controller: 'MailDetailCtrl',
	  template : "<h1>Made by a directive!</h1>"
      //templateUrl: 'admin/app/pages/stats/mail/detail/trafficChart/trafficChart.html'
    };
  }
})();