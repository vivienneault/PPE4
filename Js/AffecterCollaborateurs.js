//Quand le document est pret
$(document).ready(function(){
jQuery(function($){
		$.datepicker.regional['fr'] = {
			prevText: '<Préc', prevStatus: 'Voir le mois précédent',
			nextText: 'Suiv>', nextStatus: 'Voir le mois suivant',
			currentText: 'Courant', currentStatus: 'Voir le mois courant',
			monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
			'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
			monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
			'Jul','Aoû','Sep','Oct','Nov','Déc'],
			monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
			weekHeader: 'Sm', weekStatus: '',
			dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
			dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
			dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
			dateFormat: 'dd/mm/yy', firstDay: 0, 
			initStatus: 'Choisir la date', isRTL: false};
		$.datepicker.setDefaults($.datepicker.regional['fr']);
	});
	
	//Le boutton d'ajout devient inclicable
	document.getElementById("cmdAjoutCollab").disabled = true;
	document.getElementById("cmdAjoutCollab").className = "";

	//Le boutton de modification devient inclicable
	document.getElementById("cmdModifAffectation").disabled = true;
	document.getElementById("cmdModifAffectation").className = "";
	
//Au focus sur le controle de choix des dates de début et de fin, on ouvre un datepicker Jquery
	$("#dtpD").focus(function() {
	$("#dtpD").datepicker();
		$("#dtpD").datepicker('show');
	});
	$("#dtpF").focus(function() {
	$( "#dtpF" ).datepicker();
		$( "#dtpF" ).datepicker('show');
	});

//Appel ajax -> fichier Json.php / Methode getSocietes
	$.ajax({
		type: "POST",
		url: "../Json.php?getSocietes",
		dataType: "json",
		success: function(societe) {
		$('#cboSocietes').empty();
			$(societe).each(function(){	
				$('#cboSocietes').append("<option value="+this.Code+">"+this.NomCommercial+"</option>");
			});
			
		//Au changement de choix dans la liste déroulante des sociétés
		$('#cboSocietes').change(function(){
			//On cache la liste déroulante des projets et des collaborateurs du projet
			$('#cboProjets').empty();
			$('#cboCollabs').empty();
			//Appel ajax -> fichier Json.php / Méthode getLesProjets
			$.ajax({
				type: "POST",
				url: "../Json.php?GetLesProjets",
				data : $(this).serialize(),
				dataType: "json",
				success: function(projet) {
				$(projet).each(function(){
						$("#cboProjets").append("<option value='"+this.Id+"'>"+this.Nom+"</option>");
					});
			}
		});		
		});
		//Appel de l'evenement change() de la liste déroulante des sociétés
		$('#cboSocietes').change();
		}
		
	});
	//Au changement de choix dans la liste déroulante de projets
	$('#cboProjets').change(function(){
			//On cache les liste déroulantes des collaborateurs
			$('#cboCollabs').empty();
			//Appel ajax -> fichier Json.php / Méthode : GetCollabProjet
			$.ajax({
			type: "POST",
			url: "../Json.php?GetCollabProjet",
			data : $(this).serialize(),
			dataType: "json",
			success: function(collab){
				$(collab).each(function(){
					$("#cboCollabs").append("<option value='"+this.Matricule+"'>"+this.Nom+" - "+this.Prenom+"</option>");
				});
			}
		});

	});
	
	//Appel ajax -> Fichier Json.php / Méthode : GetFamille
	$.ajax({
		type: "POST",
		url: "../Json.php?getFamille",
		dataType: "json",
		success: function(famille) {
		$('#cboFamilles').empty();
			$(famille).each(function(){			
				$('#cboFamilles').append("<option value="+this.Id+">"+this.Libelle+"</option>");
			});
			
			//Au changement de choix dans la liste déroulante des familles
			$('#cboFamilles').change(function(){
			//On cache la liste déroulantes des métiers et des collaborateurs de ce métier
			$('#cboMetiers').empty();
			$('#cboCollabsAjout').empty();
			//Appel ajax -> fichier Json.php / Méthode GetMetier
			$.ajax({
				type: "POST",
				url: "../Json.php?getMetier",
				data : $(this).serialize(),
				dataType: "json",
				success: function(metier) {
				$(metier).each(function(){
						$("#cboMetiers").append("<option value='"+this.Id+"'>"+this.Libelle+"</option>");
					});
			}
		});
		
		});
		//Appel de l'evenement change() de la liste déroulante des familles
		$('#cboFamilles').change();
		}
	});	
	//Au changement de choix dans liste déroulante des métiers
	$('#cboMetiers').change(function(){
	//On cache la liste déroulante des collaborateurs du métier
		$('#cboCollabsAjout').empty();
		//Appel ajax -> fichier Json.php / Méthode GetCollabAjout
		$.ajax({
			type: "POST",
			url: "../Json.php?getCollabAjout",
			data : $(this).serialize(),
			dataType: "json",
			success: function(collab){
				$(collab).each(function(){
					$("#cboCollabsAjout").append("<option value='"+this.Matricule+"'>"+this.Nom+" - "+this.Prenom+"</option>");
				});
			}
		});
	});
});	

