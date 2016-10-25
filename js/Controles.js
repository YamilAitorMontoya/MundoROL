//Esto lo busco despues si lo necesito

var AutoTags = ["Todos"];
//AutoComplete del NobmreJugador
var JugChoices =["Aitor","Andres","Damito","Fede","Juan","Negro","GM"];
$("#LNewPJName").change(function(){ //Validar que haya nombre nuevo
  if ($(this).val()!="") {
      $("#Guardar").removeAttr('disabled');
  }else{
    $("#Guardar").attr('disabled','disabled');
  }
});
$("#RNewPJName").change(function(){ //Validar que haya nombre nuevo
  if ($(this).val()!="") {
      $("#RGuardar").removeAttr('disabled');
  }else{
    $("#RGuardar").attr('disabled','disabled');
  }
});
//TestIcon Area
var FXimgNames = ["FX1p.png","FX2j.jpg","FX3j.jpg","FX4j.jpg","FX5p.png","FX6j.jpg","FX7j.jpg","FX8j.jpg","FX9j.jpg","FX10j.jpg","FX11j.jpg","FX12j.jpg","FX13j.jpg","FX14j.jpg","FX15p.png","FX16j.jpg","FX17j.jpg","FX18j.jpg","FX19p.png","FX20j.jpg","FX21p.png","FX22p.png"];
$("#RImgName").autocomplete({
	source:FXimgNames,
	change:function(event,ui){
		var Img = new Image();
		var v = 'url("css/images/'+ $("#RImgName").val() +'") no-repeat';
		//console.log(v);
		Img.onload = function(){
			$("#RSlX").slider( "option", "max", this.width);
			$("#RInImgW").val(this.width);
			//console.log(this.width);
			$("#RSlY").slider( "option", "max", this.height);
			$("#RInImgH").val(this.height);
			//console.log(this.height);
		}
		Img.src = "css/images/"+ $('#RImgName').val();
		$("#IconTest").css('background', v );
		//console.log($("#IconTest").width());
		$("#IconTest").css('width','95%');
		$("#IconTest").css('height',1200);
	}
});
$("#RSlX").slider({
      range: false,
      min: 0,
      max: 1000,
      values: [0],
      slide: function( event, ui ) {
        $( "#RLaXa" ).text(String("Xa=" + ui.values[ 0 ]));
        //$( "#RLaXb" ).text(String("Xb=" + ui.values[ 1 ]));
        //var width = ui.values[ 1 ] - ui.values[0];
        //$("#IconTest").css('width',width);
        //$( "#RLaXw" ).text("Width=" +String(width));
        $("#IconTest").css('background-position', "-"+ui.values[0]+"px -"+$("#RSlY").slider('values',0)+"px");
      }
});
$("#RSlY").slider({
      range: false,
      min: 0,
      max: 1000,
      values: [0],
      slide: function( event, ui ) {
        $( "#RLaYa" ).text(String("Ya=" + ui.values[ 0 ]));
        //$( "#RLaYb" ).text(String("Yb=" + ui.values[ 1 ]));
        //var height = ui.values[ 1 ] - ui.values[0];
        //$("#IconTest").css('height',height);
        //$( "#RLaYw" ).text("Heigth=" +String(height));
        $("#IconTest").css('background-position', "-"+$("#RSlX").slider("values",0) +"px -"+$("#RSlY").slider('values',0)+"px");
      }
});
$("#RInImgW").spinner({
	stop:function(event, ui){
		var width = $("#RInImgW").val();
		$("#IconTest").css('width',width);
	},
	step:5
}).val(50);
$("#RInImgH").spinner({
	stop:function(event, ui){
		var h = $("#RInImgH").val();
		$("#IconTest").css('height',h);
	},
	step:5
}).val(50);
$("#RInSaveFX").click(function(){ //Juntar datos y enviar a DB
    //var a = ControlsToPJJson();
    var a = {};
    if ($("#RFXName").val()!="") {
      a.Nombre = $("#RFXName").val();
    }
    else{
    	return;
    }
    a.Image = $("#RImgName").val();
    a.X = $("#RSlX").slider('values',0);
    a.Y = $("#RSlY").slider('values',0);
    a.width = $("#RInImgW").val();
    a.height =$("#RInImgH").val();
    a.tipo =$("#RInFXPTipo").val();
    $.ajax({
      type: 'POST',
      url: "UpdateFX",
      data: a,
      dataType: 'json',
      success: function(data) {
            console.log('FX Update success. data: ' + JSON.stringify(data));
            alert(data.success);
            //document.location.refresh();
            //console.log(JSON.stringify(data));
        }
    });
});
//MInLoadFX
$("#MInLoadFX").click(function(){
	$.ajax({
      type: 'POST',
      url: "FXProtos",
      data: {} ,
      dataType: 'json',
      success: function(data) {
            console.log('FX Load success. data: ' + JSON.stringify(data));
            $.each(data, function(i, item){
	            //console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
	            var n = data[i].Nombre;
	            $("#MpFX").append("<label for='FXimg"+i+"'>"+n+"</label><img src='' id='FXimg"+i+"'><button type='button' id='"+n+"' class='BtnBorrarFX' >Borrar </button><br>");
	            $("#MpFX").append("<label for='FXimg"+i+"'>"+data[i].tipo+"</label>");
	            $('#FXimg'+i).css('background',"url('images/"+data[i].Image+"')");
	            $('#FXimg'+i).css('width',data[i].width);
	            $('#FXimg'+i).css('height',data[i].height);
	            $('#FXimg'+i).css('background-position',-1*data[i].X+"px "+-1*data[i].Y+"px");
    		});
            $('.BtnBorrarFX').click(function(){
            	$.ajax({
				      type: 'POST',
				      url: "FXProtosDel",
				      data: {'Nombre':this.id} ,
				      dataType: 'json',
				      success: function(data) {
				            console.log('FX Borrado success. data: ' + JSON.stringify(data));
				          	}
				});
		    });
        }
  	});
});
$("#RInFXPIndex").spinner({
	max: 14,
	min: 0,
	value: 0,
	stop: function(){
		$("#RFXName").val(FXProtosArray[$("#RInFXPIndex").val()].Nombre);
		$("#RInFXPTipo").val(FXProtosArray[$("#RInFXPIndex").val()].tipo);
		$("#RInImgH").val(FXProtosArray[$("#RInFXPIndex").val()].height);
		$("#RInImgW").val(FXProtosArray[$("#RInFXPIndex").val()].width);
		$("#RSlX").slider('values',0, FXProtosArray[$("#RInFXPIndex").val()].X);
		$("#RSlY").slider('values',0, FXProtosArray[$("#RInFXPIndex").val()].Y);
		$("#RImgName").val(FXProtosArray[$("#RInFXPIndex").val()].Image);
	}
});
$("#RInSaveUDM").click(function(){ //Juntar datos y enviar a DB
    //var a = ControlsToPJJson();
    var a = {};
    if ($("#RUDMXName").val()!="") {
      a.Nombre = $("#RUDMName").val();
    }
    else{
    	return;
    }
    a.Coef = $("#RInUDMCoef").val();
    a.tipo =$("#RInUDMTipo").val();
    $.ajax({
      type: 'POST',
      url: "UpdateUDMP",
      data: a,
      dataType: 'json',
      success: function(data) {
            console.log('UDM Update success. data: ' + JSON.stringify(data));
            alert(data.success);
            //document.location.refresh();
            //console.log(JSON.stringify(data));
        }
    });
});
$("#RInLoadUDM").click(function(){
	$.ajax({
      type: 'POST',
      url: "UDMProtos",
      data: {} ,
      dataType: 'json',
      success: function(data) {
            console.log('FX Load success. data: ' + JSON.stringify(data));
            $.each(data, function(i, item){
	            //console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
	            var n = data[i].Nombre;
	            var c = data[i].Coef;
	            var t = data[i].tipo;
	            $("#MpUDM").append("<p>Nombre: "+n+" - Coef: "+c+" - Tipo: "+t+" </p> <button type='button' id='"+n+"' class='BtnBorrarFX' >Borrar </button><br>");
	            //$("#MpFX").append("<label for='FXimg"+i+"'>"+data[i].tipo+"</label>");	            
	/*      $('.BtnBorrarFX').click(function(){
            	$.ajax({
				      type: 'POST',
				      url: "FXProtosDel",
				      data: {'Nombre':this.id} ,
				      dataType: 'json',
				      success: function(data) {
				            console.log('FX Borrado success. data: ' + JSON.stringify(data));
				          	}
				});
		    });*/
        	});
  		}
	});
});
//   Columna Central

