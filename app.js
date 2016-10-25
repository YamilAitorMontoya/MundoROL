console.log("Iniciando Servidor...")
var myDir = "C:\\Todo\\Programacion\\WEB - Jquery\\Test 1\\"
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var $ = require("jquery");
var Schema = mongoose.Schema;
var app = express();
var Once = true;var Protected = 0;
console.log("Conectando a la Base de datos...");
mongoose.connect("mongodb://localhost/PJS");
console.log("Declarando esquemas...");
//Pj Schema
var PJjson = {
	//Iniciativa
	IniAGI :Number,
	IniPenAct:Number,
    IniMagia :Number,
    IniEfectos:Number,
    IniOtros :Number,
    //Tab BO
    BOHabilidad:Number,
    BOaBD2 :Number,
    BOPenAct:Number,
    BOMagia:Number,
	BOEfectos:Number,
	BOOtros:Number,
	//Tab BD
	BDAGI :Number,
	BDBOaBD:Number,
	BDAdrenal:Number,
	BDEscu :Number,
	BDPenAct:Number,
	BDMagia :Number,
	BDEfectos:Number,
	BDOtros :Number,
	// ? TAPenAct :Number,
	//Tab Otros:Number,
	OTMaxPP :Number,
	OTPPRest:Number,
	OTMaxSTA:Number,
	OTSTAR :Number,
	OTMaxAlim:Number,
	OTAlimRest:Number,
	OTMaxSueño:Number,
	OTSueñoRest :Number,
	OTMaxHidra :Number,
	OTHidraRest :Number,
	OTMaxHP :Number,
	OTHPRest:Number,
	//Datos:Number,
	//Resolviendo Nombre
	Nombre 	:String,
	Profesion :String,
	DDExp :Number,
	DDNivel :Number,
	DDTeam :String,
	DDNombreJug:String,
	DDSimIni: String,
	//TA
	TACasco :Number,
	TAPeto :Number,
	TABrazales :Number,
	TABotas :Number,
	TAGuantes :Number,
	TAGrebas :Number,
	TAEscudo :Number,
	TAMagia :Number,
	TAEfectos :Number,
	TAOtros :Number,
	//Notas
	NONotes: String,
	//Efectos Leght fija =  16.		
	FX : Array
}
var PJSSchema = new Schema(PJjson);
var PJS = mongoose.model("PJS2",PJSSchema);

