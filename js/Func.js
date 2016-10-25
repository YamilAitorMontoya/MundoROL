//De Controles

//OK1
function HPRPrgBarChange(event,ui){
		var prc = $("#"+event.target.id).progressbar("option","value") / $("#"+event.target.id).progressbar("option","max");
		if (prc < 0.1){
            $("#"+event.target.id).css({ 'background': 'Red' });
        } else if (prc < 0.3){
            $("#"+event.target.id).css({ 'background': 'Orange' });
        } else if (prc < 0.5){
            $("#"+event.target.id).css({ 'background': 'Yellow' });
        } else{
            $("#"+event.target.id).css({ 'background': 'LightGreen' });
        }
}
function Recalc(Ctrl,sideS,All){
	//console.log("Argumento: "+Ctrl);
	var Tabs = ["LInIni","LInBO","LInBD","LInTA","LInOTHPRest","LInOTMaxHP",
				"LInBOaBD2","RInIni","RInBO","RInBD","RInTA","RInOTHPRest",
				"RInOTMaxHP","RInBOaBD2","InOTPPRest","InOTSTAR"];
	var Todo = All;
	for (var i = Tabs.length - 1; i >= 0; i--) {
		var n =Ctrl.indexOf(Tabs[i]);
		if (n>=0 || Todo) {
			//console.log("Match: "+Tabs[i]);
			switch (i) {
			    case 0://INI
			    case 7:
		        	var acu = Number(0);
		        	acu = acu + Number($("#"+sideS+"InIniAGI").val());
		        	acu = acu + Number($("#"+sideS+"InIniMagia").val());
		        	acu = acu + Number($("#"+sideS+"InIniEfectos").val());
		        	acu = acu + Number($("#"+sideS+"InIniOtros").val());
		        	acu = acu + Number($("#"+sideS+"InIniPenAct").val());
		        	//console.log("Suma: "+acu);
		        	$("#"+sideS+"LaINTot").text(String(acu));
		        	$("#"+sideS+"LaREIni").text(String(acu));
			        break;
			    case 1://BO
			    case 8:
			        var acu = Number(0);
		        	acu = acu + Number($("#"+sideS+"InBOHabilidad").val());
		        	acu = acu + Number($("#"+sideS+"InBOaBD2").val());
		        	acu = acu + Number($("#"+sideS+"InBOMagia").val());
		        	acu = acu + Number($("#"+sideS+"InBOEfectos").val());
		        	acu = acu + Number($("#"+sideS+"InBOOtros").val());
		        	acu = acu + Number($("#"+sideS+"InBOPenAct").val());
		        	//console.log("Suma: "+acu);
		        	$("#"+sideS+"LaBOTot").text(String(acu));
		        	$("#"+sideS+"LaREBO").text(String(acu));
			        break;
			    case 2://BD
			    case 9:
			        var acu = Number(0);
		        	acu = acu + Number($("#"+sideS+"InBDAGI").val());
		        	acu = acu + Number($("#"+sideS+"InBDAdrenal").val());
		        	acu = acu + Number($("#"+sideS+"InBDBOaBD").val());
		        	acu = acu + Number($("#"+sideS+"InBDEscu").val());
		        	acu = acu + Number($("#"+sideS+"InBDMagia").val());
		        	acu = acu + Number($("#"+sideS+"InBDEfectos").val());
		        	acu = acu + Number($("#"+sideS+"InBDOtros").val());
		        	acu = acu + Number($("#"+sideS+"InBDPenAct").val());
		        	//console.log("Suma: "+acu);
		        	$("#"+sideS+"LaBDTot").text(String(acu));
		        	$("#"+sideS+"LaREBD").text(String(acu));
			        break;
			    case 3://TA
			    case 10:
			        var acu = Number(0);
		        	acu = acu + Number($("#"+sideS+"InTACasco").val());
		        	acu = acu + Number($("#"+sideS+"InTAPeto").val());
		        	acu = acu + Number($("#"+sideS+"InTABrazales").val());
		        	acu = acu + Number($("#"+sideS+"InTAGuantes").val());
		        	acu = acu + Number($("#"+sideS+"InTAGrebas").val());
		        	acu = acu + Number($("#"+sideS+"InTABotas").val());
		        	acu = acu + Number($("#"+sideS+"InTAEscudo").val());
		        	acu = acu + Number($("#"+sideS+"InTAMagia").val());
		        	acu = acu + Number($("#"+sideS+"InTAEfectos").val());
		        	acu = acu + Number($("#"+sideS+"InTAOtros").val());
		        	//console.log("Suma: "+acu);
		        	$("#"+sideS+"LaTATot").text(String(acu));
		        	$("#"+sideS+"LaRETA").text(String(acu));
			        break;
			        //LInOTHPRest
			    case 4://HP Rest
			    case 11:
			        HPRUpdate(sideS);
			        break;
			        //LInOTMaxHP
			    case 5://HP Rest
			    case 12:
			        var HPM = Number($("#"+sideS+"InOTMaxHP").val());
		        	$( "#"+sideS+"pgHP" ).progressbar("option","max",HPM);
		        	//console.log("HPM: "+HPM);
			        break;
			    case 6:
			    case 13:
			    	var valor =$("#"+sideS+"InBOaBD2").val();
			    	$("#"+sideS+"InBDBOaBD").val(valor);
			    	//console.log("Valor 1:"+ valor);
			    	//console.log("Valor 2:"+ $("#"+sideS+"InBDBOaBD").val());
			    	break;
			    case 14: //PPRest
			    	var v = $("#"+sideS+"InOTPPRest").val();
		        	$("#"+sideS+"LaREPP").text(String(v));
			    	break;
		    	case 15: //STARest
		    		var v = $("#"+sideS+"InOTSTAR").val();
		        	$("#"+sideS+"LaRESTA").text(String(v));
			    	break;
			    default:
			        console.log("Caso default: Vacio");
			}
		}
	}
}
function HPRUpdate(sideS){
	var HPR = Number($("#"+sideS+"InOTHPRest").val());
	$("#"+sideS+"LaHPRest").text(String(HPR));
	$( "#"+sideS+"pgHP" ).progressbar("option","value",HPR);
	//console.log("HPR: "+HPR);
}

