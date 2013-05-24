
$(document).ready(function(){
	
	$.ajax({
		type: "POST",
		url: "../Json.php?getSocietes",
		data : $(this).serialize(),
		dataType: "json",
		success: function(societe) {		
		$('#cboSocietes').empty();
			$(societe).each(function(){			
				$('#cboSocietes').append("<option value="+this.Code+">"+this.NomCommercial+"</option>");
			});
			
			
			$("#cmdCreerProjet").click(function(){
			$("#AjoutSuccess").empty();
			var txtNom = document.getElementById("txtNom").value;
			var cboSociete = document.getElementById("cboSocietes").value;
				if(txtNom == ""){
					$('#txtNom').effect("bounce",{times:2},300);
				}
				else
				{
					$.ajax({
						type: "POST",
						url: "../Json.php?CreerProjet",
						data : {nom:txtNom,societe:cboSociete},
						dataType: "html",
						success: function(collab){
							if(collab[0] == 1){
								$("#txtNom").empty();
								$("#AjoutSuccess").append("<br>Le projet '"+txtNom+"' a été ajouté à la société '"+cboSociete+"'");
							}
							else 
							{
								$("#AjoutSuccess").append("Problème d'insertion dans la base de données");
							}
						}
					});
			
				}
			
			});			
		}
		
	});
	
	//Le boutton d'ajout devient inclicable
	document.getElementById("cmdCreerProjet").disabled = true;
	document.getElementById("cmdCreerProjet").className = "";
	
});

//Fonction permettant le controle des erreurs
function ControleErreur(){
//récupération des valeurs nécessaires à la validation d'un ajout ou d'une modification
	var nom = document.getElementById("txtNom").value;
	if(nom != "")
	{
		//Le boutton redevient clicable
		document.getElementById("cmdCreerProjet").disabled = false;
		document.getElementById("cmdCreerProjet").className = "button";	
	}
	else {
		//Le boutton d'ajout devient inclicable
		document.getElementById("cmdCreerProjet").disabled = true;
		document.getElementById("cmdCreerProjet").className = "";
	}
}
//Timer : Lance la fonction précédente "ControleErreur" toutes les 0,1 secondes
setInterval(ControleErreur, 100);