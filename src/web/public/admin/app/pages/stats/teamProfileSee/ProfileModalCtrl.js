(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfileSee')
        .controller('ProfileModalsSeeCtrl', ProfileModalSeeCtrl);

    /** @ngInject */
    function ProfileModalSeeCtrl($scope, $uibModalInstance) {
        $scope.link = '';
        $scope.ok = function () {
            $uibModalInstance.close($scope.link);
        };
    }

})();