$("#LoadPjs").button().click(function(event, ui){
			$.ajax({/*Esto creo que ya lo tengo pedido en la clase de Pj o de Team*/
		    type: 'POST',
		    url: "LoadBothTeams",
		    data: {Team1:$("#LsmTeam").val(),Team2:$("#RsmTeam").val()},
		    dataType: 'json',
		    success: function(data) {
		        //console.log('Load success \n');
		        //console.log(JSON.stringify(data));
		        /*var rowsToRemove =  $("#ControlTable tr.CITR").size();
		        for (var i = 0; i < rowsToRemove.length; i++) {
		        	$("#ControlTable tr.CITR")[i].remove();
		        }*/
		        $("#CTBody").html("");
		        $.each(data, function(i, item){
		            //console.log("PJ"+i+": "+JSON.stringify(data[i])+"\n");
		            var n = data[i].Nombre;
		            //$("#LsmPJ").append("<option value='"+n+"''>"+n+"</option>");
		            $('#CTBody').append('<tr class="CITR" id="CITRQ'+i+'"><td id="CITC'+i+'N" class="CITCN">'+n+'<td id="CITC'+i+'E" class="CITCE"></td><td class="CITCI"><input id="CITIn'+i+'a" class="In52" ></td><td class="CITCT"><input id="CITIn'+i+'b" class="In52" ></td><td id="CITC'+i+'O" class="CITCO"></td></tr>');
		            $('.In52').spinner();//Esta va por que como se escriben con el success es asincronico y siempre demora mas que el .js
          		});
          		$("#ClrIni").button("enable");
          		$("#LsmTeam").selectmenu("disable");
          		$("#RsmTeam").selectmenu("disable");
          		$("#FinCombateBtn").button("enable");
          		WA.Down();
		    },
		    error: function(data){
		    	$(".CITR").each().remove();
		    	$('#CITHead').after('<tr class="CITR"><td id="CITC0N" class="CITCN" colspan="4">'+data.error+'</td></tr>');		    
		    }
	    });
});


