var express = require('express');
var router = express.Router();

//obtenemos el modelo TeamModel con toda la funcionalidad
var TrainningModel = require('../models/trainning');
//Crear jugador
router.post("/create", function(req,res)
{ 	//console.log('NMEAR ROUTE',req.body.nmea);
	//creamos un objeto con los datos a insertar del usuario
	var d = new Date();
	var n = d.getTime();
	var trainningObj = {
		id_player: req.body.id_player,
		title : req.body.title,
        date : req.body.date,
		'class' : req.body['class'],
		nmea : req.body.nmea
	};
    var id=req.body.id;
    TrainningModel.CreateTrainning(trainningObj)
	.then(function(trainning) {
		if(trainning)
		{ 
			console.log('OK, Trainning Create');
			res.status(200).json(trainning);
		}
		else{
			res.status(500).json({"msg":"Error"});
		}
	})
	.fail(function(err) {
        console.log('ERROR: ',err);
	});
});
//Obtener trainnings por id de jugador
router.get("/get/:id", function(req,res)
{
	TrainningModel.Get(req.params.id).then(function(trainning) {
		if(trainning)
		{
			res.status(200).json(trainning);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Obtener un trainning por id 
router.get("/getBy/:id", function(req,res)
{
	TrainningModel.GetBy(req.params.id).then(function(trainning) {
		if(trainning)
		{
			res.status(200).json(trainning);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Obtener un trainnings por date 
router.get("/getByDate/:id", function(req,res)
{
	TrainningModel.GetByDate(req.params.id).then(function(trainnings) {
		if(trainnings)
		{
			res.status(200).json(trainnings);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Get players for date of trainning
router.get("/get/Players/ByDate/:date", function(req,res)
{
	var id_team=req.user.company.id_team;
	TrainningModel.GetByDate(req.params.date).then(function(trainnings) {
		if(trainnings)
		{	
			var players=[];
			for(var i=0;i<trainnings.length;i++){
				players.push(trainnings[i].id_player);
			}
			var players_filter=[];
			var index=0;
			var count=0;
			for(var j=0;j<trainnings.length;j++){
				index=0;
				count=0;
				while(index<players_filter.length){
					if(trainnings[j].id_player==players_filter[index].id_player){
						count++;
					}
					index++;
				}
				if(count==0||j==0){
					var data_nmea=[];
					for(var m=0;m<trainnings.length;m++){
						if(trainnings[m].id_player==trainnings[j].id_player){
							data_nmea.push({"title":trainnings[m].title,"set":trainnings[m].nmea});
						}
					}
					console.log("push:"+trainnings[j].id_player+" team: "+id_team);
					players_filter.push({"id_player":trainnings[j].id_player,"nmea_set":data_nmea});
				}
			}
			var resultado={"date":new Date(req.params.date),"players":players_filter};
			res.status(200).json(resultado);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Obtener trainnings: obtener entrenamientos, 1 por cada día de entrenamiento
router.get("/get", function(req,res)
{	
	TrainningModel.GetAll().then(function(trainnings) {
		if(trainnings)
		{
			var trainnings_dirty=[];
			//Se crea objetos de todos los entrenamientos
			for(var i=0;i<trainnings.length;i++){
				var trainningObj={};
				trainningObj.id=trainnings[i]['_id'];
				var fecha=trainnings[i].date;
				trainningObj.title="Abrir";
				trainningObj.date=trainnings[i].date;
				trainningObj.loadPlayers="javascript:loadPlayers("+trainnings[i]['date'].getTime()+");";
				trainnings_dirty.push(trainningObj);
			}
			var trainnings_filter=[];
			var index=0;
			var count=0;
			//Eliminamos entrenamientos con fechas duplicadas
			for(var j=0;j<trainnings_dirty.length;j++){
				index=0;
				count=0;
				while(index<trainnings_filter.length){
					if(trainnings_dirty[j].date.getTime() ==trainnings_filter[index].date.getTime() ){
						count++;
					}
					index++;
				}
				if(count==0||j==0){
					trainnings_dirty[j].start=trainnings_dirty[j].date.getTime();
					trainnings_dirty[j].end=trainnings_dirty[j].date.getTime();
					trainnings_filter.push(trainnings_dirty[j]);
				}
			}
			res.status(200).json({"trainnings":trainnings_filter});					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Get trainnings with sessions: 0: jornada 1  1: jornada 2
router.get("/get_s", function(req,res)
{
	TrainningModel.GetAll().then(function(trainnings) {
		if(trainnings)
		{
			var trainnings_dirty=[];
			for(var i=0;i<trainnings.length;i++){
				var trainningObj={};
				trainningObj.id=trainnings[i]['_id'];
				var fecha=trainnings[i].date;
				trainningObj.title="Abrir";
				trainningObj.date=trainnings[i].date;				
				trainningObj.session=trainnings[i].session;
				trainnings_dirty.push(trainningObj);
			}
			var trainnings_filter=[];
			var index=0;
			var count=0;
			
			var count_session0=0;
			var count_session1=0;
			
			var trainnings_jornadas=[];
			for(var j=0;j<trainnings_dirty.length;j++){
				count_session0=0;
				count_session1=0;
				for(var k=0;k<trainnings_dirty.length;k++){
					if(trainnings_dirty[j].date.getTime() == trainnings_dirty[k].date.getTime()){
						if(trainnings_dirty[k].session == 0)count_session0++;
						else if(trainnings_dirty[k].session == 1)count_session1++;
					}
				}
				var jornada={};
				if(count_session0>0 && count_session1==0)jornada.tipo='mañana';
				else if(count_session0==0 && count_session1>0)jornada.tipo='tarde';
				else if(count_session0>0 && count_session1>0)jornada.tipo='ambos';
				trainnings_jornadas.push(jornada);
				trainnings_dirty[j].jornada=jornada;
			}
			
			for(var l=0;l<trainnings_dirty.length;l++){
				index=0;
				count=0;
								
				while(index<trainnings_filter.length){
					if( trainnings_dirty[l].date.getTime() == trainnings_filter[index].date.getTime() ){
						count++;
					}
					index++;
				}
				if(count==0||l==0){
					
					//trainnings_dirty[j].start=trainnings_dirty[j].date.getTime();
					//trainnings_dirty[j].end=trainnings_dirty[j].date.getTime();
					if(trainnings_dirty[l].jornada.tipo=='mañana'){
						var fecha_Trainning=trainnings_dirty[l].date;
						trainnings_dirty[l].start=new Date(fecha_Trainning.getFullYear(),fecha_Trainning.getMonth(),fecha_Trainning.getDate(),6,0,0).getTime();
						trainnings_dirty[l].end=new Date(fecha_Trainning.getFullYear(),fecha_Trainning.getMonth(),fecha_Trainning.getDate(),11,59,0).getTime();
						trainnings_dirty[l].title="Jornada 1";
						trainnings_dirty[l].loadPlayers="javascript:loadPlayers("+trainnings_dirty[l]['date'].getTime()+","+trainnings_dirty[l]['session']+");";
						trainnings_filter.push(trainnings_dirty[l]);
					}
					else if(trainnings_dirty[l].jornada.tipo=='tarde'){
						var fecha_Trainning=trainnings_dirty[l].date;
						trainnings_dirty[l].start=new Date(fecha_Trainning.getFullYear(),fecha_Trainning.getMonth(),fecha_Trainning.getDate(),12,0,0).getTime();
						trainnings_dirty[l].end=new Date(fecha_Trainning.getFullYear(),fecha_Trainning.getMonth(),fecha_Trainning.getDate(),23,59,0).getTime();
						trainnings_dirty[l].title="Jornada 2";
						trainnings_dirty[l].loadPlayers="javascript:loadPlayers("+trainnings_dirty[l]['date'].getTime()+","+trainnings_dirty[l]['session']+");";
						trainnings_filter.push(trainnings_dirty[l]);						
					}
					else if(trainnings_dirty[l].jornada.tipo=='ambos'){
						var fecha_Trainning3=new Date(trainnings_dirty[l].date);
						var trainning_0 = Object.assign({}, trainnings_dirty[l]);
						//var trainning_0=trainnings_dirty[l];
						trainning_0.start=new Date(fecha_Trainning3.getFullYear(),fecha_Trainning3.getMonth(),fecha_Trainning3.getDate(),6,0,0).getTime();
						trainning_0.end=new Date(fecha_Trainning3.getFullYear(),fecha_Trainning3.getMonth(),fecha_Trainning3.getDate(),11,59,0).getTime();
						trainning_0.title="Jornada 1";
						trainning_0.loadPlayers="javascript:loadPlayers("+trainning_0['date'].getTime()+",0)";
						trainnings_filter.push(trainning_0);
						
						var trainning_1=trainnings_dirty[l];
						trainning_1.start=new Date(fecha_Trainning3.getFullYear(),fecha_Trainning3.getMonth(),fecha_Trainning3.getDate(),12,0,0).getTime();
						trainning_1.end=new Date(fecha_Trainning3.getFullYear(),fecha_Trainning3.getMonth(),fecha_Trainning3.getDate(),23,59,0).getTime();
						trainning_1.title="Jornada 2";
						trainning_1.loadPlayers="javascript:loadPlayers("+trainning_1['date'].getTime()+",1)";
						trainnings_filter.push(trainning_1);												
					}					
					
				}
			}
			res.status(200).json({"trainnings":trainnings_filter});					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Obtener un trainnings por date 
router.get("/getByDate/:id", function(req,res)
{
	TrainningModel.GetByDate(req.params.id).then(function(trainnings) {
		if(trainnings)
		{
			res.status(200).json(trainnings);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
//Get players for date of trainning and session
router.get("/get/Players/:date/:jornada", function(req,res)
{ 
	console.log("/get/Players/:date/:jornada",req.params.date,req.params.jornada);
	var id_team=req.user.company.id_team;
	TrainningModel.GetByDate(req.params.date).then(function(trainnings_all) {
		if(trainnings_all)
		{	
			trainnings=[];
			for(var k=0;k<trainnings_all.length;k++){
				if(trainnings_all[k].session==req.params.jornada){
					trainnings.push(trainnings_all[k]);
				}
			}
			var players=[];
			for(var i=0;i<trainnings.length;i++){
				players.push(trainnings[i].id_player);
			}
			var players_filter=[];
			var index=0;
			var count=0;
			for(var j=0;j<trainnings.length;j++){
				index=0;
				count=0;
				while(index<players_filter.length){
					if(trainnings[j].id_player==players_filter[index].id_player){
						count++;
					}
					index++;
				}
				if(count==0||j==0){
					var data_nmea=[];
					for(var m=0;m<trainnings.length;m++){
						if(trainnings[m].id_player==trainnings[j].id_player){
							data_nmea.push({"title":trainnings[m].title,"set":trainnings[m].nmea});
						}
					}
					console.log("push:"+trainnings[j].id_player+" team: "+id_team);
					players_filter.push({"id_player":trainnings[j].id_player,"nmea_set":data_nmea,"results":trainnings[j].results});
				}
			}
			var resultado={"date":new Date(req.params.date),"players":players_filter};
			res.status(200).json(resultado);					
		}
		else
		{
			res.status(500).json({"msg":"Error Getting"});
		}
	})
	.fail(function(err) {
				console.log(err.body);
	});
	
});
module.exports = router;