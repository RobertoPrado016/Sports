/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.mail')
        .controller('chartJs2DCtrl', chartJs2DCtrl);

    /** @ngInject */
    function chartJs2DCtrl($scope) {
        $scope.labels = ["22:04:36", "22:05:01", "22:05:51", "22:06:41", "22:07:28", "22:08:18", "22:09:01"];
        $scope.data = [
            [10, 5, 11, 23, 22, 3, 4]
        ];
        $scope.series = ['Product A', 'Product B'];


        $scope.changeData = function () {
            $scope.data[0] = shuffle($scope.data[0]);
            $scope.data[1] = shuffle($scope.data[1]);
        };

        function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
            }
            return o;
        }
    }

})();