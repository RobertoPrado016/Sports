(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfileSee')
        .controller('ProfileTeamSeePageCtrl', ProfilePageSeeCtrl);

    /** @ngInject */
    function ProfilePageSeeCtrl($scope, fileReader, $filter, $uibModal, $http) {
		console.log("LOAD PROFILE See PAGE CTRL");
		
		$http({
		  method: 'GET',
		  url: '/users/session'
		})
		.then(function successCallback(response) {
			console.log(response.data);
			console.log("LOAD SESSION");
			$scope.user={
				name:response.data.user.username,
				avatar: response.data.user.avatar
			};
			$scope.dataTeam={
				name:response.data.company.name,
				address: response.data.company.address.description+", "+response.data.company.address.province+" "+response.data.company.address.city,
				site:response.data.company.web
			};
		}
		, function errorCallback(response) {
		});
					
		
		//SAVE DATA TEAM
		$scope.SendDataTeam = function () {
			var obj = {
					name : $scope.dataTeam.name,
					address : $scope.dataTeam.address,
					site: $scope.dataTeam.site,
					username: $scope.user.name
			};	
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
			//console.log(obj);
												
			$http({
				method: 'POST',
				url: "/teams/create",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: obj
			})
			.success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
			
        };

        $scope.picture = $filter('appImage')('team/del_valle.jpg');

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();

        };


        $scope.unconnect = function (item) {
            item.href = undefined;
        };

        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/profileModal.html'
            }).result.then(function (link) {
                item.href = link;
            });
        };

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                });
        };

        $scope.switches = [true, true, false, true, true, false];
    }

})();
