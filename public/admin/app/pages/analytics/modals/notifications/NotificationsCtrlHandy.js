/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.analytics')
        .controller('NotificationsCtrlHandy', NotificationsCtrlHandy);

    /** @ngInject */
    function NotificationsCtrlHandy($scope, toastr) {
        $scope.showSuccessMsg = function () {
            toastr.success('You have successfully connected to the application!');
        };

        $scope.showInfoMsg = function () {
            toastr.info("You've got a new email!", 'Information');
        };

        $scope.showErrorMsg = function () {
            toastr.error("Your information hasn't been saved!", 'Error');
        };

        $scope.showWarningMsg = function () {
            toastr.warning('Your request was successful', 'Warning');
        };
    }

})();
