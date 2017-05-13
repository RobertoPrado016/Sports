var express = require('express');
var router = express.Router();

//obtenemos el modelo TeamModel con toda la funcionalidad
var TeamModel = require('../models/player');

//Crear jugador
router.post("/create", function(req,res)
{
	//creamos un objeto con los datos a insertar del usuario
	var d = new Date();
	var n = d.getTime();
	var playerObj = {
		id:req.body.id+''+n+req.body.name.charAt(0)+req.body.lastname.charAt(0),//generar ID unico
		name : req.body.name,
        lastname : req.body.lastname,
		age: req.body.age,
        birthday: req.body.birthday,
        birthplace: req.body.birthplace,
        size : parseFloat(req.body.size),
		number : parseFloat(req.body.number),
		position1 : req.body.position1,
		perfil1: req.body.perfil1,
		position2 : req.body.position2,
		perfil2: req.body.perfil2,
		agent: req.body.agent,
		lastteam: req.body.lastteam,
		expiration: req.body.expiration,
		signin: req.body.signin,
        labels: ['inbox']
	};
    var id=req.body.id;
    TeamModel.CreatePlayer(playerObj,id).then(function(player) {
		//si el usuario se ha insertado redireccionamos a admin
		if(player)
		{ 
			console.log('OK, Player Create');
			res.status(200).json(player);
		}
		else{
			res.status(500).json({"msg":"Error"});
		}
	})
	.fail(function(err) {
        console.log(err.body);
	});
});
//Update jugador
router.post("/update", function(req,res)
{
	//creamos un objeto con los datos a actualizar del usuario
	var playerObj = req.body;
    var id=req.user.company.id_team;//USER SESSION: id team
    TeamModel.UpdatePlayer(playerObj,id).then(function(player) {
		//si el usuario se ha insertado redireccionamos a admin
		if(player)
		{ 
			console.log('OK, Player Update');
			res.status(200).json(player);
		}
		else{
			res.status(500).json({"msg":"Error Updating"});
		}
	})
	.fail(function(err) {
        console.log(err.body);
	});
});
//Eliminar jugador
router.post("/delete", function(req,res)
{
	//creamos un objeto con los datos a eliminar del usuario
	var playerObj = {
		id_team:req.body.id_team,//generar ID unico
		id_player: req.body.id_player
	};
    TeamModel.DeletePlayer(playerObj).then(function(player) {
		//si el usuario se ha insertado redireccionamos a admin
		if(player)
		{ 
			console.log('OK, Player Delete');
			res.status(200).json(player);
		}
		else{
			res.status(500).json({"msg":"Error deleting"});
		}
	})
	.fail(function(err) {
        console.log(err.body);
	});
});

//Obtener todos los jugadores
router.get("/get", function(req,res)
{   
	TeamModel.GetPlayers(req.user.company.id_team).then(function(teams) {
		//si el usuario se ha insertado redireccionamos a admin
		if(teams)
		{
			res.status(200).json(teams);					
		}
		else
		{
			res.status(500).json({"msg":"Error"});
		}
	})
	.fail(function(err) {
		console.log(err.body);
	});
	
});
//Obtener un jugador
router.get("/get/:id", function(req,res)
{      
	TeamModel.GetPlayer(req.user.company.id_team,req.params.id).then(function(player) {
		//si el usuario se ha insertado redireccionamos a admin
		if(player)
		{
			res.status(200).json(player);					
		}
		else
		{
			res.status(500).json({"msg":"Error"});
		}
	})
	.fail(function(err) {
		console.log(err.body);
	});
});

module.exports = router;