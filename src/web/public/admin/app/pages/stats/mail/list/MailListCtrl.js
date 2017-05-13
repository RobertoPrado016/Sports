/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.stats.mail')
    .controller('MailListCtrl', MailListCtrl);

  /** @ngInject */
  function MailListCtrl($stateParams, $scope, $uibModal,$http,$window) { 
		//obtener datosdel usario
		$http({
			method: 'GET',
			url: '/users/session'
		}).then(function successCallback(response) {
			$scope.user={
				team: response.data.company.id_team
			};
		},function errorCallback(response) {})
		.then(function(){});
		  
		var vm = this;
		//obtener lista de jugadores a partir de servicio
		$http({method: 'GET',url: '/player/get'}).then(function successCallback(response) {vm.messages=response.data;}, function errorCallback(response) {});        
		
		vm.label = $stateParams.label;  
	    
		//SAVE DATA PLAYER
		$scope.SendDataPlayer = function () {
			var fechaNacimiento=new Date($scope.dataPlayer.birthday);
			var edad=calcularEdad(fechaNacimiento);
			console.log(edad);
			
			var obj = {
				id: $scope.user.team,
				name : $scope.dataPlayer.name,
				lastname : $scope.dataPlayer.lastname,
				age: edad,
				birthday: $scope.dataPlayer.birthday,
				//birthplace: $scope.dataPlayer.birthplace,
				birthplace: '',
				size : $scope.dataPlayer.size,
				number : $scope.dataPlayer.number,
				position1 : $scope.dataPlayer.position1,
				perfil1: $scope.dataPlayer.perfil1, 
				/*position2 : $scope.dataPlayer.position2,
				perfil2: $scope.dataPlayer.perfil2,
				agent: $scope.dataPlayer.agent,
				lastteam: $scope.dataPlayer.lastteam,
				expiration: $scope.dataPlayer.expiration*/
				position2 : "",
				perfil2: "",
				agent: "",
				lastteam: "",
				signin:'',
				expiration: ""
			};	
			var config = {
				headers : {
					'Content-Type': 'application/json;'
				}
			}
			$http({
				method: 'POST',
				url: 'player/create',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: obj
			}).then(function successCallback(response) {
				$scope.PostDataResponse = 'Jugador ingresado con éxito.';
				$http({method: 'GET',url: '/player/get'}).then(function successCallback(response) {vm.messages=response.data;}, function errorCallback(response) {});        
				$scope.dataPlayer={};
				
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
		//Delete player
		$scope.DeletePlayer = function (id_player) {
			var obj = {
					id_team: $scope.user.team,
					id_player: id_player,
			};	
			var config = {
				headers : {
					'Content-Type': 'application/json;'
				}
			}
			$http({
				method: 'POST',
				url: 'player/delete',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
					},
				data: obj
			}).then(function successCallback(response) {
				$scope.PostDataResponse = 'Jugador eliminado con éxito.';
				$http({method: 'GET',url: '/player/get'}).then(function successCallback(response) {vm.messages=response.data;}, function errorCallback(response) {});        
				$scope.dataPlayer={};
				
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};

		//Modals
		$scope.OpenModal=function (name,id){
			if(name==='add'){
				angular.element('#addModal').css('display', 'block');
			}
			else if(name==='delete'){
				angular.element('#deleteModal'+id).css('display', 'block');
			}   
		}
		$scope.CloseModal=function (name,id){
			if(name==='add') angular.element('#addModal').css('display', 'none');
			else if(name==='delete') angular.element('#deleteModal'+id).css('display', 'none');
		}
		// When the user clicks anywhere outside of the modal, close it
		$window.onclick = function(event) {
			if (event.target.id == event.target.id) {
				angular.element('#'+event.target.id).css('display', 'none');
			}
			else if (event.target.id == 'addModal') {
				angular.element('#addModal').css('display', 'none');
			}
		}
		//DatePicker Controller
		$scope.open = open;
		$scope.opened = false;
		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		$scope.options = {
			showWeeks: false
		};
		function open() {
			$scope.opened = true;
		};
    }
})();
function calcularEdad(fechaNacimiento)
{
	var fecha=new Date(fechaNacimiento);
	// Si la fecha es correcta, calculamos la edad
	var dia = fecha.getDate()
	var mes = fecha.getMonth()+1;
	var anio = fecha.getFullYear();
	console.log("Nacimiento: ",dia,mes,anio);

	// cogemos los valores actuales
	var fecha_hoy = new Date();
	var ahora_dia = fecha_hoy.getDate();
	var ahora_mes = fecha_hoy.getMonth()+1;
	var ahora_anio = fecha_hoy.getFullYear();
	

	console.log("Hoy: ",ahora_dia,ahora_mes,ahora_anio);

	// realizamos el calculo
	var edad = (ahora_anio+1900) - anio;
	if ( ahora_mes < mes )
	{
		edad--;
	}
	if ((mes == ahora_mes) && (ahora_dia < dia))
	{
		edad--;
	}
	if (edad >= 1900)
	{
		edad -= 1900;
	}

	// calculamos los meses
	var meses=0;
	if(ahora_mes>mes)
		meses=ahora_mes-mes;
	if(ahora_mes<mes)
		meses=12-(mes-ahora_mes);
	if(ahora_mes==mes && dia>ahora_dia)
		meses=11;

	// calculamos los dias
	var dias=0;
	if(ahora_dia>dia)
		dias=ahora_dia-dia;
	if(ahora_dia<dia)
	{
		ultimoDiaMes=new Date(ahora_anio, ahora_mes, 0);
		dias=ultimoDiaMes.getDate()-(dia-ahora_dia);
	}
	return edad;
}