$("#ClrIni").button().click(function(event, ui){
	//StepUp al Spiner de As
	var rowsQ =  $("#ControlTable tr.CITR").size();
	OrdenCece = (rowsQ*2)+1;
	for (var i = 0; i < rowsQ; i++) {
		$("#CITIn"+i+"a").val(Number(0));
		$("#CITIn"+i+"b").val(Number(0));
		$("#CITC"+i+"O").html("-");
		$("#CITRQ"+i).removeClass("HLTr");
		GetIniFromName($("#CITC"+i+"N").html(),i,rowsQ);
	}
	Turnoix = 0;
	$("#ClrIni").button("disable");
	$("#CalcOrden").button("enable");
});
//Para Ordenar el Array

$("#CalcOrden").button().click(function(event, ui){
	var rowsQ =  $("#ControlTable tr.CITR").size();
	var mA = [];
	for (var i = 0; i < rowsQ; i++) {
		var mO = {};
		mO.ix = i;
		mO.val =IniArray[i]+Number($("#CITIn"+i+"a").val());
		$("#CITIn"+i+"b").val(mO.val);
		mA[i] = mO;
	}
	mA.sort(SortByVal);
	console.log(JSON.stringify(mA));
	mAOrdenado = mA;
	for (var i = 0; i < mA.length; i++) {
		var ind = mA[i].ix;
		$("#CITC"+ind+"O").html(Number(i)+1);
	}
	$("#CalcOrden").button("disable");
	$("#NextPj").button("enable");
});
$("#NextPj").button().click(function(event,ui){
	var sideS;
	var PJN;
	var TDone=1;
	var rowsQ =  $("#ControlTable tr.CITR").size();
	while(TDone == 1){
		for (var i = 0; i < rowsQ; i++) {
			if ($("#CITC"+i+"O").html().indexOf(Turnoix+1)!= -1 ) {
				SelectedRow = i;
				$("#CITRQ"+i).addClass("HLTr");
				$("#CITC"+i+"O").html("NOW")
				PJN = $("#CITC"+i+"N").html();
				TDone = 0;
			}else{
				if ($("#CITC"+i+"O").html()=="NOW") {
					$("#CITC"+i+"O").html("-");
					if ($("#LsmPJ").html().indexOf($("#CITC"+i+"N").html())!= -1) {
						sideS = "L";
						SpinDonwTempFX(sideS);
						Bleed(sideS);
					}else{
						sideS = "R";
						SpinDonwTempFX(sideS);
						Bleed(sideS);
					}
				}
				$("#CITRQ"+i).removeClass("HLTr");
			}	
		}
		if (Turnoix <= rowsQ) {
			$("#CederBtn").button("enable");
		}else{
			$("#CederBtn").button("disable");
		}
		if (TDone==0) {
			if ($("#LsmPJ").html().indexOf(PJN)!= -1) {
				$("#LsmPJ").val(PJN);
				$("#LsmPJ").selectmenu("refresh");
				//Llamar a change
				var event = {};
				event.target = {};
				event.target.id = "LsmPJ";
				SlmPJChange(event,"");
				$("#LsmPJ").selectmenu("disable");
				$("#RsmPJ").selectmenu("enable");
			}else{
				$("#RsmPJ").val(PJN);
				$("#RsmPJ").selectmenu("refresh");
				var event = {};
				event.target = {};
				event.target.id = "RsmPJ";
				SlmPJChange(event,"");
				$("#RsmPJ").selectmenu("disable");
				$("#LsmPJ").selectmenu("enable");
			}
		}
		Turnoix = Turnoix +1;
		if ((mAOrdenado.length*2)+2==Turnoix) {
			TDone = 0;
			$("#NextPj").button("disable");
			$("#ClrIni").button("enable");
			$("#LsmPJ").selectmenu("enable");
			$("#RsmPJ").selectmenu("enable");
			$("#CInAs").spinner("stepUp");
			var event = {};
			event.target = {};
			event.target.id = "CInAs";
			Sp48Stop(event,"");
		}
	}
});

