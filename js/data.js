//Mapa de Datos: Mt For Methods
//Clase Contetex for DB

function Contexto() {
	this._id = undefined;
	this.Nombre = "Nueva Partida";
	this.TeamL = undefined;//El nombre va a DB
	this.TeamR = undefined;//El nombre va a DB
	this.PJList = new Array();// Los _id, Nombre,Total Ini, Ini Sim, TurnValue  y RenderSide. Se llena desde los Teams
	this.PJOrder= new Array();//Lista de Personajes restantes de la randa que no cedieron ni jugaron
	this.PJOutging= new Array();//En este van a ir entrando los PJ que van cediendo
	this.DivConteinerId = undefined;//Elemento del DOM que contendra todo el renderizado de PJOrder. Voy a probar con CTBODY para no escribir mil veces la misma cabecera.
	this.DivConteinerId2 = undefined;//Elemento del DOM que contendra todo el renderizado de PJOutgoing parte. Voy a probar con CTBODY para no escribir mil veces la misma cabecera.
	this.DivControlPanelId = undefined;//Elemento del DOM que contendra el panel de la fecha y Hora
	this.DialogDiv = undefined;//Aca se guarda el Id del nodo en dom que lo renderizara.
	this.Dialog = undefined; //Aca se guarda el objeto Jquery 
	this.PjparaDialog = undefined;
	this.AuxIniVar = 0;
	this.PJPlaying = undefined; //Almacena el personaje que debe jugar este turno.
	this.State = 0; // 0 = Recien cronstruido
					// 1 = Dialogos Creado
					// 2 = Panel Control Creado
					// 3 = Ready
					// 4 = Desarrollando Ronda
					// 0 = Recien cronstruido
					// 0 = Recien cronstruido

	//Metodos de Renderizado
	this.MtCreateDialog = function(DialogDivId){
		if (!this.DialogDiv && !this.Dialog){
			if (!DialogDivId) {
				return false;
			}else{
				this.DialogDiv = DialogDivId;
			}
		}else{
			return true;
		}; 
		$("#"+this.DialogDiv).html("").append('<label id="msj">Ingresar el valor de iniciativa para el personaje: </label></br><label id="PjName">...</label></br><input id="TiradaIniciativa" name="TiradaIniciativa" placeholder="0" >');
		$("#TiradaIniciativa").spinner();
		this.Dialog = $("#"+this.DialogDiv).dialog({
		      autoOpen: false,
		      height: 300,
		      width: 400,
		      modal: true,
		      title: "Iniciativa",
		      buttons: {
		        "Guardar Valor":SaveIniAnswer,
		        Simular: function(){
		        	$("#TiradaIniciativa").val(randomIntFromInterval(0,100));
		        },
		        Cancelar : function() {
		          ctx.Dialog.dialog( "close" );
		        }
		      }
	    });
	    $("#"+this.DialogDiv).keypress(function(e) {
		    if(e.which == 13) {
		        SaveIniAnswer();
		    }
		});
		this.State +=1;
	};
	function SaveIniAnswer(){
		//alert($("#TiradaIniciativa").val());
		ctx.PjparaDialog.IniTotal = Number(ctx.PjparaDialog.Ini) + Number($("#TiradaIniciativa").val());
		//console.log(ctx.PjparaDialog.Nombre + "   -  "+ ctx.PjparaDialog.IniTotal);
		ctx.PJOrder.push(ctx.PjparaDialog);
		ctx.Dialog.dialog( "close" );
		ctx.MtNextIniAsk();
	}
	this.MtCreateControlPanel = function (ControlPanelDivId){
		ctx.DivControlPanelId = ControlPanelDivId;
		var s = "";
		s+='<table>';
		s+='<thead id="CTimeTHead"><td >Hora: </td><td> Minutos:</td><td> Asaltos:</td></thead><tr><td>';//Headers
		s+='<input id="CInHora" name="CInHora" class="In48"></td><td><input id="CInMin" name="CInMin" class="In48"></td><td><input id="CInAs" name="CInAs" class="In48"></td></tr>';//Fila de Spiners
		s+='<tr><td id="tdFecha">Fecha</td><td colspan="2"><span class="ui-spinner ui-widget ui-widget-content ui-corner-all"><input type="text" id="CInDate" class="OtherPrettyInputs"></input></span></td></tr>';//Fila Datepick
		s+='<tr>';//inicio fila 1
		s+='<td><button type="button" id="FinRondaBtn" class="FTbtn"> Finalizar    Ronda</button></td>';//boton 1-2
		s+='<td><button type="button" id="FinCombateBtn" class="FTbtn"> Finaliza    Combate </button></td>';//boton 1-3
		s+='<td><button type="button" id="GroupActionsBtn" class="FTbtn"> Acciones Grupales </button></td>';//boton 2-3
		s+='</tr>';//fin fila 1
		s+='<tr>';//comienzo fila 2
		s+='<td><button type="button" id="NewRound" class="FTbtn">Nueva    Ronda</button></td>';//boton 2-1
		s+='<td><button type="button" id="NextPj" class="FTbtn">Siguiente Personaje</button></td>';//bonton 2-2
		s+='<td><button type="button" id="CederBtn" class="FTbtn">Ceder Iniciativa</button></td>'; //Boton 1-1
		s+='</tr>';//fin de fila 2
		s+='<tr><td colspan="3" id="tdTurno"> Turno del Personaje :  </td></tr>';//titulo 2
		s+='<tr><td id="tdLArrow"></td><td id="tdPjName"></td><td id="tdRArrow"></td></tr>';//fila Turno de...
		s+='</table>';//fin
		$("#"+ctx.DivControlPanelId).html(s);
		$("#CInDate").datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
		$(".In48").spinner({stop:Sp48Stop});
		$("#CInAs").val(0);//Aca se debiarian cargar los valores correspondientes.
		$("#CInMin").val(57);
		$("#CInHora").val(23);
		$("#NewRound").button().click(ctx.MtNewRound);
		$("#CederBtn").button().click(ctx.MtCeder);
		$("#NextPj").button().click(ctx.MtNextPlayer);
		$("#FinRondaBtn").button().click(ctx.MtFinRonda);
		$("#GroupActionsBtn").button().click(ctx.MtGroupActions);
		$("#FinCombateBtn").button().click(ctx.MtFinCombate);
		$("#tdPjName").text("Ir actualizando");
		this.State +=1;
	}
	this.MtShowArrow = function(sideS){
		if (sideS == "L") {
			$("#tdLArrow").html("<img id='LArrow' class='img-hor'>");
			$("#LArrow").css('background',"url('images/FE2.jpg') no-repeat");
			$("#tdRArrow").html("");
		}
		if (sideS == "R") {
			$("#tdRArrow").html("<img id='RArrow' class='img'>");
			$("#RArrow").css('background',"url('images/FE2.jpg') no-repeat");
			$("#tdLArrow").html("");
		}
		if (sideS == "C") {
			$("#tdLArrow").html("");
			$("#tdRArrow").html("");	
		}
	};
	//$("#"+sideS+"DiForIcons")
	this.MtGroupActions = function(){
		//Abrir un dialog para mostrar las opciones.
		alert("esta funcion aun no esta disponible")
	};
	//Metodos para Turnos
	this.MtNewRound = function(){// renderizar los controles para ingresar las tiradas de Iniciativa. Y si los voy pidiendo de a uno? tipo un cartelito con un par de botones.SI, pero no muchos dialog uno solo que vaya cambiando los valores de los controles.
		if (State == 2 || State == 3) {
			ctx.PJList = new Array();
			ctx.PJOrder = new Array();
			ctx.PJOutging = new Array();
			ctx.MtLoadTeams();
			ctx.MtNextIniAsk();
			this.State = 3;
		}
	};
	this.MtLoadTeams = function(){
		//Meter los PJS de los 2 teams en el array y ir agregandole el campo IniTotal(Ini)
		//this.PJList = this.TeamL.PJS.concat(this.TeamR.PJS);
		console.log("Load team Called estemmm State: " + ctx.State);
		//if (ctx.State == 2) { 
			console.log( ctx.State);
			ctx.PJList = new Array();
			$.each(ctx.TeamL.PJS,function(i,item){
				ctx.PJList.push(new miniPJ(ctx.TeamL.PJS[i]));
			});
			$.each(ctx.TeamR.PJS,function(i,item){
				ctx.PJList.push(new miniPJ(ctx.TeamR.PJS[i]));
			});
			//ctx.State = 1;
		//};//deberia avisar que se va a perdar la info.
	};
	this.MtNextIniAsk = function(){
		ctx.PjparaDialog = ctx.PJList.pop();
		if (ctx.PjparaDialog != undefined) {
			if (ctx.PjparaDialog.SimIni == "SI") {
				$("#TiradaIniciativa").val(randomIntFromInterval(0,100));
				SaveIniAnswer();
			}else{
				$("#PjName").text(ctx.PjparaDialog.Nombre);
				$("#TiradaIniciativa").val("");
				ctx.Dialog.dialog('open');
			}
		}else{
			if (ctx.PJList.length == 0) {
				ctx.MtCalcOrden();
			}
		}
	};
	this.MtCalcOrden = function(){
		//Podria ir reordenando PJList segun el campo Initotal que se lo agrego solo para aca adentro
		ctx.PJOrder = ctx.PJOrder.sort(function(a,b){
			return ((a.IniTotal > b.IniTotal) ? -1 : ((a.IniTotal < b.IniTotal) ? 1 : 0))
		});
		ctx.PJOutging = ctx.PJOutging.sort(function(a,b){
			return ((a.IniTotal > b.IniTotal) ? 1 : ((a.IniTotal < b.IniTotal) ? -1 : 0))
		});
		ctx.MtRenderPlayerList();
		ctx.MtSelectPlayer();
	};
	this.MtRenderPlayerList = function(){
		$("#"+ctx.DivConteinerId).html("");
		$.each(ctx.PJOrder,function(i,item){
			$("#"+ctx.DivConteinerId).append('<tr id="F'+i+'"><td id="P'+i+'">'+item.Nombre+'</td><!--<td id="E'+i+'">'+item.WaitingTurn+'</td>--><td id="T'+i+'">'+item.IniTotal+'</td><td id="N'+i+'">'+i+'</td></tr>');			
		});
		$("#"+ctx.DivConteinerId2).html("");
		$.each(ctx.PJOutging,function(i,item){
			$("#"+ctx.DivConteinerId2).append('<tr id="F'+i+'"><td id="P'+i+'">'+item.Nombre+'</td><!--<td id="E'+i+'">'+item.WaitingTurn+'</td>--><td id="T'+i+'">'+item.IniTotal+'</td><td id="N'+i+'">'+i+'</td></tr>');			
		});
		//$("#F0").toggle("highlight");
	};
	this.MtSelectPlayer = function(){
		if (this.State == 2 ) {
			var mpj = ctx.PJOrder[0];
			if (mpj == undefined) {
				mpj = ctx.PJOutging[0];
			};
			if (mpj == undefined) {
				this.MtShowArrow("C");//Borrar las flechas
				$("#tdPjName").html("");
				$("#CInAs").spinner("stepUp");
				this.State = 3;
				return false;
			};
			$("#tdPjName").html(mpj.Nombre);
			if (mpj.RenderSide == "L") {
				this.MtShowArrow("L");
				this.PJPlaying = ctx.TeamL.MtSelectedPJ(mpj._id);
				return true;
			}
			if (mpj.RenderSide == "R") {
				this.MtShowArrow("R");
				this.PJPlaying = ctx.TeamR.MtSelectedPJ(mpj._id);
				return true;
			};
			
		}else{return false;};
	};
	this.MtNextPlayer = function(){
		var mpj = ctx.PJOrder.shift();
		if (mpj == undefined) {
			mpj = ctx.PJOutging.shift();
		};
		if (mpj == undefined) {
			console.log("Ya termino la ronda amigo.");
			return false;
		};
		ctx.PJPlaying.MtTurnEnded();
		/*
		if (mpj.RenderSide == "L") {
			//ctx.TeamL.MtSelectedPJ(mpj._id,1).MtTurnEnded();

		}
		if (mpj.RenderSide == "R") {
			ctx.TeamR.MtSelectedPJ(mpj._id,1).MtTurnEnded();
		}*/
		ctx.MtRenderPlayerList();
		ctx.MtSelectPlayer();//aca podria usar un ifnot para terminar el combate o pasar a la lista de espera.
	};
	this.MtCeder = function(){
			ctx.PJOutging.push(ctx.PJOrder.splice(0,1)[0]);
			ctx.MtCalcOrden();
			ctx.MtRenderPlayerList();
			ctx.MtSelectPlayer();
	};
	this.MtFinRonda = function(){
		while(ctx.MtSelectPlayer()){
			ctx.MtNextPlayer();
		}
	}
	this.MtFinCombate = function(){
		ctx.MtFinRonda();
		$.each(ctx.TeamL.PJS,function(i,item){
			item.MtRestoreSTAPorcentual(0.3);
		});
		$.each(ctx.TeamR.PJS,function(i,item){
			item.MtRestoreSTAPorcentual(0.3);
		});
	};
	//Metodos hacia DB
	this.MtSaveContext = function(){

	};
	this.MtLoadContext = function(){
		
	};
	//Metodos que se direccionana los equipos.
	this.MtPJPushBridge = function(pj){
		if (this.TeamL.State == 1) {
			this.TeamL.MtPJPush(pj);
			return true;
		}else{
			if (this.TeamR.State == 1) {
				this.TeamR.MtPJPush(pj);
				return true;
			}
		}
		return false;
	};
	this.MtRerenderBridge = function(){
		console.log("Rerender Called L: "+this.TeamL.State+" / R: "+ this.TeamR.State );
		if (this.TeamL.State == 1) {
			this.TeamL.MtNewPJSlm();
			return true;
		}else{
			if (this.TeamR.State == 1) {
				this.TeamR.MtNewPJSlm();
				return true;
			}
		}
		return false;
	}
	this.MtFillTeamSlmBridge = function(){
		console.log("Rerender Called L: "+this.TeamL.State+" / R: "+ this.TeamR.State );
		if (this.TeamL.State == 4) {
			this.TeamL.MtFillTeamSlm(this.TeamL);
			return true;
		}else{
			if (this.TeamR.State == 4) {
				this.TeamR.MtFillTeamSlm(this.TeamR);
				return true;
			}
		}
		return false;
	}
	return this;
}
//Clase de Team
function Team (PJSlmId,TeamSlmId,RenderSide){
	//Propiedades
	this.Nombre = undefined;
	this._id = undefined;
	this.PJS = new Array();
	this.RenderSide=RenderSide;
	this.TeamSlmId = TeamSlmId;
	this.PJSlmId=PJSlmId;
	this.PJSlmParentId=undefined;
	this.SelectedPJId=undefined;
	this.TeamNames = new Array();
	//Metodos
	this.MtNewPJSlm=function(){
		console.log("MtNewPJSlm Called from "+ this.Nombre);
		console.log("RenderSide: "+ this.RenderSide);
		console.log("PJSlm: "+ this.PJSlmId);
		console.log("TeamSlm: "+ this.TeamSlmId);
		if (!this.PJSlmParentId) {
			this.PJSlmParentId = $('#'+this.PJSlmId).closest('div').attr('id');
		}
		console.log("parent= " + this.PJSlmParentId );
		$('#'+this.PJSlmId).remove();
        $("#"+this.PJSlmParentId).append('<select id="'+this.PJSlmId+'"><option value="Nuevo" selected>Nuevo</option></select>');
        for (var i = this.PJS.length - 1; i >= 0; i--) {
            var n = this.PJS[i].DBData.Nombre;
            var j = this.PJS[i].DBData._id;
            $("#"+this.PJSlmId).append("<option value='"+j+"'>"+n+"</option>");
        }
		$("#"+this.PJSlmId).selectmenu({ //Constructor configurado para llenar con datos
			change: SlmPJChange
		});
		this.State = 0;
    };
    this.MtSelectedPJ = function(Id,NotUpdate){
    	console.log("SelectedPJ Called from "+this.Nombre+" Id = "+Id+" NotUpdate = "+ NotUpdate);
    	this.SelectedPJId = Id?Id:$("#"+this.PJSlmId).val();
    	//console.log(this.SelectedPJId);
		
    	for (var i = this.PJS.length - 1; i >= 0; i--) {
    		if (this.PJS[i].DBData._id == this.SelectedPJId) {
    			if (!NotUpdate) {
	    			$("#"+this.PJSlmId).val(this.SelectedPJId);
	    			$("#"+this.PJSlmId).selectmenu( "refresh" );
	    			this.PJS[i].MtRenderData().MtFormatFXVals();
    			};
    			return this.PJS[i];//devuelve un PJ
    		}
    	}
    	return false;
	};
	this.MtPJPush = function(pj){
		pj.RenderSide = this.RenderSide;
		this.PJS.push(pj);
		//return this;
	};
	this.MtSavePJSState = function(){
		//ejecutar el metodo del mismo PJ
		$.each(this.PJS,function(i, item){
			this.PJS[i].MtSavePJ();
		});
	};
	this.MtGetTeam = function(TeamName) {
		console.log('GetTeam Called with TeamName= '+ TeamName);
		this.Nombre = TeamName;
		//this.PJSlmId = PJSlmId; ponelo en el constructor
		this.State = 1; //Esperando Data para cachear Personajes
		//this.RenderSide = RenderSide; al constructor
		WA.Up();
		$.ajax({
		    type: 'POST',
		    url: "LoadTeam2",
		    data: {"DDTeam":TeamName},
		    dataType: 'json',
		    success: function(data) {
		        console.log('Success callback trigued from GetTeam');
		        $.each(data, function(i, item){
		            console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
		            var pj = new PJ();
		            pj.DBData = data[i];
		            ctx.MtPJPushBridge(pj);
	      		});
	      		//this.State = 2; // Completo el cacheo de personajes
	      		WA.Down();
		    },
		    error: function(data){
		    	console.log("Error: " + data.error);
		    	WA.Down();
		    }
	    });
	    WA.Exec('console.log("Justo antes de llamar a rerender L: "+ctx.TeamL.State+" / R: "+ ctx.TeamR.State );');
	    WA.Exec("ctx.MtRerenderBridge();");
		return this;
	};
	this.MtTeamSelect = function(TeamName) {
		console.log("Team Select Called:  RS= "+RenderSide+" TeamName= "+TeamName);
		if (TeamName != "Todos"&&TeamName != "") {
			this.PJS = new Array();
			this.MtGetTeam(TeamName);
			return true;
		};
		return false;
	};
	this.MtGetTeamNames = function (){
		var TN = new Array();
		this.State = 4; //Esperando nombres de equipos
		WA.Up();
		$.ajax({ 
		    type: 'POST',
		    url: "TeamNames",
		    data: {},
		    dataType: 'json',
		    success: function(data) {
			          	console.log('Name request success');
			          	$.each(data, function(i, item){
				        	//console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
				            var n = data[i].DDTeam;
				            if ($.inArray(n,TN) ==-1) {
					            TN.push(n);
				            }
		            	});
		            	WA.Down();
		            	ctx.MtFillTeamSlmBridge();
		        	},
		    error: function(data){
		     			console.log(JSON.stringify(data));
		     			WA.Down();
		     		}
	  	});
		return TN;
	};
	this.MtFillTeamSlm = function(obj){
		$.each(obj.TeamNames, function(i, item){
			$("#"+obj.TeamSlmId).append("<option value='"+obj.TeamNames[i]+"' >"+obj.TeamNames[i]+"</option>");
		});
		obj.State = 0;
	}; //es medio chancho pero anda. Se debe poder mejorar.
		//Constryendo
	$("#"+TeamSlmId).selectmenu({change:SlmTeamChange});
	this.TeamNames = this.MtGetTeamNames();
	return this;
}
function SlmTeamChange(event,ui){
	console.log("SlmTeamChange Called Event id = " + event.target.id);
	var id = event.target.id;	
	var sideS =id.substring(0,1);
	if (sideS == "L") {
		ctx.TeamL.MtTeamSelect($("#"+id).val());
	}else{
		ctx.TeamR.MtTeamSelect($("#"+id).val());
	}	
}
//Clases de Personaje
function PJ()  {
	//Lugar donde se asignara el Json que manda la DB
		this.DBData = {};
	//Class Propieties
		this.State = undefined;
		//this.Source:Array,
		this.DOMConteinerId = undefined;
		this.PJSlmId= undefined;
		this.RenderSide= undefined;
	//Metodos
		this.MtGetIni = function(){
			if (this.DBData) {
				return Number(this.DBData.IniAGI)+Number(this.DBData.IniOtros)+Number(this.DBData.IniEfectos)+Number(this.DBData.IniMagia)+Number(this.DBData.IniPenAct);
			}else{
				return 0;
			}
		};
		this.MtRestoreSTAPorcentual = function (porcent, Render) {
			if(!porcent || porcent > 1 || porcent < 0){return false;}
			var t = this.DBData.OTMaxSTA * porcent + this.DBData.OTSTAR;
			this.DBData.OTSTAR = t<this.DBData.OTMaxSTA?t:this.DBData.OTMaxSTA;
			if (Render) {
				this.MtRenderData();
			}
			return this;
		};
		//Faltarian estos
		//this.GetTA(){};
		//this.GetBO(){};
		//this.GetBD(){};
		this.MtRenderData=function(data,sideS){
			console.log("Render Data Called from "+this.DBData.Nombre+" Data = "+data+" sideS = "+ sideS);
			/*
			if (!sideS) {
				if (!data) {PJJsonToControls(this.DBData,this.RenderSide);
				}else{PJJsonToControls(data,this.RenderSide);}
				this.MtReRenderHPR();
    			this.MtRecalcAll();
    			this.MtDrawFX();
			}
			else{
				if (!data) {PJJsonToControls(this.DBData,sideS);
				}else{PJJsonToControls(data,sideS);}
				this.MtReRenderHPR(sideS);
    			this.MtRecalcAll(sideS);
    			this.MtDrawFX(sideS);
				this.MtReRenderHPR(sideS);
			}*/
			PJJsonToControls(data?data:this.DBData,sideS?sideS:this.RenderSide);
			this.MtReRenderHPR();
    		this.MtRecalcAll();
    		this.MtDrawFX();
			return this;
		};
		this.MtUpdateFX=function(){
			this.DBData.FX = FxCtrolToArray(this.RenderSide);
			return this;
		};
		this.MtFormatFXVals = function(sideS){
			var s = sideS?sideS:this.RenderSide;
			for (var i = 0; i < 16; i++) {
				formatFXValSp(s,i,$("#"+s+"smEUDM"+i).val());
			}
			return this;
		};
		this.MtRefresh= undefined;//Este tambien es innecesario de momento pero podria ser util
		this.MtLoadPJ= undefined;//Este de momento es innecesario, pero se podria Pensar para mas adelante
		this.MtDelete= function(){
			WA.Up();
			$.ajax({
                type: 'POST',
                url: "BorrarPJ",
                data: {
                	_id: this.DBData._id
                  //Nombre:$('#LsmPJ').val(),
                  //Code:$('#LInCode').val()
                },
                dataType: 'json',
                success: function(data) {
                      console.log(data.success);
                      WA.Down();
                      //location.reaload();
                  },
                error: function(data){
                      console.log(JSON.stringify(data));
                      WA.Down();
                }
              });
		};
		this.MtSavePJ= function(){
			console.log("Save PJ Called on PJ: " + this.DBData.Nombre);
			WA.Up();
			$.ajax({
	      		type: 'POST',
	      		url: "GuardarPJ",
	      		data: this.DBData,
	      		dataType: 'json',
	      		success: function(data) {
	            	//console.log('Save success. data: ' + JSON.stringify(data));
	            	alert(data.success);	
	            	WA.Down();
	            	//document.location.refresh();
	            	//console.log(JSON.stringify(data));
        		},
        		error: function(data){
        			WA.Down();
        		}
    		});
		};
		this.MtUpdatePJ= function(){
			WA.Up();
			$.ajax({
	      		type: 'POST',
	      		url: "UpdateFullPJ",
	      		data: this.DBData,
	      		dataType: 'json',
	      		success: function(data) {
	            	//console.log('Save success. data: ' + JSON.stringify(data));
	            	alert(data.success);	
	            	WA.Down();
	            	//document.location.refresh();
	            	//console.log(JSON.stringify(data));
        		},
        		error: function(data){
        			WA.Down();
        		}
    		});
		};
		this.MtTurnEnded= function(){
			console.log("Turn Ended called from "+this.DBData.Nombre);
			this.MtBleed().MtSpinDonwTempFX().MtRenderData();
			return this;
		};
		this.MtBleed= function(){
			var acu = 0;
			for (var i = 0; i < 16; i++) {	
				if (FindUDM_id("Pv/As") == $("#"+this.RenderSide+"smEUDM"+i).val() ) {
					var vb = Number($("#"+this.RenderSide+"InEVal"+i).val());
					acu = acu +vb;
				}
			}
			//Se ejecuata al finalizar el turno por lo que solo debe guardar en ram local
			this.DBData.OTHPRest -= acu;
			return this;
			//$("#"+this.RenderSide+"InOTHPRest").val(Number($("#"+this.RenderSide+"InOTHPRest").val())-acu);
			//HPRUpdate(this.RenderSide);
			//var event = {};
			//event.target ={};
			//event.target.id = this.RenderSide+"InOTHPRest";
			//SpinerChange2(event,"");
			//llamar al change
		};
		this.MtSpinDonwTempFX = function(){
			for (var i = 0; i < 16; i++) {
				for (var j = 0; j < UDMPArray.length; j++) {
					if (UDMPArray[j]._id == $("#"+this.RenderSide+"smEUDM"+i).val() ) {
						if (UDMPArray[j].tipo == 0) {
							if ($("#"+this.RenderSide+"smETipo"+i).val()!=FindFX_id("Concentrado")) {
								$("#"+this.RenderSide+"InEVal"+i).spinner("stepDown");
							}else{
								$("#"+this.RenderSide+"InEVal"+i).spinner("stepUp");
							}
						}
					}
				}
			}
			return	this;
		}
		this.MtRecalcAll=function(){
			Recalc("all",this.RenderSide,1);
			return this;
		} ;
		this.MtReRenderHPR=function(){
			HPRUpdate(this.RenderSide);
			return this;
		} ;
		this.MtDrawFX= function(data){
			DrawFXIcons(data?data:FXProtosArray,this.RenderSide);
			return this;
		};
		this.MtFullera = function (){
			this.DBData.OTHPRest = this.DBData.OTMaxHP;
			$.each(this.DBData.FX,function(i,item){
				item._id = FindFX_id("(Vacio)");
				item.valor = 0;
				item.note = "...";
				item.UDM = FindUDM_id("(Vacio)");
			});
			this.MtRenderData();
			return this;
		};
		return this;
}
function miniPJ(PJ){
	this._id = PJ.DBData._id;
	this.Nombre = PJ.DBData.Nombre;
	this.Ini = PJ.MtGetIni();
	this.SimIni = PJ.DBData.DDSimIni;
	this.RenderSide = PJ.RenderSide;				
	this.IniTotal = 0;
	this.TurnValue = 0;
	this.WaitingTurn = 1;
	return this;
}	
function SlmPJChange(event,ui){
    WA.Up();
    var sideS = event.target.id.substring(0,1);
    var val = $("#"+event.target.id).val();
	//console.log("SlmPJChange SideS= "+sideS);
    if (sideS=="L") {
    	WA.Exec("ctx.TeamL.MtSelectedPJ().MtRenderData().MtFormatFXVals();");
    }else if (sideS=="R") {
    	WA.Exec("ctx.TeamR.MtSelectedPJ().MtRenderData().MtFormatFXVals();");
    }
    WA.Down();
    return true; 	
}
//clase de Efecto
var FX={
	_id:Number,
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
function Wait(DivId,msj){
	this.msj = msj;
	this.DivId = DivId;
	this.val = 0;
	this.Dialog = $("#"+this.DivId).text(this.msj).dialog({
			closeOnEscape: false,
	        draggable: false,
	        resizable: false,
	        modal: true,
	        dialogClass:'WaitingOverLay',
	        minwidth:300,
	        minHeight:200,
	        title:"Estamos en eso...", 
	        open: function(event, ui) {
        		$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
			}
		});
	this.Up = function (){
		this.val += 1;
		//console.log("Up Called val: "+this.val);
		if (this.val>0) {
			this.show();
		}
	};
	this.Down = function (){
		this.val -= 1;
		//console.log("Down Called val: "+this.val);
		if (this.val==0) {
			this.close();
			//console.log("Closed And Length = "+this.CallBackStack.length);
			while (this.CallBackStack.length > 0) {
				eval(this.CallBackStack.shift());
			}
		}
	};
	this.show = function(){
		//console.log("Show Called val: "+this.val);
		/*No me acuerdo para que era esto
		if ($("#"+this.DivId).text().indexOf(msj) > -1) {
			$("#"+this.DivId).dialog("close");
		}*/
		this.Dialog.dialog("open");
	};
	this.close = function(){
		//console.log("Close Called val: "+this.val);
		$("#"+this.DivId).dialog("close");
	};
	this.Check = function(){
		//console.log("Check Called val: "+this.val);
		return this.val;
	}
	this.Exec = function(StringforEval){
		if (this.Check() == 0) {
			eval(StringforEval);
		}else{
			this.CallBackStack.push(StringforEval);
		}
	}
	this.CallBackStack = new Array();
	return this;
}
//--------------Dialog para pedir INI
function IngresoIniciativa(PJ) {
	var pj = PJ;
	$("#IniDialog").text("Ingrese la Tirada de Iniciativa de:" +PJ.Nombre  ).dialog({
		closeOnEscape: false,
        draggable: false,
        resizable: false,
        modal: true,
        dialogClass:'WaitingOverLay',
        minwidth:400,
        minHeight:400, 
        open: function(event, ui) {
    		$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
		},
		buttons: [
	    {
	      text: "Aceptar",
	      //icons: {      primary: "ui-icon-heart"     },
	      click:function(event,ui){
	      			PJ.TurnValue = PJ.IniTotal + $("#TiradaIniciativa").val();
	      			$("#IniDialog").dialog("close");
	      		}
	      // Uncommenting the following line would hide the text,	      // resulting in the label being used as a tooltip	      //showText: false
	    },
	    {
	      text: "Simular",
	      //icons: {      primary: "ui-icon-heart"     },
	      click:SaveIniFromDialog,
	      // Uncommenting the following line would hide the text,	      // resulting in the label being used as a tooltip	      //showText: false
	    }
  		]
	});
}
//---------------------------------
//Declaracion para Uso
var WA = new Wait("LoadingDialog","Loading...");//Objeto de Sincronizacion de codigo
var FXProtosArray = FXProtosToArray(); //Me trae todo los prototipos de Efectos que tengo cargados en la base de datos
var UDMPArray = UDMPToArray();			//Me trae todos los prototipos de Unidades de Medida que tengo en la base de datos
WA.Exec("LoadFxSl(FXProtosArray);");	//Carga los selectmenu con los nombre de los efectos
WA.Exec("LoadUDMSl(UDMPArray);");		//Carga los selectmenu con los nombre de las Unidades de medida.
//Creo una partida vacia. Luego aca deberia cargarse un contexto completo.
var ctx = Contexto();
//Creo 2 equipos vacios. Asigno donde se renderizaran sus controles 
ctx.TeamL = new Team("LsmPJ","LsmTeam","L");
ctx.TeamR = new Team("RsmPJ","RsmTeam","R");
ctx.MtCreateDialog("IniDialog");
ctx.MtCreateControlPanel("Control");
ctx.DivConteinerId = "CTBody";
ctx.DivConteinerId2 = "OTBody";


