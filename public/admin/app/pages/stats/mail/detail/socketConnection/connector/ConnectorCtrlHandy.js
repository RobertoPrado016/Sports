/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.mail')
        .controller('ConnectorCtrlHandy', ConnectorCtrlHandy);

    /** @ngInject */
    function ConnectorCtrlHandy($scope, toastr) {

        $scope.connect = function () {
            openSocket('ws://localhost:5500/websocket');
            // toastr.success('You have successfully connected to the application!');
        };

        $scope.start = function () {
            $scope.updatePieCharts();
            toastr.info("You've got a new email!", 'Information');
        };

    }

})();
