

function ControlsToPJJson(sideS){
	var pj = {};
	pj.FX =[];
	pj.IniAGI =		$("#"+sideS+"InIniAGI").val() != "" ? $("#"+sideS+"InIniAGI").val():0;      
    pj.IniPenAct= 	$("#"+sideS+"InIniPenAct").val() != "" ? $("#"+sideS+"InIniPenAct").val():0;
    pj.IniMagia = 	$("#"+sideS+"InIniMagia").val() != "" ? $("#"+sideS+"InIniMagia").val():0;
    pj.IniEfectos = $("#"+sideS+"InIniEfectos").val() != "" ? $("#"+sideS+"InIniEfectos").val():0;
    pj.IniOtros = 	$("#"+sideS+"InIniOtros").val() != "" ? $("#"+sideS+"InIniOtros").val():0;
    //Tab BO
    pj.BOHabilidad =$("#"+sideS+"InBOHabilidad").val() != "" ? $("#"+sideS+"InBOHabilidad").val():0;
    pj.BOaBD2 = 	$("#"+sideS+"InBOaBD2").val() != "" ? $("#"+sideS+"InBOaBD2").val():0;
    pj.BOPenAct = 	$("#"+sideS+"InBOPenAct").val() != "" ? $("#"+sideS+"InBOPenAct").val():0;
    pj.BOMagia = 	$("#"+sideS+"InBOMagia").val() != "" ? $("#"+sideS+"InBOMagia").val():0;
	pj.BOEfectos =	$("#"+sideS+"InBOEfectos").val() != "" ? $("#"+sideS+"InBOEfectos").val():0;
	pj.BOOtros= 	$("#"+sideS+"InBOOtros").val() != "" ? $("#"+sideS+"InBOOtros").val():0;
	//Tab BD
	pj.BDAGI =		$("#"+sideS+"InBDAGI").val() != "" ? $("#"+sideS+"InBDAGI").val():0;
	pj.BDBOaBD =	$(""+sideS+"InBDBOaBD").val() != "" ? $(""+sideS+"InBDBOaBD").val():0;
	pj.BDAdrenal =	$("#"+sideS+"InBDAdrenal").val() != "" ? $("#"+sideS+"InBDAdrenal").val():0;
	pj.BDEscu =		$(""+sideS+"InBDEscu").val() != "" ? $(""+sideS+"InBDEscu").val():0;
	pj.BDPenAct =	$("#"+sideS+"InBDPenAct").val() != "" ? $("#"+sideS+"InBDPenAct").val():0;
	pj.BDMagia = 	$("#"+sideS+"InBDMagia").val() != "" ? $("#"+sideS+"InBDMagia").val():0;
	pj.BDEfectos = 	$("#"+sideS+"InBDEfectos").val() != "" ? $("#"+sideS+"InBDEfectos").val():0;
	pj.BDOtros =	$("#"+sideS+"InBDOtros").val() != "" ? $("#"+sideS+"InBDOtros").val() : 0;
	//Tab Otros
	pj.OTMaxPP =	$("#"+sideS+"InOTMaxPP").val() != "" ? $("#"+sideS+"InOTMaxPP").val() : 0;
	pj.OTPPRest=	$("#"+sideS+"InOTPPRest").val() != "" ? $("#"+sideS+"InOTPPRest").val() :0;
	pj.OTMaxSTA= 	$("#"+sideS+"InOTMaxSTA").val() != "" ? $("#"+sideS+"InOTMaxSTA").val() : 0;
	pj.OTSTAR =		$("#"+sideS+"InOTSTAR").val() != "" ? $("#"+sideS+"InOTSTAR").val() :0;
	pj.OTMaxAlim=	$("#"+sideS+"InOTMaxAlim").val() != "" ? $("#"+sideS+"InOTMaxAlim").val() :0;
	pj.OTAlimRest=	$("#"+sideS+"InOTAlimRest").val() != "" ? $("#"+sideS+"InOTAlimRest").val():0;
	pj.OTMaxSueño = $("#"+sideS+"InOTMaxSueño").val() != "" ? $("#"+sideS+"InOTMaxSueño").val() :0;
	pj.OTSueñoRest=	$("#"+sideS+"InOTSueñoRest").val() != "" ? $("#"+sideS+"InOTSueñoRest").val() :0;
	pj.OTMaxHidra = $("#"+sideS+"InOTMaxHidra").val() != "" ? $("#"+sideS+"InOTMaxHidra").val() :0;
	pj.OTHidraRest =$("#"+sideS+"InOTHidraRest").val() != "" ? $("#"+sideS+"InOTHidraRest").val() :0;
	pj.OTMaxHP =	$("#"+sideS+"InOTMaxHP").val() != "" ? $("#"+sideS+"InOTMaxHP").val() :0;
	pj.OTHPRest= 	$("#"+sideS+"InOTHPRest").val()!= "" ? 	$("#"+sideS+"InOTHPRest").val():0;
	//Datos
	//Resolviendo Nombre
	if ($("#"+sideS+"smPJ").val() != ""){
		if ($("#"+sideS+"smPJ").val() != "Nuevo") {
			pj._id = $("#"+sideS+"smPJ").val();
			pj.Nombre = $("#"+sideS+"smPJ option:selected").text();
		}
		else{
		pj.Nombre = $("#"+sideS+"NewPJName").val() != "" ? $("#"+sideS+"NewPJName").val() : "Nuevo - "+String($.now());
		}			
	}
	else{
		pj.Nombre = "Nuevo - "+String($.now());
	}
	pj.Profesion= 	$("#"+sideS+"selectmenu1").val() != "" ? $("#"+sideS+"selectmenu1").val():"Gil Robado";
	pj.DDExp	=	$("#"+sideS+"InDDExp").val() != "" ? $("#"+sideS+"InDDExp").val() :1000;
	pj.DDNivel=		$("#"+sideS+"InDDNivel").val() != "" ? $("#"+sideS+"InDDNivel").val():1;
	pj.DDTeam =		$("#"+sideS+"InDDTeam").val() != "" ? $("#"+sideS+"InDDTeam").val():0;
	pj.DDNombreJug =$("#"+sideS+"InDDNombreJug").val() != "" ? $("#"+sideS+"InDDNombreJug").val():"";
	pj.DDSimIni 	= $("#"+sideS+"smSimIni").val() != "" ? $("#"+sideS+"smSimIni").val():"";
	//TA
	pj.TACasco = 	$("#"+sideS+"InTACasco").val() != "" ? $("#"+sideS+"InTACasco").val():0;
	pj.TAPeto = 	$("#"+sideS+"InTAPeto").val() != "" ? $("#"+sideS+"InTAPeto").val():0;
	pj.TABrazales = $("#"+sideS+"InTABrazales").val() != "" ? $("#"+sideS+"InTABrazales").val() : 0 ;
	pj.TABotas = 	$("#"+sideS+"InTABotas").val()	 != "" ? $("#"+sideS+"InTABotas").val() : 0 ;
	pj.TAGrebas = 	$("#"+sideS+"InTAGrebas").val()	 != "" ? $("#"+sideS+"InTAGrebas").val() : 0 ;
	pj.TAGuantes = 	$("#"+sideS+"InTAGuantes").val()	 != "" ? $("#"+sideS+"InTAGuantes").val() : 0 ;
	pj.TAEscudo = 	$("#"+sideS+"InTAEscudo").val() != "" ? $("#"+sideS+"InTAEscudo").val() : 0;
	pj.TAMagia = 	$("#"+sideS+"InTAMagia").val() != "" ? $("#"+sideS+"InTAMagia").val() :0;
	pj.TAEfectos =  $("#"+sideS+"InTAEfectos").val() != "" ?  $("#"+sideS+"InTAEfectos").val() :0;
	pj.TAOtros = 	$("#"+sideS+"InTAOtros").val() != "" ? $("#"+sideS+"InTAOtros").val():0;
	pj.NONotes = 	$("#"+sideS+"TeNONotes").val() != "" ? $("#"+sideS+"TeNONotes").val():"...";
	//Efectos Leght fija =  16.		
	pj.FX = FxCtrolToArray(sideS);
  return pj;    
}
function FxCtrolToArray(sideS){
	var FX = [];
	for(var c =0;c<16;c++){
		FX[c]={
			"_id" : $("#"+sideS+"smETipo"+c).val() ,
			"valor": $("#"+sideS+"InEVal"+c).val() ,
			"UDM"  : $("#"+sideS+"smEUDM"+c).val(),
			"note" : $("#"+sideS+"TaENote"+c).val()
		};
	}
	return FX;
}
function PJJsonToControls(pj,sideS){	
	$("#"+sideS+"InIniAGI").val(pj.IniAGI);      
    $("#"+sideS+"InIniPenAct").val(pj.IniPenAct);
    $("#"+sideS+"InIniMagia").val(pj.IniMagia);
    $("#"+sideS+"InIniEfectos").val(pj.IniEfectos);
    $("#"+sideS+"InIniOtros").val(pj.IniOtros);
    //Tab BO
    $("#"+sideS+"InBOHabilidad").val(pj.BOHabilidad) ;
    $("#"+sideS+"InBOaBD2").val(pj.BOaBD2); 
    $("#"+sideS+"InBOPenAct").val(pj.BOPenAct); 
    $("#"+sideS+"InBOMagia").val(pj.BOMagia); 
    $("#"+sideS+"InBOEfectos").val(pj.BOEfectos); 
    $("#"+sideS+"InBOOtros").val(pj.BOOtros); 
    //Tab BD
    $("#"+sideS+"InBDAGI").val(pj.BDAGI); 
    $("#"+sideS+"InBDBOaBD").val(pj.BDBOaBD); 
    $("#"+sideS+"InBDAdrenal").val(pj.BDAdrenal); 
    $("#"+sideS+"InBDEscu").val(pj.BDEscu); 
    $("#"+sideS+"InBDPenAct").val(pj.BDPenAct); 
    $("#"+sideS+"InBDMagia").val(pj.BDMagia); 
    $("#"+sideS+"InBDEfectos").val(pj.BDEfectos); 
    $("#"+sideS+"InBDOtros").val(pj.BDOtros); 
    //Tab Otros
    $("#"+sideS+"InOTMaxPP").val(pj.OTMaxPP); 
    $("#"+sideS+"InOTPPRest").val(pj.OTPPRest); 
    $("#"+sideS+"InOTMaxSTA").val(pj.OTMaxSTA); 
    $("#"+sideS+"InOTSTAR").val(pj.OTSTAR); 
    $("#"+sideS+"InOTMaxAlim").val(pj.OTMaxAlim); 
    $("#"+sideS+"InOTAlimRest").val(pj.OTAlimRest);
    $("#"+sideS+"InOTMaxSueño").val(pj.OTMaxSueño); 
    $("#"+sideS+"InOTSueñoRest").val(pj.OTSueñoRest); 
    $("#"+sideS+"InOTMaxHidra").val(pj.OTMaxHidra); 
    $("#"+sideS+"InOTHidraRest").val(pj.OTHidraRest); 
    $("#"+sideS+"InOTMaxHP").val(pj.OTMaxHP); 
    $("#"+sideS+"InOTHPRest").val(pj.OTHPRest);  
    //Datos
    $("#"+sideS+"smPJ").val(pj._id) ;
    $("#"+sideS+"smPJ").selectmenu("refresh");
    $("#"+sideS+"selectmenu1").val(pj.Profesion) ;
    $("#"+sideS+"selectmenu1").selectmenu("refresh");
    $("#"+sideS+"InDDExp").val(pj.DDExp); 
    $("#"+sideS+"InDDNivel").val(pj.DDNivel) ;
    $("#"+sideS+"InDDTeam").val(pj.DDTeam);
    $("#"+sideS+"InDDNombreJug").val(pj.DDNombreJug);
    $("#"+sideS+"smSimIni").val(pj.DDSimIni);
    $("#"+sideS+"smSimIni").selectmenu("refresh");
    
    $( "#"+sideS+"radioset" ).buttonset("refresh");
    //TA
    $("#"+sideS+"InTACasco").val(pj.TACasco) ;
    $("#"+sideS+"InTAPeto").val(pj.TAPeto) ;
    $("#"+sideS+"InTABrazales").val(pj.TABrazales); 
    $("#"+sideS+"InTABotas").val(pj.TABotas)   ;
    $("#"+sideS+"InTAGuantes").val(pj.TAGuantes)   ;
    $("#"+sideS+"InTAGrebas").val(pj.TAGrebas)   ;
    $("#"+sideS+"InTAEscudo").val(pj.TAEscudo) ;
    $("#"+sideS+"InTAMagia").val(pj.TAMagia) ;
    $("#"+sideS+"InTAEfectos").val(pj.TAEfectos); 
    $("#"+sideS+"InTAOtros").val(pj.TAOtros) ;
    $("#"+sideS+"TeNONotes").val(pj.NONotes) ;
    //Efectos Leght fija =  16.
    for(var c =0;c<16;c++){
        $("#"+sideS+"smETipo"+c).val(pj.FX[c]._id);
        //$("#"+sideS+"smETipo"+c).selectmenu("refresh");
        $("#"+sideS+"InEVal"+c).val(pj.FX[c].valor);
        $("#"+sideS+"smEUDM"+c).val(pj.FX[c].UDM);
        //$("#"+sideS+"smEUDM"+c).selectmenu("refresh");
        $("#"+sideS+"TaENote"+c).val(pj.FX[c].note);
    }
    for(var c =0;c<16;c++){        
        $("#"+sideS+"smETipo"+c).selectmenu("refresh");
        $("#"+sideS+"smEUDM"+c).selectmenu("refresh");        
    }     
}

