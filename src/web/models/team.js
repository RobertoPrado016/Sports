var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	Q = require('q'),
	config = require('./config.js'),
	bcrypt = require('bcryptjs');
 

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/sportslab';
var MongoClient = require('mongodb').MongoClient

//Obtener un team por id
exports.GetTeam = function (id) {
  console.log('Getting Data...',id);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
    collection.findOne({'team.id' : id})
      .then(function (result) {
        if (null == result) {
          console.log("TEAM NOT FOUND: "+id);
          deferred.resolve(false);
        }
        else {
		  console.log("TEAM FOUND: "+result.team.name);
		  deferred.resolve(result.team);
        }
        db.close();
      });
  });

  return deferred.promise;
};

//Actualizar datos de equipo
exports.Update = function (teamData) {
  console.log('Update Data...',teamData);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
	console.log('Updating Data...');
    collection.update( 
	{ 'team.id': teamData.id},
	{ $set : 
		{ 
		'team.name': teamData.name,
		'team.address':teamData.address,
		'team.webSite':teamData.webSite
		}
	}); 
	deferred.resolve(teamData);
  });
  return deferred.promise;
};
//Actualizar path de imagen de equipo: en construcción
exports.UpdateImagePath = function (imgObj) {
  console.log('Update Data...',imgObj);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
	console.log('Updating Data...');
    collection.update( 
	{ 'team.id': imgObj.id},
	{ $set : 
		{ 
		'team.image': imgObj.name+'.'+imgObj.ext
		}
	}); 
	deferred.resolve(imgObj);
  });
  return deferred.promise;
};