function DeleteConfirmation(event,ui){
    //var a = ControlsToPJJson();
    var sideS = event.target.id.substring(0,1);
    var team;
    if (sideS == "L") {
    	team  =  TeamL ;
    }else{
    	team =TeamR ;
    }
    var pj = team.MtSelectedPJ();
    if (pj) return false; //Viene negado desde la otra funcion
    $("#dialog").attr('title',"Confirmacion de Borrado").text("Confirma que desea borrar el Personaje : " + pj.DBData.Nombre + "  ?").dialog({
        buttons:{
        		'Ok':function(){pj.MtDelete(); $(this).dialog('close'); },
                'Cancel':function(){$(this).dialog('close');}
                },
        closeOnEscape: true,
        draggable: false,
        resizable: false,
        modal: true,
        dialogClass:'delete_confirmation_dialog',
        width:400,
        minHeight:200,         
      });
}
function SavePJ(event,ui){
	var btnSId = event.target.id
	var sideS = btnSId.substring(0,1);
	var pj;
	if (sideS == "L") {
		pj = TeamL.MtSelectedPJ(null,1);	
	}
	if (sideS == "R") {
		pj = TeamR.MtSelectedPJ(null,1);
	}
	if(pj){
		pj.MtUpdatePJ();
		return true;	
	} 
	return false;
}//ok es para updatear
function IniDialog(){
	var d =$("#IniDialog").dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
        "Guardar Valor y Seguir": function(){
        	alert($("#TiradaIniciativa").val())
        },
        Cancelar : function() {
          d.dialog( "close" );
        }
      }
    });
    d.dialog( "open" );
}