var FXJson={
	Nombre:String,
	Image:String,
	X:Number,
	Y:Number,
	width:Number,
	height:Number,
	tipo:Number
		//0: Temporal
		//1: Atemporal
}
var FXSchema = new Schema(FXJson);
var FXS = mongoose.model("FXS2",FXSchema);
var UDMJson={
	Nombre:String,
	Coef: Number, //Relacion para llegar a As
	tipo: Number
}
var UDMSchema = new Schema(UDMJson);
var UDMS = mongoose.model("UDMS2",UDMSchema);
console.log("Linkeando Stack de Tecnologias");
app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("./"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 //app.set("view options", {layout: false});
app.listen(8080);
console.log("Esperando conecciones.")
//Get solo para intercambiar archivos
app.get('/',function (req,res) {
	if (Once) {
		Once = false;
		//PJS.find(function(err,doc){
			//console.log("Personaje: " + doc.Nombre + "\n");
			//console.log("Cantidad de Personajes: " + doc.Leght);
		//})
	}
	console.log("Get Recived");
	res.sendFile(myDir+"Combat.html");
});
app.get('/Testing',function (req,res) {
	if (Once) {
		Once = false;
		//PJS.find(function(err,doc){
			//console.log("Personaje: " + doc.Nombre + "\n");
			//console.log("Cantidad de Personajes: " + doc.Leght);
		//})
	}
	console.log("Testing Get Recived");
	res.sendFile(myDir+"TestData.html");
});
app.get('/IconsTool',function (req,res) {
	if (Once) {
		Once = false;
		//PJS.find(function(err,doc){
			//console.log("Personaje: " + doc.Nombre + "\n");
			//console.log("Cantidad de Personajes: " + doc.Leght);
		//})
	}
	console.log("Icons Get Recived");
	res.sendFile(myDir+"IconsTool.html");
});
app.post('/PostBuffer', function (req, res) {
    var rb = req.body.CMD;
    //console.log("CMD"+rb);
    res.send("PostBuffer Recived");
});
// Guardar lo que venga en el Json
app.post('/GuardarPJ', function (req, res) {
    var n = req.body.Nombre;
    //console.log("Save Json Recived: \n" + JSON.stringify(req.body));
    PJS.findOne({Nombre:n},"Nombre", function(err,doc){
    	if (err) {
    		res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
    	}
    	//Me fijo si ya existe ese PJ
    	if (doc) {
    		res.status(200).send(JSON.stringify({"success" : "Ya Existe un Personaje con el nombre: "+ n }));		
    	}//SI no existe lo guardo
    	else{
    		var pj = new PJS(req.body);
			pj.save(function(err){
				if (err) {
					res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
					return;
				}
				else{
		    		res.status(200).send(JSON.stringify({"success" : "Success! Se ha Guardado "+ n }));
				}
    		});
    	}
	});
});
// Viene un Json con el Nombre para buscarlo, devuelvo el doc entero
app.post('/LoadPJ', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Load Json Recived: \n" + JSON.stringify(req.body));
    PJS.findOne({Nombre:req.body.Nombre}, function(err,doc){
    	if (err) {
			res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (doc) {
			doc.success = "Load Success";
			console.log(JSON.stringify(doc));
			/*FXS.find({Owner:req.body.Nombre}, function(err,doc){
				if (err) {throw err}
				else{
					console.log(JSON.stringify())
				}
			});*/
	    	res.status(200).send(doc);
		}
		else{
			res.status(404).send({"error":"No existe"});
		}
    })
});
app.post('/LoadPJi', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Load Json Recived: \n" + JSON.stringify(req.body));
    PJS.findOne({_id:req.body._id}, function(err,doc){
    	if (err) {
			res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (doc) {
			doc.success = "Load Success";
			console.log(JSON.stringify(doc));
	    	res.status(200).send(doc);
		}
		else{
			res.status(404).send({"error":"No existe"});
		}
    })
});
//Lista de Nombres
app.post('/PjNames', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    PJS.find({},'Nombre', function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Load Success";
			console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay personajes cargados"});
		}
    })
});
//Lista de Teams
app.post('/TeamNames', function (req, res) {
    //var rb = req.body.OTHPR;
    console.log("Json Recived: \n" + JSON.stringify(req.body));
    PJS.find({},'DDTeam', function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay Teams cargados"});
		}
    })
});
//Pj from Team
app.post('/LoadTeam', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    PJS.find({DDTeam:req.body.DDTeam},'Nombre _id', function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Team Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay personajes cargados"});
		}
    })
});
app.post('/LoadTeam2', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    PJS.find({DDTeam:req.body.DDTeam},function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Team Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay personajes cargados"});
		}
    })
});
// Viene un Json con el Nombre y un Key:Value para actualizar, Devuelve estatus 
app.post('/UpdatePJ', function (req, res) {												//Esto debe recibir el PJ Entero y punto. los cambios paraciales en la memoria del cliente.
	//console.log("Update Json Recived: \n" + JSON.stringify(req.body));
    if (req.body._id) {
	    PJS.findOne({_id:req.body._id}, function(err,doc){
	    	if (err) {
				res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
				console.log("Error al Buscar el Doc  desde UpdatePJ");
				return;
			}
			if (!doc) {
				res.status(404).send(JSON.stringify({error:"Not Found"}));
			}
			if (req.body.IsFX > 0) {
				doc.FX = req.body.FXArray;
				doc.save();				
				console.log("Efecto actualizado");
				//console.log("Fx: "+ JSON.stringify(doc.FX));
			}else{
				doc[req.body.Propiedad] = req.body.Valor;
				doc.save();
				console.log("Propiedad actualizada");
			}
	    });
		res.send(JSON.stringify({"success":"ok"}));
    }
    else{	
    	res.status(404).send({error:"Not Found"});
    }
});
app.post('/UpdateFullPJ', function (req, res) {												//Esto debe recibir el PJ Entero y punto. los cambios paraciales en la memoria del cliente.
	//console.log("Update Json Recived: \n" + JSON.stringify(req.body));
    PJS.findOne({_id:req.body._id}, function(err,doc){
    	if (err) {
			res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (!doc) {
			res.status(404).send(JSON.stringify({error:"Not Found"}));
			return;
		}
		if (doc) {
			//doc= req.body;
			for(var p in req.body){
				console.log(p);
				if (p != "_id") {
					doc[p] = req.body[p];
					console.log(doc[p]);
				};
			};
			doc.save();				
			console.log("Personaje Actualizado");
			//console.log("Fx: "+ JSON.stringify(doc.FX));
	    }
		res.send(JSON.stringify({"success":"ok"}));
	});
});
// Viene Json con el NOmbre para poder borrarlo
app.post('/BorrarPJ', function (req, res) {
	//console.log("Json Recived: \n" + JSON.stringify(req.body));
	if (Protected<3) {
	    if (req.body.Nombre != "Nuevo") {
	    	if (req.body.Code === "LPDM") {
	    		//console.log("apunto de borrar " + req.body.Nombre );
			    PJS.findOne({Nombre:req.body.Nombre}, function(err,doc){
					if (err) {
			    		//console.log("Error en la funcion Remove");
						res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
						return;
					}
					if (doc) {
						doc.remove(function(err){
							if(err)throw err;
							//console.log("Doc Removed");
							res.status(200).send({success:"Removed",Nombre:req.body.Nombre});
						});
					}		    		
			    });
			   //console.log("Aparentemente borrado");
				//res.send(JSON.stringify({"success":"ok"}));
	    	}
	    	else{
	    		Protected = Protected + 1;
	    		res.status(404).send(JSON.stringify({"error":"Not Found 1"}));
	    	}
	    }
	    else{
	    	res.status(404).send(JSON.stringify({"error":"Not Found 2 "}));	
	    }	
	}
	else{
		res.status(404).send(JSON.stringify({"error":"Not Found 3"}));	
	}
});
//Prototipos FX
app.post('/UpdateFX', function (req, res) {
	//console.log("FX Update Json Recived: \n" + JSON.stringify(req.body));
    if (req.body.Nombre != "" && req.body.Nombre) {
	    FXS.findOne({Nombre:req.body.Nombre}, function(err,doc){
	    	if (err) {
				res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
				return;
			}
			if (!doc) {
				//res.status(404).send(JSON.stringify({error:"Not Found"}));
				var fx = new FXS(req.body);
				fx.save(function(err){
				if (err) {
					res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
					return;
				}
				else{
		    		res.status(200).send(JSON.stringify({"success" : "Success! Se ha Guardado un nuevo FX"}));
				}
    			});
			}
			else{
				doc.X = req.body.X;
				doc.Y = req.body.Y;
				doc.Image = req.body.Image;
				doc.width = req.body.width;
				doc.height = req.body.height;
				doc.tipo =req.body.tipo;
				doc.save(function(err){
					if (err) {
						res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
						return;
					}
					else{
			    		res.status(200).send(JSON.stringify({"success" : "Success! Se ha Actualizado un FX"}));
					}
    			});
				console.log("Propiedad actualizada");
			}
		});
    }
    else{	
    	res.status(404).send({error:"Empty Name"});
    }
});
//Lista de ProtosFX
app.post('/FXProtos', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    FXS.find({}, function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay prototipos de FX cargados"});
		}
    })
});
app.post('/FXProtosDel', function (req, res) {
	//console.log("apunto de borrar " + req.body.Nombre );
    FXS.findOne({Nombre:req.body.Nombre}, function(err,doc){
		if (err) {
    		//console.log("Error en la funcion Remove");
			res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (doc) {
			doc.remove(function(err){
				if(err)throw err;
				console.log("Doc Removed");
				res.status(200).send({success:"Removed",Nombre:req.body.Nombre});
			});
		}		    		
    });
});
//----Prototipos de UDM
app.post('/UpdateUDMP', function (req, res) {
	//console.log("UDM Prototipe Update Recived: \n" + JSON.stringify(req.body));
    if (req.body.Nombre != "" && req.body.Nombre) {
	    UDMS.findOne({Nombre:req.body.Nombre}, function(err,doc){
	    	if (err) {
				res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
				return;
			}
			if (!doc) {
				//res.status(404).send(JSON.stringify({error:"Not Found"}));
				var UDM = new UDMS(req.body);
				UDM.save(function(err){
				if (err) {
					res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
					return;
				}
				else{
		    		res.status(200).send(JSON.stringify({"success" : "Success! Se ha Guardado un nuevo UDMP"}));
				}
    			});
			}
			else{
				doc.Coef = req.body.Coef;
				doc.tipo = req.body.tipo;
				doc.save(function(err){
					if (err) {
						res.status(500).send(JSON.stringify({"error" : "Data Base Error"}));
						return;
					}
					else{
			    		res.status(200).send(JSON.stringify({"success" : "Success! Se ha Actualizado un UDMP"}));
					}
    			});
				console.log("Propiedad actualizada");
			}
		});
    }
    else{	
    	res.status(404).send({error:"Empty Name"});
    }
});
//Lista de ProtosFX
app.post('/UDMProtos', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    UDMS.find({}, function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay prototipos de UDM cargados"});
		}
    })
});
app.post('/LoadBothTeams', function (req, res) {
    //var rb = req.body.OTHPR;
    //console.log("Json Recived: \n" + JSON.stringify(req.body));
    PJS.find({DDTeam:{ $in:[req.body.Team1,req.body.Team2]}} ,'Nombre', function(err,docs){
    	if (err) {
			res.status(404).send(JSON.stringify({"error" : "Data Base Error"}));
			return;
		}
		if (docs) {
			docs.success = "Team Load Success";
			//console.log(JSON.stringify(docs));
	    	res.status(200).send(docs);
		}
		else{
			res.status(404).send({"error":"No hay personajes en los Equipos Seleccionados"});
		}
    })
});
