var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	Q = require('q'),
	config = require('./config.js'),
	bcrypt = require('bcryptjs');
 

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/sportslab';
var MongoClient = require('mongodb').MongoClient


//Obtener jugadores
exports.GetPlayers = function (id) {
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
		  deferred.resolve(result.players);
        }
        db.close();
      });
  });

  return deferred.promise;
};
//Obtener jugador
exports.GetPlayer = function (id_team,id_player) {
  console.log('Getting Data Player...',id_team,id_player);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
    collection.findOne({'team.id':id_team})
      .then(function (result) {
        if (null == result) {
          console.log("PLAYER NOT FOUND: "+id_player);
          deferred.resolve(false);
        }
        else {
		  console.log("PLAYER FOUND: "+result.team.name);
		  var i=0;
		  var player={};
		  for(i=0;i<result.players.length;i++){
			  if(result.players[i].id==id_player){			  
				  player=result.players[i];
			  }
		  }
		  deferred.resolve(player);
        }
        db.close();
      });
  });
  return deferred.promise;
};

//Crear un jugador
exports.CreatePlayer = function (playerData,id) {
  console.log('Create Data Player...');
  var deferred = Q.defer();
  playerData.birthday=new Date(playerData.birthday);
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
	console.log('Creating Data...');
     collection.update( 
	{ 'team.id': id},
	{ $push :
        { 
		'players': playerData
		}   
	}); 
	deferred.resolve(playerData);
  });
  return deferred.promise;
};
//Eliminar un jugador
exports.DeletePlayer = function (playerData) {
  console.log('Delete Data Player...');
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
	console.log('Deleting Data...');
     collection.update( 
	{ 'team.id': playerData.id_team},
		{ $pull: { 'players': { id: playerData.id_player } } },
		{ multi: true }
	); 
	deferred.resolve(playerData);
  });
  return deferred.promise;
};
//Actualizar un jugador
exports.UpdatePlayer = function (playerData,id) {
  console.log('Update Data Player...');
  playerData.birthday=new Date(playerData.birthday);
  playerData.signin=new Date(playerData.signin);
  playerData.expiration=new Date(playerData.expiration);
  var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('team');
	console.log('Updating Data...');
    collection.update( 
	{ 'team.id': id,'players.id':playerData.id},
	{ $set : 
		{ "players.$" : playerData } 
	});  
	deferred.resolve(playerData);
  });
  return deferred.promise;
};
