$(document).ready(function(){

$("#dialog").hide();

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
			
			$('#cboSocietes').change(function(){
			$('#cboProjets').empty();
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
		
		$('#cboSocietes').change();
		}		
	});
	
//Planning
$("#cmdExcel").change(function(){

	$.ajax({
		type: "POST",
		url: "../Excel.php"
		data : $(this).serialize(),
		dataType: "json",
		success: function(collab){		
		}
	});
});


//doc.ready
});