//Fonction permettant le controle des erreurs
function ControleErreur(){
//récupération des valeurs nécessaires à la validation d'un ajout ou d'une modification
	var lst = document.getElementById("cboCollabsAjout").value;
	var lstCollab = document.getElementById("cboCollabs").value;
	var dtpF = document.getElementById("dtpF").value;
	var dtpD = document.getElementById("dtpD").value;
	var projet = document.getElementById("cboProjets").value;
	
	var dF = dtpF.split('/');
	var dD = dtpD.split('/');
	var dFin = dF[2]+''+dF[1]+''+dF[0];
	var dDeb = dD[2]+''+dD[1]+''+dD[0];
	
	if(lst != "" && dtpD != "" && dtpF != "" && projet != "")
	{
	//Le boutton redevient clicable
		document.getElementById("cmdAjoutCollab").disabled = false;
		document.getElementById("cmdAjoutCollab").className = "button";	
	}else{
		document.getElementById("cmdAjoutCollab").disabled = true;
		document.getElementById("cmdAjoutCollab").className = "";	
	}
	 if(dDeb > dFin){
		document.getElementById("cmdAjoutCollab").disabled = true;
		document.getElementById("cmdAjoutCollab").className = "";	
	 }
	
	if(lstCollab != ""){
	//Le boutton redevient clicable
		document.getElementById("cmdModifAffectation").disabled = false;
		document.getElementById("cmdModifAffectation").className = "button";	
	}
}
//Timer : Lance la fonction précédente "ControleErreur" toutes les 0,1 secondes
setInterval(ControleErreur, 100);


//Fonction permettant l'affectation d'un collaborateur
function AffecterCollab()
{
	//Déclaration et instanciation des variables permettant l'insertion
	var lst = document.getElementById("cboCollabsAjout").value;
	var dtpF = document.getElementById("dtpF").value;
	var dtpD = document.getElementById("dtpD").value;
	var projet = document.getElementById("cboProjets").value;
	var metier = document.getElementById("cboMetiers").value;
	
	//Appel ajax -> fichier Json.php / Méthode InsererAffectation
		$.ajax({
			type: "POST",
			url: "../Json.php?InsererAffectation",
			//Passage des parametres
			data:{id:lst,metier:metier,dateFin:dtpF,dateDeb:dtpD,idProjet:projet},
			success:function(j){
				//Appel de l'evenement change() de la liste déroulante des projets
				$("#cboProjets").change();				
			}
		});
		
}


