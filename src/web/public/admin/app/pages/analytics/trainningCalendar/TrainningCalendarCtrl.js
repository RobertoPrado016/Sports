/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.analytics')
      .controller('TrainningCalendarCtrl', TrainningCalendarCtrl);

  /** @ngInject */
  function TrainningCalendarCtrl($scope,$http,$timeout) {
		console.log("TrainningCalendarCtrl");
		$scope.events_analytics=[];
		$http({
			method: 'GET',
			url: '/trainning/get_s'
		})
		.then(function successCallback(response) {
			$scope.events=response.data.trainnings;
			createCalendar("#calendar_compare",$scope.events);
		},function errorCallback(response) {})
		.then(function(){});
		
		$scope.loadPlayers=function(date,id){
			var fecha=new Date(date);
			$http({
				method: 'GET',
				url: '/trainning/get/Players/'+fecha+'/'+id
			}).then(function successCallback(response) {	
				$scope.players_analytics=response.data;			
			},function errorCallback(response) {})
			.then(function(){				
				$scope.players_list=[];
				for(var i=0;i<$scope.players_analytics.players.length;i++){
					$http({
						method: 'GET',
						url: '/player/get/'+$scope.players_analytics.players[i].id_player
					}).then(function successCallback(response_p) {
						$scope.players_list.push(response_p.data);
					},function errorCallback(response_p) {})
					.then(function(){});
				}	
			})
			.then(function(){	
				console.log($scope.players_analytics);
				$scope.peopleTableData =$scope.players_list ;
				$scope.players_data=$scope.players_analytics.players;
			});
		};
		$scope.colors_id=["red","blue","orange","#fff","yellow","green","gray"];
		$scope.metricsTableData=[];
		$scope.createGraphs=function(item,index){
			item.results=$scope.players_data[index];			
			$scope.metricsTableData.push(item);	
			populateAnalyticsCharts(item.results.results.insights);	
					
		};
		
		function populateAnalyticsCharts(insights) {
		  console.log($scope.metricsTableData);	
		  
		  var scope=angular.element(document.getElementById('areaChart10')).scope();
		  var scope2=angular.element(document.getElementById('areaChart20')).scope();
		  
		  var dataChartVel=[];
		  var dataChartAc=[];
		  var menor=100000000000000000000000000000000000;
		  for(var m=0;m<$scope.metricsTableData.length;m++){
				  console.log("creando data for "+$scope.metricsTableData[m].results.results.insights.length);
				  if($scope.metricsTableData[m].results.results.insights.length<menor)menor=$scope.metricsTableData[m].results.results.insights.length;
		  }
		  console.log("Menor",menor);
		  for(var i=0;i<menor;i++){
			  
			  var data_line_str='{"date": "'+insights[i].time+'",';
			  for(var n=0;n<$scope.metricsTableData.length;n++){
				  if(n==($scope.metricsTableData.length-1))data_line_str+='"market'+(n+1)+'":'+ insights[i].vmps+'';
				  else data_line_str+='"market'+(n+1)+'":'+ $scope.metricsTableData[n].results.results.insights[i].vmps+',';
			  }
			  data_line_str+='}';
			  
			  var data_line_a_str='{"date": "'+insights[i].time+'",';
			  for(var p=0;p<$scope.metricsTableData.length;p++){
				  if(p==($scope.metricsTableData.length-1))data_line_a_str+='"market'+(p+1)+'":'+ insights[i].accel+'';
				  else data_line_a_str+='"market'+(p+1)+'":'+ $scope.metricsTableData[p].results.results.insights[i].accel+',';
			  }
			  data_line_a_str+='}';
			  
			  
			  var data_line_json=JSON.parse(data_line_str);
			  var data_line_json_a=JSON.parse(data_line_a_str);
			  dataChartVel.push(data_line_json);

			  dataChartAc.push(data_line_json_a);
		  }
		  var cargar1=scope.CargarDataChart;
		  var cargar2=scope2.CargarDataChart;
		  //console.log(dataChartVel);
		  cargar1(dataChartVel); 
		  cargar2(dataChartAc);
		}
		$scope.multiBarData = {
		  labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
		  series: [
			[5, 4, 3, 7],
			[3, 2, 9, 5],
			[1, 5, 8, 4],
			[2, 3, 4, 6],
			[4, 1, 2, 1]
		  ]
		};	
	$scope.multiBarOptions = {
      fullWidth: true,
      height: "300px",
      stackBars: true,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value.split(/\s+/).map(function (word) {
            return word[0];
          }).join('');
        }
      },
      axisY: {
        offset: 20
      }
    };

    $scope.multiBarResponsive = [
      ['screen and (min-width: 400px)', {
        reverseData: true,
        horizontalBars: true,
        axisX: {
          labelInterpolationFnc: Chartist.noop
        },
        axisY: {
          offset: 60
        }
      }],
      ['screen and (min-width: 700px)', {
        stackBars: false,
        reverseData: false,
        horizontalBars: false,
        seriesBarDistance: 15
      }]
    ];	
    $timeout(function(){
      new Chartist.Bar('#multi-bar', $scope.multiBarData, $scope.multiBarOptions, $scope.multiBarResponsive);
    });

	
  }
})();
