/**
 * Created by Handytec on 2/22/2017.
 */
socket = io.connect('http://localhost:8082', { 'forceNew': true });
socket.on('resultsById', function(data) {  
	var response=JSON.parse(data);
	if (typeof response != 'undefined') {
		if (response.response == 'success') {
			populateHeatMap(response.result.readings);
			populateSpeedResults(response.result.speed_results);
			populateDon(response.result.speed_results);
			populateBar(response.result.speed_results);
			populateCharts(response.result.insights);
		}
	}
})

socket.on('resultsAfterNmea', function(data) {  
	console.log("Recibiendo ");
		var response=JSON.parse(data);
		var insights_aux;
		var speed_results_aux;
		if (typeof response != 'undefined') {
			console.log(response);
			/*insights_aux=response.result.insights;
			item.speed_results=response.result.speed_results;
			console.log("add ",$scope.metricsTableData,item);
			$scope.metricsTableData.push();
			$scope.metricsTableData.push(item);*/
		}
});


function render (data) {  
  var html = data.map(function(elem, index) {
	return('<div><strong>'+elem.author+'</strong>:<em>'+elem.text+'</em> </div>');
  }).join(" ");

  //document.getElementById('messages').innerHTML = html;
}
//Enviar datos segun el tipo de solicitud
function addMessage(e) {  
  var message = {
	//author: document.getElementById('username').value,
	//text: document.getElementById('texto').value
  };
  socket.emit('new-message', message);
  return false;
}
function getResults(e) {  
  socket.emit('data-sensor', '');
  return false;
}
function getResultsById(e) {  
  socket.emit('data-sensor-especific', e);
  return false;
}

