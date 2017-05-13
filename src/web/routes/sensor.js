var PythonShell = require('python-shell');
var path='/sensor';
module.exports = function(app,io) {
	app.get(path+'/test', function(req, res) {
		var pyshell = new PythonShell(req.app.get("sensor_path")+'test.py');
		//res.status(200).json('OPEN SENSOR');	
		// sends a message to the Python script via stdin
		pyshell.send('hello');

		pyshell.on('message', function (message) {
		  // received a message sent from the Python script (a simple "print" statement)
		  console.log(message);
		});

		// end the input stream and allow the process to exit
		pyshell.end(function (err) {
		  if (err) throw err;
		  console.log('finished');
		});
	});
}
