var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	Q = require('q'),
	config = require('./config.js'),
	bcrypt = require('bcryptjs');
 

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/users';
var MongoClient = require('mongodb').MongoClient


exports.Veryfication = function (email,applicationCode) {
  console.log('Veryfing Data...');
  var deferred = Q.defer();

  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('localUsers');

    collection.findOne({'contact_details.email' : email,'application.code': applicationCode})
      .then(function (result) {
        if (null == result) {
          console.log("USER NOT FOUND: "+email+", "+applicationCode);

          deferred.resolve(false);
        }
        else {
		  deferred.resolve(result);
        }
        db.close();
      });
  });

  return deferred.promise;
}

//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
	var deferred = Q.defer();
	MongoClient.connect(mongodbUrl, function (err, db) {
		if(err){
			console.log('MONGO ERROR: NO DATABASE CONNECTION');
			deferred.resolve(false);
		}
		else{
			var collection = db.collection('localUsers');
			collection.findOne({'user.username' : username,'application.code': 'SPTLAB'})
			.then(function (result) {
			if (null == result) {
			  console.log("USERNAME NOT FOUND:", username);
			  deferred.resolve(false);
			}
			else {
			  var hash = result.user.password;
			  console.log("FOUND USER: " + result.user.username);
			  if (bcrypt.compareSync(password, hash)) {
				deferred.resolve(result);
			  } else {
				console.log("AUTHENTICATION FAILED");
				deferred.resolve(false);
			  }
			}
			db.close();
			});
		} 
  });
  return deferred.promise;
}
//Obtener datos de la compania
exports.getCompany = function (username) {
  console.log('Get Team Data...');
  var deferred = Q.defer();

  MongoClient.connect(mongodbUrl, function (err, db) {
	  
    var collection = db.collection('localUsers');
	console.log('Getting Data...');
    collection.findOne({'user.username' : username})
      .then(function (result) {
        if (null == result) {
          console.log("USER NOT FOUND:", username);
          deferred.resolve(false);
        }
        else {
          console.log("FOUND COMPANY: " + result.company.name);
		  deferred.resolve(result.company);         
        }
        db.close();
      });
  });

  return deferred.promise;
}