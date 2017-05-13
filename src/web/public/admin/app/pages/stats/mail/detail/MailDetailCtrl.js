/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.stats.mail')
        .controller('MailDetailCtrl', MailDetailCtrl).config(chartJsConfig);

    /** @ngInject */
    function MailDetailCtrl($stateParams,$http,$scope,$window,baConfig,colorHelper,$element,layoutPaths,$filter, fileReader) {
        var vm = this;
        //vm.mail = mailMessages.getMessageById($stateParams.id);
		$http({method: 'GET',url: '/player/get/'+$stateParams.id})
		.then(function successCallback(response) {
			vm.mail=response.data;
			vm.mail.number=parseFloat(vm.mail.number);
			vm.mail.size=parseFloat(vm.mail.size);
			vm.mail.birthday=new Date(vm.mail.birthday);
			vm.mail.signin=new Date(vm.mail.signin);
			vm.mail.expiration=new Date(vm.mail.expiration);
		}, function errorCallback(response) {});
        vm.label = $stateParams.label;
				
		//Modals
		$scope.OpenModal=function (name,id){
			     if(name==='update1')angular.element('#updateModal1').css('display', 'block');
			else if(name==='update2')angular.element('#updateModal2').css('display', 'block');
			else if(name==='update3')angular.element('#updateModal3').css('display', 'block');
			else if(name==='update4')angular.element('#updateModal4').css('display', 'block'); 
			else if(name==='update5')angular.element('#updateModal5').css('display', 'block');  	 			
		}
		$scope.CloseModal=function (name,id){
			     if(name==='update1') angular.element('#updateModal1').css('display', 'none');
			else if(name==='update2') angular.element('#updateModal2').css('display', 'none');
			else if(name==='update3') angular.element('#updateModal3').css('display', 'none');
			else if(name==='update4') angular.element('#updateModal4').css('display', 'none');
			else if(name==='update5') angular.element('#updateModal5').css('display', 'none');
		}
		// When the user clicks anywhere outside of the modal, close it
		$window.onclick = function(event) {
			     if (event.target.id == 'updateModal1') angular.element('#updateModal1').css('display', 'none');
			else if (event.target.id == 'updateModal2') angular.element('#updateModal2').css('display', 'none');
			else if (event.target.id == 'updateModal3') angular.element('#updateModal3').css('display', 'none');
			else if (event.target.id == 'updateModal4') angular.element('#updateModal4').css('display', 'none');
			else if (event.target.id == 'updateModal5') angular.element('#updateModal5').css('display', 'none');
		}	
		//Service: update player 
		$scope.UpdateDataPlayer = function (player) {
			var obj = player;
			var config = {
				headers : {
					'Content-Type': 'application/json;'
				}
			}
			$http({
				method: 'POST',
				url: 'player/update',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				data: obj
			}).then(function successCallback(response) {
				$scope.PostDataResponse = 'Jugador actualizado con éxito.';
				$http({method: 'GET',url: '/player/get/'+$stateParams.id})
				.then(function successCallback(response) {
					vm.mail=response.data;
					vm.mail.number=parseFloat(vm.mail.number);
					vm.mail.size=parseFloat(vm.mail.size);
					vm.mail.birthday=new Date(vm.mail.birthday);
					vm.mail.signin=new Date(vm.mail.signin);
					vm.mail.expiration=new Date(vm.mail.expiration);
				}, function errorCallback(response) {});				
				
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
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
		//Defualt img profile
		$scope.profilePicture = $filter('appImage')('theme/no-photo.png');
		//events calendar
		$http({
			method: 'GET',
			url: '/trainning/get/'+$stateParams.id
		}).then(function successCallback(response) {
			for(var i=0;i<response.data.length;i++){
				var id=response.data[i]['_id'];
				response.data[i].id=id;
			}
			$scope.events=response.data;
			createCalendar("#calendar_player",$scope.events);
		},function errorCallback(response) {})
		.then(function(){});
		
		/*LOAD FILE*/
		$scope.getFile = function () {
			$scope.progress = 0;
			fileReader.readAsDataUrl($scope.file, $scope)
			  .then(function(result) {
				  //console.log("Result: ",result);
					 // By lines
				var lines = result.split('\n');
				var lines_clean=[];
				for(var line = 0; line < lines.length; line++){
					var res_split = lines[line].split(",");
					if(lines[line]!=''&&res_split[0]=='$GPGGA'&&res_split[2]!='')lines_clean.push(lines[line]);;				
				}
				$scope.file_nmea = lines_clean;
				$scope.file_nmea_advert = 'Archivo cargado';
				//console.log($scope.file_nmea);
			});
		};
	 
		$scope.$on("fileProgress", function(e, progress) {
			$scope.progress = progress.loaded / progress.total;
		});
		$scope.CreateTraining = function (training) {
			//console.log(training,$scope.file_nmea);
			var obj = {
				title : '',
				date : training.date,
				nmea : $scope.file_nmea,
				id_player: $stateParams.id,
				'class': "event-success"
			};
			$http({
				method: 'POST',
				url: 'trainning/create',
				headers: {'Content-Type': 'application/json '},
				data: obj
			}).then(function successCallback(response) {
				$scope.PostDataResponseEvent = 'Entrenamiento creado.';		
				$http({
					method: 'GET',
					url: '/trainning/get/'+$stateParams.id
				}).then(function successCallback(response) {
					for(var i=0;i<response.data.length;i++){
						var id=response.data[i]['_id'];
						response.data[i].id=id;
					}
					$scope.events=response.data;
					change();
				},function errorCallback(response) {})
				.then(function(){});
				
			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
    }

    function chartJsConfig(ChartJsProvider, baConfigProvider) {
        var layoutColors = baConfigProvider.colors;
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
            responsive: true,
            scaleFontColor: layoutColors.defaultText,
            scaleLineColor: layoutColors.border,
            pointLabelFontColor: layoutColors.defaultText
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
		//4
		    var layoutColors = baConfigProvider.colors;
    AmCharts.themes.blur = {

      themeName: "blur",

      AmChart: {
        color: layoutColors.defaultText,
        backgroundColor: "#FFFFFF"
      },

      AmCoordinateChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmStockChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark]
      },

      AmSlicedChart: {
        colors: [layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.primaryDark, layoutColors.warningLight, layoutColors.successDark, layoutColors.successLight, layoutColors.primaryLight, layoutColors.warningDark],
        labelTickColor: "#FFFFFF",
        labelTickAlpha: 0.3
      },

      AmRectangularChart: {
        zoomOutButtonColor: '#FFFFFF',
        zoomOutButtonRollOverAlpha: 0.15,
        zoomOutButtonImage: "lens.png"
      },

      AxisBase: {
        axisColor: "#FFFFFF",
        axisAlpha: 0.3,
        gridAlpha: 0.1,
        gridColor: "#FFFFFF"
      },

      ChartScrollbar: {
        backgroundColor: "#FFFFFF",
        backgroundAlpha: 0.12,
        graphFillAlpha: 0.5,
        graphLineAlpha: 0,
        selectedBackgroundColor: "#FFFFFF",
        selectedBackgroundAlpha: 0.4,
        gridAlpha: 0.15
      },

      ChartCursor: {
        cursorColor: layoutColors.primary,
        color: "#FFFFFF",
        cursorAlpha: 0.5
      },

      AmLegend: {
        color: "#FFFFFF"
      },

      AmGraph: {
        lineAlpha: 0.9
      },
      GaugeArrow: {
        color: "#FFFFFF",
        alpha: 0.8,
        nailAlpha: 0,
        innerRadius: "40%",
        nailRadius: 15,
        startWidth: 15,
        borderAlpha: 0.8,
        nailBorderAlpha: 0
      },

      GaugeAxis: {
        tickColor: "#FFFFFF",
        tickAlpha: 1,
        tickLength: 15,
        minorTickLength: 8,
        axisThickness: 3,
        axisColor: '#FFFFFF',
        axisAlpha: 1,
        bandAlpha: 0.8
      },

      TrendLine: {
        lineColor: layoutColors.danger,
        lineAlpha: 0.8
      },

      // ammap
      AreasSettings: {
        alpha: 0.8,
        color: layoutColors.info,
        colorSolid: layoutColors.primaryDark,
        unlistedAreasAlpha: 0.4,
        unlistedAreasColor: "#FFFFFF",
        outlineColor: "#FFFFFF",
        outlineAlpha: 0.5,
        outlineThickness: 0.5,
        rollOverColor: layoutColors.primary,
        rollOverOutlineColor: "#FFFFFF",
        selectedOutlineColor: "#FFFFFF",
        selectedColor: "#f15135",
        unlistedAreasOutlineColor: "#FFFFFF",
        unlistedAreasOutlineAlpha: 0.5
      },

      LinesSettings: {
        color: "#FFFFFF",
        alpha: 0.8
      },

      ImagesSettings: {
        alpha: 0.8,
        labelColor: "#FFFFFF",
        color: "#FFFFFF",
        labelRollOverColor: layoutColors.primaryDark
      },

      ZoomControl: {
        buttonFillAlpha: 0.8,
        buttonIconColor: layoutColors.defaultText,
        buttonRollOverColor: layoutColors.danger,
        buttonFillColor: layoutColors.primaryDark,
        buttonBorderColor: layoutColors.primaryDark,
        buttonBorderAlpha: 0,
        buttonCornerRadius: 0,
        gridColor: "#FFFFFF",
        gridBackgroundColor: "#FFFFFF",
        buttonIconAlpha: 0.6,
        gridAlpha: 0.6,
        buttonSize: 20
      },

      SmallMap: {
        mapColor: "#000000",
        rectangleColor: layoutColors.danger,
        backgroundColor: "#FFFFFF",
        backgroundAlpha: 0.7,
        borderThickness: 1,
        borderAlpha: 0.8
      },

      // the defaults below are set using CSS syntax, you can use any existing css property
      // if you don't use Stock chart, you can delete lines below
      PeriodSelector: {
        color: "#FFFFFF"
      },

      PeriodButton: {
        color: "#FFFFFF",
        background: "transparent",
        opacity: 0.7,
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        boxSizing: "border-box"
      },

      PeriodButtonSelected: {
        color: "#FFFFFF",
        backgroundColor: "#b9cdf5",
        border: "1px solid rgba(0, 0, 0, .3)",
        MozBorderRadius: "5px",
        borderRadius: "5px",
        margin: "1px",
        outline: "none",
        opacity: 1,
        boxSizing: "border-box"
      },

      PeriodInputField: {
        color: "#FFFFFF",
        background: "transparent",
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      },

      DataSetSelector: {
        color: "#FFFFFF",
        selectedBackgroundColor: "#b9cdf5",
        rollOverBackgroundColor: "#a8b0e4"
      },

      DataSetCompareList: {
        color: "#FFFFFF",
        lineHeight: "100%",
        boxSizing: "initial",
        webkitBoxSizing: "initial",
        border: "1px solid rgba(0, 0, 0, .3)"
      },

      DataSetSelect: {
        border: "1px solid rgba(0, 0, 0, .3)",
        outline: "none"
      }

    };
    }
})();
(function (module) {
     
    var fileReader = function ($q, $log) {
 
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsText(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
    };
 
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);
 
}(angular.module("BlurAdmin.pages.stats.mail")));
