var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	Q = require('q'),
	config = require('./config.js'),
	bcrypt = require('bcryptjs');
 

// Connection URL 
var url = 'mongodb://localhost:27017/sportslab';

// MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/sportslab';
var MongoClient = require('mongodb').MongoClient


exports.Veryfication = function (email) {
  console.log('Veryfing Data...');
  var deferred = Q.defer();

  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('admin');

    collection.findOne({'email' : email})
      .then(function (result) {
        if (null == result) {
          console.log("EMAIL NOT FOUND: "+email);

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
exports.Insert = function (userData) {
  console.log('Insert Data...');
  var deferred = Q.defer();

  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('admin');
	var hash = bcrypt.hashSync(userData.password, 8);
	userData.password=hash;
	console.log('Inserting Data...');
    collection.insert(userData)
            .then(function () {
              db.close();
              deferred.resolve(userData);
            });
  });

  return deferred.promise;
}
exports.Login = function (email,password) {
 console.log('Veryfing Login...');
 var deferred = Q.defer();
  MongoClient.connect(mongodbUrl, function (err, db) {
    var collection = db.collection('admin');

    collection.findOne({'email' : email})
      .then(function (result) {
        if (null == result) {
          console.log("EMAIL NOT FOUND:", email);

          deferred.resolve(false);
        }
        else {
          var hash = result.password;

          console.log("FOUND USER: " + result.username);

          if (bcrypt.compareSync(password, hash)) {
            deferred.resolve(result);
          } else {
            console.log("AUTHENTICATION FAILED");
            deferred.resolve(false);
          }
        }

        db.close();
      });
  });

  return deferred.promise;
}