//Fonction permettant l'affichage du popup permettant de modifier ou supprimer une affectation
function Update(){
// Déclaration et instanciation des variables nécessaires
	var lstCollab = document.getElementById("cboCollabs").value;
	// var collabNom = $("#cboCollabs").options[0].value;
	var collabNom = document.getElementById("cboCollabs").options[document.getElementById("cboCollabs").selectedIndex].text;
	var projet = document.getElementById("cboProjets").value;
	
	//Appel ajax -> fichier Json.php / Méthode GetAffectationCollab
		$.ajax({
			type: "POST",
			url: "../Json.php?GetAffectationsCollab",
			data : {id:lstCollab},
			dataType: "json",
			success: function(affectation){
			$("#modifAffectation").empty();
			$("#modifAffectation").append("<h4>Affectation du collaborateur : "+collabNom+"</h4>");
			//Parcour les affectations renvoyés par le webservice
				$(affectation).each(function(){
				if(this.LeProjet.Id == projet){
				 var datedebut = this.DateDebut.split('T')[0];
				var datedeb = datedebut.split('-');
				 datedeb = datedeb[2]+"/"+datedeb[1]+"/"+datedeb[0];
				  var datefin = this.DateFin.split('T')[0];
				var datef = datefin.split('-');
				 datef = datef[2]+"/"+datef[1]+"/"+datef[0];
					//Création du popup Jquery
					$("#modifAffectation").append("<ul><li><p>Projet : "+this.LeProjet.Nom+"</p>");
					$("#modifAffectation").append("<p>Métier : "+this.LeMetier.Libelle+"</p>");
					$("#modifAffectation").append("<p id='erreur' style='display:table-cell;'>Date de début : <input type='text' onclick='dtpD()' size='10' id='dtpDebModif' value='"+datedeb+"'/><p id='divErreur' style='color:red;font-size:12px;display:table-cell;'>La date de fin est antérieur à la date de début</p></p>");
					$("#modifAffectation").append("<p>Date de fin : <input type='text' onclick='dtpF()' size='10' id='dtpFinModif' value='"+datef+"'/></p></ul>");
					$("#modifAffectation").append("<input type='button' value='Modifier' id='cmdModifier' onclick='ModifAffectation("+this.MatriculeCollaborateur+","+this.IdProjet+","+this.Rang+")'/>");
					$("#modifAffectation").append("<input type='button' value='Supprimer 'id='cmdModifier' onclick='SupAffectation("+this.MatriculeCollaborateur+","+this.IdProjet+","+this.Rang+")'/>");
					$("#divErreur").hide();
				}
				});
				//affichage du popup de modification / Suppression
				$("#modifAffectation").dialog({height:400,width:800});
			}
		});
}

//Fonction permettant la modification d'une affectation
function ModifAffectation(matricule,projet,rang){
 //Test si le fonction du controle d'erreur renvoi une erreur ou non
 if(ControleDateModif() == 1){
	//focus sur le datepicker
	$("#dtpDebModif").focus();
 }else{
 //récupération des valeurs des datepickers
	var dateFF = document.getElementById('dtpFinModif').value;
	dateFF = dateFF.split('/');
	dateFF = dateFF[2]+dateFF[1]+dateFF[0];
	var dateD = document.getElementById('dtpDebModif').value;
	dateD = dateD.split('/');
	dateD = dateD[2]+dateD[1]+dateD[0];
 //Appel ajax -> fichier Json.php / Méthode ModifierAffectation
	$.ajax({
			type: "POST",
			url: "../Json.php?ModifierAffectation",
			//Passage de parametres
			data : {matricule:matricule,idProjet:projet,rang:rang,dateDeb:dateD,dateFin:dateFF},
			dataType: "json",
			success: function(s){
				$("#cboProjets").change();
				//Fermeture automatique du popup
				$("#modifAffectation").dialog("close");
			}
		});
	}
}

//Fonction controlant les erreurs sur les datepicker du popup
function ControleDateModif()
{	
	//récupération des valeurs des datepickers
	var dateFF = document.getElementById('dtpFinModif').value;
	dateFF = dateFF.split('/');
	dateFF = dateFF[2]+dateFF[1]+dateFF[0];
	var dateD = document.getElementById('dtpDebModif').value;
	dateD = dateD.split('/');
	dateD = dateD[2]+dateD[1]+dateD[0];
	//variable qui sera renvoyé, valeur à 1 -> Erreur 
	var bool = 0;
	//Condition : si la date de fin est antérieur à la date de début
	if(dateFF < dateD){
		//On affiche la div d'erreur
		$("#divErreur").show();		
		bool = 1;
	} else 
	{
		//On cache la div d'erreur
		$("#divErreur").hide();
		bool = 0;
	}
	//retourne la variable bool
	return bool;
}
//Timer exécutant la fonction "ControleDateModif" toutes les 0,1 secondes
setInterval(ControleDateModif, 100);


//Fonction permettant la suppression d'une affectation
function SupAffectation(matricule,projet,rang){
//Appel ajax -> fichier Json.php / Méthode SupprimerAffectation
	$.ajax({
			type: "POST",
			url: "../Json.php?SupprimerAffectation",
			//Passage de paramètres
			data : {matricule:matricule,idProjet:projet,rang:rang},
			dataType: "json",
			success: function(s){
				$("#cboProjets").change();
				$("#modifAffectation").dialog("close");
			}
		});
}

//Fonctions permettant d'afficher les conroles Jquery de type datepicker
function dtpD(){
	$( "#dtpDebModif" ).datepicker();
	$( "#dtpDebModif" ).datepicker('show');
}
function dtpF(){
	$( "#dtpFinModif" ).datepicker();
	$( "#dtpFinModif" ).datepicker('show');
}