function BtnSetChange(event,ui){
	var btnSId = event.target.id;
	var sideS = btnSId.substring(0,1);
	//var PJId = $("#"+sideS+"smPJ").val();
	if (sideS=="L") {
		TeamL.MtSelectedPJ().DBData.DDSimIni =  $('input:radio[name=Lradio]:checked').val();
	}else{
		TeamR.MtSelectedPJ().DBData.DDSimIni =  $('input:radio[name=Rradio]:checked').val();
	}
}  //falta Corroborar
function DDTeamChange(event,ui){
	var InId = event.target.id;
	var sideS = InId.substring(0,1);
	//var PJId = $("#"+sideS+"smPJ").val();
	if (sideS=="L") {
		TeamL.MtSelectedPJ().DBData.DDTeam =  $("#"+InId).val();
	}else{
		TeamR.MtSelectedPJ().DBData.DDTeam =  $("#"+InId).val();
	}
}  //falta Corroborar
function DDNombreJug(event,ui){
	var InId = event.target.id;
	var sideS = InId.substring(0,1);
	//var PJId = $("#"+sideS+"smPJ").val();
	if (sideS=="L") {
		TeamL.MtSelectedPJ().DBData.DDNombreJug =  $("#"+InId).val();
	}else{
		TeamR.MtSelectedPJ().DBData.DDNombreJug =  $("#"+InId).val();
	}
}  //falta Corroborar
function InNewPJName(event,ui){
	var InId = event.target.id;
	var sideS = InId.substring(0,1);
	//var PJId = $("#"+sideS+"smPJ").val();
	if (sideS=="L") {
		TeamL.MtSelectedPJ().DBData.DDNombreJug =  $("#"+InId).val();
	}else{
		TeamR.MtSelectedPJ().DBData.DDNombreJug =  $("#"+InId).val();
	}
}  //falta Corroborar
function FIllWithRandomData(sideS){
    $("#"+sideS+"InIniAGI").val(randomIntFromInterval(-5,50));      
    $("#"+sideS+"InIniPenAct").val(randomIntFromInterval(0,100));
    $("#"+sideS+"InIniMagia").val(randomIntFromInterval(0,100));
    $("#"+sideS+"InIniEfectos").val(randomIntFromInterval(0,100));
    $("#"+sideS+"InIniOtros").val(randomIntFromInterval(0,100));
    //Tab BO
    $("#"+sideS+"InBOHabilidad").val(randomIntFromInterval(-25,200)) ;
    $("#"+sideS+"InBOaBD2").val(randomIntFromInterval(0,200)); 
    $("#"+sideS+"InBOPenAc").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBOMagia").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBOEfectos").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBOOtros").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDAGI").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDBOaBD").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDAdrenal").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDEscu").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDPenAct").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDMagia").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDEfectos").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InBDOtros").val(randomIntFromInterval(0,100)); 
    //Tab TA FALTA en la Vista
    $("#"+sideS+"InTABase").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InTAEscu").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InTAPenAct").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InTAMagia").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InTAEfectos").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InTAOtros").val(randomIntFromInterval(0,100)); 
    //Tab Otros
    $("#"+sideS+"InOTMaxPP").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTPPRest").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTMaxSTA").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTSTAR").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTMaxAlim").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTAlimRest").val(randomIntFromInterval(0,100));
    $("#"+sideS+"InOTMaxSueño").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTSueñoRest").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTMaxHidra").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTHidraR").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTMaxHP").val(randomIntFromInterval(0,100)); 
    $("#"+sideS+"InOTHPRest").val(randomIntFromInterval(0,100));  
    //Datos
    //$("#LsmPJ").val("PJN1Testing") ;
    //$("#LsmPJ").selectmenu("refresh");
    $("#"+sideS+"selectmenu1").val("GM") ;
    $("#"+sideS+"selectmenu1").selectmenu("refresh");
    $("#"+sideS+"InDDExp").val(randomIntFromInterval(0,1000000)); 
    $("#"+sideS+"InDDNivel").val(randomIntFromInterval(0,30)) ;
    //TA
    $("#"+sideS+"InTACasco").val(randomIntFromInterval(-5,10)) ;
    $("#"+sideS+"InTAPeto").val(randomIntFromInterval(-5,20)) ;
    $("#"+sideS+"InTABrazales").val(randomIntFromInterval(-5,10)); 
    $("#"+sideS+"InTABotas").val(randomIntFromInterval(-5,100))   ;
    $("#"+sideS+"InTAEscudo").val(randomIntFromInterval(-5,20)) ;
    $("#"+sideS+"InTAMagia").val(randomIntFromInterval(-20,20)) ;
    $("#"+sideS+"InTAEfectos").val(randomIntFromInterval(-5,20)); 
    $("#"+sideS+"InTAOtros").val(randomIntFromInterval(-5,20)) ;
    //Efectos Leght fija =  16.
    for(var c =0;c<16;c++){
        $('#'+sideS+'smETipo'+c).val("(Vacio)");
        $('#'+sideS+'smETipo'+c).selectmenu("refresh");
        $('#'+sideS+'InEVal'+c).val(c+5);
        $('#'+sideS+'smEUDM'+c).val("As");
        $('#'+sideS+'smEUDM'+c).selectmenu("refresh");
    }       
};//Falta Corroborar
function NONoteChange(event,ui){
	var InId = event.target.id;
	var sideS = InId.substring(0,1);
	//var PJId = $("#"+sideS+"smPJ").val();
	if (sideS=="L") {
		TeamL.MtSelectedPJ().DBData.NONotes =  $("#"+InId).val();
	}else{
		TeamR.MtSelectedPJ().DBData.NONotes =  $("#"+InId).val();
	}
};//Falta Corroborar

