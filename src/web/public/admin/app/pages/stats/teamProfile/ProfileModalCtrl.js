(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfile')
        .controller('ProfileModalCtrl', ProfileModalCtrl);

    /** @ngInject */
    function ProfileModalCtrl($scope, $uibModalInstance) {
        console.log($scope.item);
        $scope.link = '';
        $scope.ok = function () {
            $uibModalInstance.close($scope.link);
        };
    }

})();