$("#TestBtn").button().click(function(event,ui){
	//$("#LsmEUDM11").selectmenu("refresh").trigger("onchange");
	var event = {};
	event.target = {};
	event.target.id = "LsmEUDM11";
	SlmnuChange(event,"");
	console.log("boton");
});
$("#CederBtn").button().click(function(event,ui){
	$("#CITC"+SelectedRow+"O").html(OrdenCece);
	OrdenCece = OrdenCece -1;
});
$("#FinCombateBtn").button().click(function(event,ui){
	$.each($("#ControlTable tr.CITR"),function(i,item){
		this.remove();
	});
	$("#NextPj").button("disable");
	$("#ClrIni").button("disable");
	$("#CalcOrden").button("disable");
	$("#CederBtn").button("disable");
	$("#LoadPjs").button("enable");
	$("#LsmPJ").selectmenu("enable");
	$("#RsmPJ").selectmenu("enable");
	$("#LsmTeam").selectmenu("enable");
	$("#RsmTeam").selectmenu("enable");
	$("#FinCombateBtn").button("disable");
});
$("#LoadPjs").button("disable");
$("#ClrIni").button("disable");
$("#CalcOrden").button("disable");
$("#NextPj").button("disable");
$("#CederBtn").button("disable");
$("#FinCombateBtn").button("disable");
$("#TestBtn").button("disable");
/*--------------------------------------------------------*/

console.log("Ejecutando Controles");
//ProgressBars