function SlmSimIniChange(event,ui){
	SpinerChange2(event,ui);
}

function SpinerChange2(event,ui){
	console.log	("SpinerChange2 called");
	var Name = event.target.id;
    var sideS = Name.substring(0,1);
    var pj;
    if (sideS== "L") {
    	pj = ctx.TeamL.MtSelectedPJ(null,1);
    }else{
    	pj = ctx.TeamR.MtSelectedPJ(null,1);
    }
    if (!pj) {
    	return true;
    }
    //Me fijo si el valor de FX
    if (Name.indexOf("EVal")!=-1) {
    	var Valor =$("#"+Name).spinner('value');
    	if (Valor==0) {
    		DifuseFX(Name,sideS);
    	}
    	pj.DBData.FX = FxCtrolToArray(pj.RenderSide); //Solo actualizo los FX  
    }else{
    	pj.MtRecalcAll(sideS);
    	pj.DBData = ControlsToPJJson(sideS);
    } 
}//OK
function SpinerChange(event,ui){
	var Name = event.target.id;
    var sideS = Name.substring(0,1);
    var pj
    //console.log(Name+" stop() called");
    // Aca deberia validar maximos
    //Recalc(Name, sideS); //Actualiza los calculos
    if (sideS== "L") {
    	pj = TeamL.MtSelectedPJ();
    }else{
    	pj = TeamR.MtSelectedPJ();
    }
    if (!pj) {
    	return true;
    }
    pj.MtRecalcAll(sideS);
    var Valor =$("#"+Name).spinner('value');
    if (Valor==0) {
    	DifuseFX(Name,sideS);
    }   
    var PJN = $("#"+sideS+"smPJ").val();
    if (PJN !="Nuevo") {
        //console.log("Spiner Value: " + Valor);
        var Prop;
        if (Name.indexOf("EVal")>0) {// Es control de FX
        	$.ajax({
	            type: 'POST',
	            url: "UpdatePJ",
	            data: {"Nombre":PJN, "IsFX":Number(1), "FXArray":FxCtrolToArray(sideS)},
	            dataType: 'json',
	            success: function(data) {
	                  console.log(data.success);
	                  //console.log(JSON.stringify(data));
	            }
	        });
        }
        else{//NO Es control de FX
	        Prop = Name.substring(3);
	        $.ajax({
	            type: 'POST',
	            url: "UpdatePJ",
	            data: {"Nombre":PJN,"Propiedad":Prop ,"Valor":Valor},
	            dataType: 'json',
	            success: function(data) {
	                  console.log(data.success);
	            }
	        });
        }
    }
}//Deprecated.

