//Inicializacion de Controles



//$("#LsmTeam").selectmenu({change:SlmTeamChange});
//$("#RsmTeam").selectmenu({change:SlmTeamChange});

$("#LsmPJ").selectmenu();
$("#RsmPJ").selectmenu();

$("#Lselectmenu1").selectmenu();
$("#Rselectmenu1").selectmenu();

$("#LsmSimIni").selectmenu({change:SlmSimIniChange});
$("#RsmSimIni").selectmenu({change:SlmSimIniChange});

$("#LGuardar").button().click(SavePJ);
$("#RGuardar").button().click(SavePJ);

$("#LBorrar").click(DeleteConfirmation);
$("#RBorrar").click(DeleteConfirmation);

//Faltan los Source
$( "#LInDDTeam" ).autocomplete({change:DDTeamChange});
$( "#RInDDTeam" ).autocomplete({change:DDTeamChange});

$( "#LInDDNombreJug" ).autocomplete({change:DDNombreJug});
$( "#RInDDNombreJug" ).autocomplete({change:DDNombreJug});

$("#Fill").button().click(FIllWithRandomData);
$("#RFill").button().click(FIllWithRandomData);

$("#LTeNONotes").change(NONoteChange);
$("#RTeNONotes").change(NONoteChange);

$( "#Ltabs" ).tabs();
$( "#Rtabs" ).tabs();

$( "#LpgHP" ).progressbar({	change: HPRPrgBarChange});
$( "#RpgHP" ).progressbar({	change: HPRPrgBarChange});
/*Columna Central*/





