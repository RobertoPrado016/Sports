(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.teamProfile')
        .controller('ProfileTeamPageCtrl', ProfilePageCtrl);

    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, $filter, $uibModal, $http) {
		console.log("LOAD PROFILE PAGE CTRL");

        //Secuencia para obtener datos: se obtiene datos del usario y a partir del id de equipo se se buscan datos de equipo
        $http({
          method: 'GET',
          url: '/users/session'
        })
        .then(function successCallback(response) {
            console.log("LOAD SESSION");
            $scope.user={
                name:response.data.user.username,
                avatar: response.data.user.avatar,
                team: response.data.company.id_team
            };
        }
        , function errorCallback(response) {
        })
        .then(function(){
            $http({
              method: 'GET',
              url: '/teams/get/'+ $scope.user.team
            })
            .then(function successCallback(response) {
                console.log("LOAD TEAM: ",response.data);
                $scope.dataTeam={
					id:response.data.id,
                    name:response.data.name,
                    address: response.data.address,
                    site:response.data.webSite,
					imageTeam: response.data.image
                };
				$scope.picture = $filter('appImage')('team/'+$scope.dataTeam.imageTeam);
            }
            , function errorCallback(response) {
            });
        });

		//SAVE DATA TEAM
		$scope.SendDataTeam = function () {
			var obj = {
					id: $scope.dataTeam.id,
					name : $scope.dataTeam.name,
					address : $scope.dataTeam.address,
					site: $scope.dataTeam.site
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
				console.log("Success",data.msg);
                $scope.PostDataResponse = data.msg;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
			
        };

        

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {
            var obj = {
					fileImage: $scope.fileImage,
			};	
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
			//console.log(obj);
												
			$http({
				method: 'POST',
				url: "/upload",
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
				console.log("Success",data.msg);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };


        $scope.unconnect = function (item) {
            item.href = undefined;
        };
        $scope.items='scope';

        $scope.showModal = function () {
            $uibModal.open({
                animation: false,
                controller: 'ProfileTeamPageCtrl',
                templateUrl: 'admin/app/pages/stats/teamProfile/modals/modalTemplates/basicModal.html'
            }).result.then(function (link) {});
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