//Not Checked : 
function Sp48Stop(event,ui){
	var n = event.target.id;
	switch(n){
		case "CInAs":
			var v = Number($("#"+n).val());
			if (v>=6) {
				$("#"+n).val(Number(v-6));
				$("#CInMin").spinner("stepUp");
			}
			break;
		case "CInMin":
			var v = Number($("#"+n).val());
			if (v>=60) {
				$("#"+n).val(Number(v-60));
				$("#CInHora").spinner("stepUp");
			}
			break;
		case "CInHora":
			var v = Number($("#"+n).val());
			if (v>=24) {
				$("#"+n).val(Number(v-24));
				//$("#CInMin").spinner("stepUp");
				//Dia Up ???
			}
			break;
		default:
	}
}//Esto es para el Reloj.

//Zona FX
function LoadFxSl(mArray){
	for(var c =0;c<16;c++){
		$('#LETableHead').after(
		"<tr><td class='LEtcol1'><select id='LsmETipo"+c+"'class='FXSlm'></select></td><td class='LEtcol2'><textarea id='LTaENote"+c+"'' class='fill'>...</textarea></td> <td class='LEtcol3'><input id='LInEVal"+c+"' class='In50' value='"+c+"' placeholder='0'></td><td class='LEtcol4'><select id='LsmEUDM"+c+"' class='FXSlm'></select></td></tr>");
		$('#RETableHead').after(
		"<tr><td class='LEtcol1'><select id='RsmETipo"+c+"'class='FXSlm'></select></td><td class='LEtcol2'><textarea id='RTaENote"+c+"'' class='fill'>...</textarea></td> <td class='LEtcol3'><input id='RInEVal"+c+"' class='In50' value='"+c+"' placeholder='0'></td><td class='LEtcol4'><select id='RsmEUDM"+c+"' class='FXSlm'></select></td></tr>");
		  //<option value='(vacio)' selected>(vacio)</option><option value='Aturdido'>Aturdido</option><option value='Debe Parar'>Debe Parar</option><option value='Dormido'>Dormido</option><option value='Sangrando'>Sangrando</option><option value='Debil'>Debil</option><option value='Testing'>Testing</option>
	}
	for (var i = 15 ; i >= 0; i--) {
		//console.log("i=" + i );
		for (var f = mArray.length - 1; f >= 0; f--) {
			var s = "<option value='"+mArray[f]._id+"''>"+mArray[f].Nombre+"</option>";
			//console.log(s);
			$("#LsmETipo"+i).append(s);
			$("#RsmETipo"+i).append(s);
		}
	}
	$( ".FXSlm" ).selectmenu({change: FXSlmChange});
	//var spinner = 
	$( ".In50" ).spinner({stop: SpinerChange2});
	return true;
}//OK
function LoadUDMSl(mArray){
	//console.log("llama a la funcion");
	for (var i = 15 ; i >= 0; i--) {
		//console.log("i=" + i );
		for (var f = mArray.length - 1; f >= 0; f--) {
			var s = "<option value='"+mArray[f]._id+"''>"+mArray[f].Nombre+"</option>";
			//console.log(s);
			$("#LsmEUDM"+i).append(s);
			$("#RsmEUDM"+i).append(s);
		}
	}
	return true;
}//OK
function FXSlmChange (event,ui){
	var name = event.target.id;	
	var sideS =name.substring(0,1);
	var	PJId = $("#"+sideS+"smPJ").val();
	var ind = name.substring(8);
	if ($("#"+name).val() == FindFX_id("(Vacio)")) {
		$("#"+sideS+"smEUDM"+ind).val(FindUDM_id("(Vacio)"));
		$("#"+sideS+"smEUDM"+ind).selectmenu("refresh");
	}
	if (name.indexOf("UDM")!= -1) {
		var indu = name.substring(7);
		formatFXValSp(sideS,indu,$("#"+name).val());
	} 
	if (sideS == "L") {
		ctx.TeamL.MtSelectedPJ(PJId,1).MtUpdateFX().MtDrawFX();
	}else if (sideS=="R") {
		ctx.TeamR.MtSelectedPJ(PJId,1).MtUpdateFX().MtDrawFX();
	}
}
function DrawFXIcons(mArray,sideS){
	//console.log("DrawFX Side: " + sideS);
	var itd = [];
	for (var i = 15 ; i >= 0; i--) {
		//console.log("i=" + i );
		if ($("#"+sideS+"smETipo"+i).val() && $("#"+sideS+"smETipo"+i).val()!= "") {
			for (var f = mArray.length - 1; f >= 0; f--) {
				if ($("#"+sideS+"smETipo"+i).val()==mArray[f]._id) {
					if ($.inArray(f,itd)==-1) {
						itd.push(f);//voy metiendo los identificadores de iconos que tengo que dibujar.
					}
					break;
				}
			}
		}
	}
	$("#"+sideS+"DiForIcons").html("");
	for (var i = itd.length - 1; i >= 0; i--) {
		var Img = FXProtosArray[itd[i]].Image;
		if (Img.indexOf(".")!=-1) {
			var X = FXProtosArray[itd[i]].X;
			var Y = FXProtosArray[itd[i]].Y;
			var width = FXProtosArray[itd[i]].width;
			var height = FXProtosArray[itd[i]].height;
			$("#"+sideS+"DiForIcons").append("<img id='"+sideS+"FXIcon"+i+"' class='FXIcon'>");
			$("#"+sideS+"FXIcon"+i).css('background',"url('images/"+Img+"') no-repeat");// + no repeat
	        $("#"+sideS+"FXIcon"+i).css('width',width);
	        $("#"+sideS+"FXIcon"+i).css('height',height);
	        $("#"+sideS+"FXIcon"+i).css('background-position',-1*X+"px "+-1*Y+"px");
		}
	}
}//OK
function DifuseFX(name,sideS){
	var ix = name.substring(7);
	var FXN = $("#"+sideS+"smETipo"+ix).val();
	var tipo = FindFXTipe(FXN);
	if (tipo == 0) {
		$("#"+sideS+"smETipo"+ix).val(FindFX_id("(Vacio)"));
		$("#"+sideS+"smETipo"+ix).selectmenu("refresh");
		$("#"+sideS+"smEUDM"+ix).val(FindUDM_id("(Vacio)"));
		$("#"+sideS+"smEUDM"+ix).selectmenu("refresh");
		/*var event = {};
		event.target = {};
		event.target.id = sideS+"smETipo"+ix;
		SlmnuChange(event,"");*/
	}
}
function FindFXTipe(_id){//Es para saber si un efecto es temporal o no.
	var r = 1;
	for (var i = FXProtosArray.length - 1; i >= 0; i--) {
		if (_id == FXProtosArray[i]._id) {
			r = FXProtosArray[i].tipo;
			break;
		}
	}
	//console.log("Entro al find r= "+r)
	return r;
}
function FindFX_id(Nombre){//Es para saber si un efecto es temporal o no.
	var r = 1;
	for (var i = FXProtosArray.length - 1; i >= 0; i--) {
		if (Nombre == FXProtosArray[i].Nombre) {
			r = FXProtosArray[i]._id;
			break;
		}
	}
	//console.log("Entro al find r= "+r)
	return r;
}
function FindUDMCoef(_id){
	var r = 1;
	for (var i = UDMPArray.length - 1; i >= 0; i--) {
		if (_id == UDMPArray[i]._id) {
			r = UDMPArray[i].Coef;
			break;
		}
	}
	//console.log("Entro al find r= "+r)
	return r;
}
function FindUDM_id(Nombre){
	var r = 1;
	for (var i = UDMPArray.length - 1; i >= 0; i--) {
		if (Nombre == UDMPArray[i].Nombre) {
			r = UDMPArray[i]._id;
			break;
		}
	}
	//console.log("Entro al find r= "+r)
	return r;
}
function FXProtosToArray(){
	var a = [];
	WA.Up();
	$.ajax({
      type: 'POST',
      url: "FXProtos",
      data: {} ,
      dataType: 'json',
      success: function(data) {
            //console.log('FX Load success. data: ' + JSON.stringify(data));
            $.each(data, function(i, item){
	            //console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
	            a[i] = data[i]
	            //console.log("Indice: "+ i + " - Nombre: " + data[i].Nombre + " - Tipo: "+ data[i].tipo);
    		});
            WA.Down();
        }
  	});
  	return a;
}//OK
function UDMPToArray(){
	var a = [];
	WA.Up();
	$.ajax({
      type: 'POST',
      url: "UDMProtos",
      data: {} ,
      dataType: 'json',
      success: function(data) {
            //console.log('FX Load success. data: ' + JSON.stringify(data));
            $.each(data, function(i, item){
	            //console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
	            a[i] = data[i]
	            //console.log("Indice: "+ i + " - Nombre: " + data[i].Nombre + " - Tipo: "+ data[i].tipo);
    		});
            WA.Down();
        }
  	});
  	return a;
}
function formatFXValSp(sideS,index,UDM_id){
	var c = FindUDMCoef(UDM_id);
	var n;
	if (c != 0) {
		n = 1/c;
		n = n.toFixed(5);
	}else{
		n = 1;
	}
	$("#"+sideS+"InEVal"+index).spinner( "option", "step", n );
	$("#"+sideS+"InEVal"+index).spinner( "option", "numberFormat", "n" );
	$("#"+sideS+"InEVal"+index).spinner( "option", "min", 0 );
	//$("#"+sideS+"InEVal"+ind).val($("#"+sideS+"InEVal"+ind).val()- (1/c));
	$("#"+sideS+"InEVal"+index).css("text-align","left");
	//console.log("Step Actualizado");
}
//Auxiliares
function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);
}//OK
function SortByVal(a, b){return ((a.val > b.val) ? -1 : ((a.val < b.val) ? 1 : 0));
}//OK

