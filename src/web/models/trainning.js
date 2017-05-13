var MongoClient = require('mongodb').MongoClient,
	mongo=require('mongodb'),
	assert = require('assert'),
	Q = require('q'),
	config = require('./config.js'),
	bcrypt = require('bcryptjs'),
	nmea = require('node-nmea');
	
var PythonShell = require('python-shell');	
 

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/sportslab';
var MongoClient = require('mongodb').MongoClient

//Crear un jugador
exports.CreateTrainning = function (trainningData) {
	console.log('Create Trainning...');
  	var l=trainningData.nmea.length;
	var date=new Date(trainningData.date);
	trainningData.date=date;

	var data1 = nmea.parse(trainningData.nmea[0].split('\r\r')[0]);
	var data2 = nmea.parse(trainningData.nmea[l-1].split('\r\r')[0]);
	var start=new Date(trainningData.date.getFullYear(),trainningData.date.getMonth(),trainningData.date.getDate(),data1.datetime.getHours(),data1.datetime.getMinutes(),data1.datetime.getSeconds(),data1.datetime.getMilliseconds());
	var end=new Date(trainningData.date.getFullYear(),trainningData.date.getMonth(),trainningData.date.getDate(),data2.datetime.getHours(),data2.datetime.getMinutes(),data2.datetime.getSeconds(),data2.datetime.getMilliseconds());
	
	if(data1.datetime.getHours() < 12) trainningData.session=0
	else if(data1.datetime.getHours() >= 12) trainningData.session=1;

	trainningData.start=start.getTime();
	trainningData.end=end.getTime();
	
	var title_start=(('0'+data1.datetime.getHours()).slice(-2))+":"+(('0'+data1.datetime.getMinutes()).slice(-2));
	var title_end  =(('0'+data2.datetime.getHours()).slice(-2))+":"+(('0'+data2.datetime.getMinutes()).slice(-2));
	
	trainningData.title=title_start+" a "+title_end;
	
	/*Calcular results*/
		var dataSensor={};
	    var pyshell = new PythonShell('./python_module/code/getresults_by.py');
		var dataset="";
		for(var i=0;i<trainningData.nmea.length;i++){
			if(i==(trainningData.nmea.length-1))dataset+=trainningData.nmea[i];
			else dataset+=trainningData.nmea[i]+"and";
		}
		//trainning.replace(/'/g, '"');
		var deferred = Q.defer();
		pyshell.send(dataset);
		pyshell.on('message', function (message) {
			console.log('on load results: PYSHELL');
			dataSensor=message;
			var value = '{"response":"success","result":' + dataSensor + '}';
			trainningData.results=JSON.parse(dataSensor);
			
			MongoClient.connect(mongodbUrl, function (err, db) {
				var collection = db.collection('trainnings');
				console.log('Creating Data trainning...');
				collection.insert(trainningData)
				.then(function () {
				  db.close();
				});
				deferred.resolve(trainningData);
			});
			
		});  
		pyshell.end(function (err) {
		  if (err) throw err;///ERROR PYTHON
		  console.log('finished');
		  
		});
		return deferred.promise;
};
//Get trainnings by id player
exports.Get = function (id_player) {
  console.log('Getting Trainning Player...',id_player);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
	var result=[];
    var collection = db.collection('trainnings');
	collection.find({'id_player':id_player}).toArray(function(err, result) {
        if (err) {
          console.log("TRAINNING NOT FOUND: "+id_player);
          deferred.resolve(false);
        }
        else {
		  console.log("TRAINNING FOUND: "+result.title);
		  deferred.resolve(result);
        }
        db.close();
		});
  });
  return deferred.promise;
};
//Get trainning by id
exports.GetBy = function (id) {
  console.log('Getting Trainning By...',id);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
	var result=[];
    var collection = db.collection('trainnings');
	var o_id = new mongo.ObjectID(id);
    collection.findOne({'_id' : o_id})
      .then(function (result) {
        if (null == result) {
          console.log("TRAINNING NOT FOUND: "+id);
          deferred.resolve(false);
        }
        else {
		  console.log("TRAINNING FOUND: "+result.title);
		  deferred.resolve(result);
        }
        db.close();
      });
  });
  return deferred.promise;
};
//Get trainnings by date
exports.GetByDate = function (dateStr) {
  console.log('Getting Trainnings By Date...',date);
  var date=new Date(dateStr);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
	var result=[];
    var collection = db.collection('trainnings');
	collection.find({'date':date}).toArray(function(err, result) {
        if (err) {
          console.log("TRAINNINGS NOT FOUND: "+date);
          deferred.resolve(false);
        }
        else {
		  console.log("TRAINNINGS FOUND: "+result);
		  deferred.resolve(result);
        }
        db.close();
		});
  });
  return deferred.promise;
};
//Get trainnings 
exports.GetAll = function () {
  console.log('Getting Trainnings All ...');
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
	var result=[];
    var collection = db.collection('trainnings');
	collection.find().toArray(function(err, result) {
        if (err) {
          console.log("TRAINNINGS NOT FOUND: ");
          deferred.resolve(false);
        }
        else {
		  console.log("TRAINNINGS FOUND: "+result);
		  deferred.resolve(result);
        }
        db.close();
		});
  });
  return deferred.promise;
};


