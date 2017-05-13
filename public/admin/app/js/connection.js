/**
 * Created by Handytec on 2/22/2017.
 */
var thickValue = 1;

var webSocket;

function openSocket(url) {
    // Ensures only one connection is open at a time
    if (webSocket !== undefined &&
        webSocket.readyState !== WebSocket.CLOSED) {
        writeResponse("WebSocket is already opened.");
        return;
    }
    // Create a new instance of the websocket
    webSocket = new WebSocket(url);

    webSocket.onopen = function(event) {
        var sol = '{"request":"connect"}';
        webSocket.send(sol);
    };

    webSocket.onmessage = function(event) {
        writeResponse(event.data);
    };

    webSocket.onclose = function(event) {
        console.log("Connection closed");
    };
}

function start() {
    var sol = '{"request":"start"}';
    webSocket.send(sol);
}

function stop() {
    closeSocket();
}

function closeSocket() {
    webSocket.close();
}

function writeResponse(text) {

    var response = JSON.parse(text);

    console.log("Received Algorithm results!")
    console.log(response);


    if (typeof response != 'undefined') {
        //console.log(response.response);
        if (response.response == 'success') {
			//console.log('Cargando datos a mapa: v2');
            populateHeatMap(response.result.readings);
			populateSpeedResults(response.result.speed_results);
			populateDon(response.result.speed_results);
			populateBar(response.result.speed_results);
			populateCharts(response.result.insights);
			//populateLineVelocityChart(response.result.insights);
        }
    }
}

