var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');

var LocalStrategy = require('passport-local');

var PythonShell = require('python-shell');
	
var UserModel = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');
var teams = require('./routes/teams');
var players = require('./routes/players');
var sensor = require('./routes/sensor');
var trainning = require('./routes/trainnings');

//===============PASSPORT=================

// Passport session setup.
passport.serializeUser(function(user, done) {
    console.log("serializing " + user.user.username);
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log("deserializing " + obj);
    done(null, obj);
});

// Use the LocalStrategy within Passport to login users.
passport.use('local-signin', new LocalStrategy({
        passReqToCallback: true
    }, //allows us to pass back the request to the callback
    function(req, username, password, done) {
		UserModel.localAuth(username, password, done)
			.then(function(user) {
				if (user) {
					console.log("LOGGED IN AS: " + user.user.username); 
					req.session.success = 'You are successfully logged in ' + user.user.username + '!';
					done(null, user);
				}
				if (!user) {
					console.log("No Existe");
					done(null, user);		
				}
			})
			.fail(function(err) {
				console.log(err.body);
			});
    }
));
passport.authenticate('local-signin', { failureFlash: 'Invalid username or password.' });
passport.authenticate('local-signin', { successFlash: 'Welcome!' });


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.error = 'Please sign in!';
    res.redirect('/signin');
}


//===============EXPRESS=================
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('admin_path',path.join(__dirname,'views','admin'+path.sep));
app.set('sensor_path',path.join(__dirname,'python_module','code'+path.sep));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({secret: 'ssshhhhh',resave: true,saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/users', users);
app.use('/teams', teams);
app.use('/player', players);
app.use('/sensor', sensor);
app.use('/trainning', trainning);
app.use('/', index);

//ROUTES 
//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
	 failureFlash: true
}));
//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res) {
    var name = req.user.user.username;
    console.log("LOGGIN OUT " + req.user.user.username)
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});
//Ruta que permite cargar imagenes
app.post('/upload', function(req, res) {
    console.log('PARAMS: ',req.params);
    var pathname='../web/public/admin/assets/img/team/';
    //fs.unlinkSync('../web/public/admin/assets/img/team/team.jpg');
	var form = new formidable.IncomingForm({ 
	  uploadDir: __dirname + '/public/admin/assets/img/team',  // don't forget the __dirname here
	  keepExtensions: true
	});
    form.on('fileBegin', function(name, file) {
        if (fs.existsSync(path)) {
        // Do something
        console.log('Exist '+file.name);
            fs.unlinkSync('../web/public/admin/assets/img/team/'+file.name);
        }
        else {
            console.log('Dont Exist '+file.name);
        }
    });
     form.on('file', function(field, file) {
            //rename the incoming file to the file's name
            fs.rename(file.path, form.uploadDir + "/" + file.name);
			//fs.rename(file.path, form.uploadDir + "/" + 'team');
      });
		
    form.parse(req, function(err, fields, files) {
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.end(util.inspect({fields: fields, files: files}));
        
      /*res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));*/
        
        /*console.log('File name Parse: '+files.upload.name);
       res.status(200).json({"file":files.upload.name});*/	
        res.redirect('/home#/stats/teamProfile');
    });
	//
	
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server=app.listen(8082, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 8082);
}); 
/*SOCKET*/
var TrainningModel = require('./models/trainning');
var io = require('socket.io').listen(server);
require('./routes/sensor')(app,io); 
var results=[];
io.on('connection', function(socket) { 
  console.log('REALTIME: Alguien se ha conectado con Sockets');
  
  //socket.emit('messages', results);

   socket.on('new-message', function(data) {
		console.log("REALTIME:: msg recevied=>", 'new-message');
		results.push(data);
		io.sockets.emit('messages', results);
   });
  
   socket.on('data-sensor', function(data) {
	   console.log("REALTIME:: msg recevied=>", 'data-sensor');
	   var pyshell = new PythonShell('./python_module/code/getResults.py');
	   var dataSensor={};
	   pyshell.on('message', function (message) {
		   dataSensor=message;
		   var value = '{"response":"success","result":' + dataSensor + '}';
		   io.sockets.emit('results', value);
		   });   
	});
	//Search data by nmea id
	socket.on('data-sensor-especific', function(data) {
	   console.log("REALTIME:: msg recevied=>", 'data-sensor-especific');
	   console.log("REALTIME:: data-sensor-especific =>", data);  
	   
	   var dataSensor={};
	   var pyshell = new PythonShell('./python_module/code/getresults_by.py');
	   var data_trainning={};
		TrainningModel.GetBy(data)
		.then(function(trainning) {
			if(trainning){				
				var dataset="";
				for(var i=0;i<trainning.nmea.length;i++){
					if(i==(trainning.nmea.length-1))dataset+=trainning.nmea[i];
					else dataset+=trainning.nmea[i]+"and";
				}
				//trainning.replace(/'/g, '"');
				console.log(dataset);
				pyshell.send(dataset);
				pyshell.on('message', function (message) {
					console.log('on SCRIPT');
					dataSensor=message;
					console.log('on SCRIPT',dataSensor);
					var value = '{"response":"success","result":' + dataSensor + '}';
					io.sockets.emit('resultsById', value);
				});  
				pyshell.end(function (err) {
				  if (err) throw err;///ERROR PYTHON
				  console.log('finished');
				});
			}
			else console.log("Error Getting");
		})
		.fail(function(err) {console.log(err.body);});	   		   
	});
 	//Search data by nmea data input
	socket.on('data-sensor-nmea', function(nmea) {
	   console.log("REALTIME:: msg recevied=>", 'data-sensor-especific-nmea'); 
	   
	    var dataSensor={};
	    var pyshell = new PythonShell('./python_module/code/getresults_by.py');
		var dataset="";
		for(var i=0;i<nmea.length;i++){
			if(i==(nmea.length-1))dataset+=nmea[i];
			else dataset+=nmea[i]+"and";
		}
		//trainning.replace(/'/g, '"');
		pyshell.send(dataset);
		pyshell.on('message', function (message) {
			console.log('on SCRIPT');
			dataSensor=message;
			var value = '{"response":"success","result":' + dataSensor + '}';
			io.sockets.emit('resultsAfterNmea', value);
		});  
		pyshell.end(function (err) {
		  if (err) throw err;///ERROR PYTHON
		  console.log('finished');
		});
	}); 
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

module.exports = app;
