var express = require('express');
var router = express.Router();

//obtenemos el modelo UserModel con toda la funcionalidad
var UserModel = require('../models/user');
var TeamModel = require('../models/team');

 /**ROUTER*/
//Crear un usuario por su id
router.post("/create", function(req,res)
{
	//creamos un objeto con los datos a insertar del usuario
	var userObj = {
		id : null,
		username : req.body.username,
		email : req.body.email,
		password : req.body.password,
		created_at : null,
		updated_at : null,
		type:  req.body.type,
		appCode: req.body.type
	};
	UserModel.Veryfication(userObj.email, userObj.appCode).then(function(user) {
        if (user) {
            console.log("LOGGED IN AS: " + user.user.username); 
			res.redirect("/user/signup?signup=1");
        }
        if (!user) {
            console.log("No Existe");
			UserModel.Insert(userObj).then(function(user) {
				//si el usuario se ha insertado redireccionamos a user
				if(user)
				{
					res.redirect("/admin");							
				}
				else
				{
					res.status(500).json({"msg":"Error"});
				}
			})
			.fail(function(err) {
				console.log(err.body);
			});
					
         }
    })
    .fail(function(err) {
        console.log(err.body);
    });
});
//Obtenemos la session verificando primero si existe
router.get('/session', function(req, res, next) {
	console.log("SESSION");
	var userObj={};
	if (req.isAuthenticated()) {
        res.status(200).json(req.user);	
    }
	else{
		res.status(200).json({"session":false});	
	}	
});
router.get("/get/data/team/:username", function(req,res)
{
	//creamos un objeto con los datos a buscar
	var userData = {
		username : req.params.username,
	};
	console.log("User: ",userData);
	UserModel.getTeam(userData.username).then(function(team) {
        if (team) {
            console.log("TEAM IS " + team.name); 
			res.status(200).json(team);	
        }
        if (!team) {
            console.log("No Existe");
			res.status(500).json({"msg":"No existe"});		
        }
    })
    .fail(function(err) {
        console.log(err.body);
    });
});
//Crear un team
router.post("/team/create", function(req,res)
{
	console.log(req.body);
	//creamos un objeto con los datos a insertar del usuario
	var teamObj = {
		id : req.body.id,
		name : req.body.name,
		address : req.body.address,
		webSite : req.body.site,
		created_at : null,
		updated_at : null,
		username: req.body.username
	};
	TeamModel.Veryfication(teamObj.username).then(function(team) {
        if (team) {
			//update in construction
            console.log("TEAM EXISTS"); 
			TeamModel.Update(teamObj).then(function(team) {
				//si el usuario se ha insertado redireccionamos a admin
				if(team)
				{
					res.status(200).json({"msg":"OK, Team Update"});					
				}
				else
				{
					res.status(500).json({"msg":"Error"});
				}
			})
			.fail(function(err) {
				console.log(err.body);
			});
        }
        if (!team) {
            console.log("No Existe");
			TeamModel.Insert(teamObj).then(function(team) {
				//si el usuario se ha insertado redireccionamos a admin
				if(team)
				{
					res.status(200).json({"msg":"OK, Team Insert"});					
				}
				else
				{
					res.status(500).json({"msg":"Error"});
				}
			})
			.fail(function(err) {
				console.log(err.body);
			});
					
         }
    })
    .fail(function(err) {
        console.log(err.body);
    });
});


module.exports = router;