//De Funcionamiento

function GetIniFromName(name, index, countToFInish){
	var  a = Number ;
	$.ajax({
	    type: 'POST',
	    url: "LoadPJ",
	    data: {Nombre:name},
	    dataType: 'json',
	    success: function(data) {
	        //DrawFXIcons(FXProtosArray,sideS); Podria servir para actualizar Estado en la COl Central
	        if (data.DDSimIni=="SI") {
	        	$("#CITIn"+index+"a").val(randomIntFromInterval(0,100));
	        }
	        a = data.IniAGI +data.IniPenAct + data.IniMagia + data.IniEfectos + data.IniOtros;
			IniArray[index]=a;
			if (IniArray.length != countToFInish) {
				$("#CalcOrden").button("disable");
			}else{
				$("#CalcOrden").button("enable");
			}
	    	}
    });
}

//---------------------------------------------
//Funciones Ajax 



function GetPJ(PJ_id) {
	console.log('GetTeam Called with TeamName= '+ TeamName);
	WA.Up();
	var P = {};
	$.ajax({
	    type: 'POST',
	    url: "LoadPJi",
	    data: {"_id":PJ_id},
	    dataType: 'json',
	    success: function(data) {
	        //console.log('Success callback trigued from GetPJ');
	        P = data;
	        WA.Down();
	    }
    });
	return P;
}


//Funciones auxiliares para la Clase Context
//Funciones de Controles de IniDialog

