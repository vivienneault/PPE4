<?php

//Test si l'url contient "getSocietes"
if(isset($_GET['getSocietes'])){
	//Change la valeur de l'option de configuration "soap.wsdl_cache_enabled" et lui donne la valeur 0.
	ini_set("soap.wsdl_cache_enabled","0");
	// Déclaration et instanciation d'un nouveau SoapClient visant l'adresse "http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl"
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	//Appel du web Service "GetSocietes"
	$rslt = $obj->GetSocietes();
	//Récupère les valeurs renvoyées
	$rslt = (array)$rslt;
	$tab = $rslt['GetSocietesResult']->Societe;
	header('Content-Type: application/json');
	//Enodage des résultats en Json
	echo json_encode($tab);
}

//Test si l'url contient "GetLesProjets"
if(isset($_GET['GetLesProjets'])){

	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('codeSociete' => $_POST['cboSocietes']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetLesProjets($param);
	$rslt = (array)$rslt;
	$tab = $rslt['GetLesProjetsResult']->Projet;
	header('Content-Type: application/json');
	echo json_encode($tab);
}

//Test si l'url contient "GetCollabProjet"
if(isset($_GET['GetCollabProjet'])){

	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('idProjet' => $_POST['cboProjets']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetCollabProjet($param);
	$rslt = (array)$rslt;
	$tab = $rslt['GetCollabProjetResult']->Collaborateur;
	header('Content-Type: application/json');
	echo json_encode($tab);

}

//Test si l'url contient "getFamille"
if(isset($_GET['getFamille'])){

	ini_set("soap.wsdl_cache_enabled","0");
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetLesFamilles();
	$rslt = (array)$rslt;
	$tab = $rslt['GetLesFamillesResult']->Famille;
	header('Content-Type: application/json');
	echo json_encode($tab);
}

//Test si l'url contient "getMetier"
if(isset($_GET['getMetier'])){

	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('codeFamille' => $_POST['cboFamilles']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetLesMetiers($param);
	$rslt = (array)$rslt;
	$tab = $rslt['GetLesMetiersResult']->Metier;
	header('Content-Type: application/json');
	echo json_encode($tab);
}

//Test si l'url contient "getCollabAjout"
if(isset($_GET['getCollabAjout'])){

	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('codeMetier' => $_POST['cboMetiers']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetLesCollaborateurs($param);
	$rslt = (array)$rslt;
	$tab = $rslt['GetLesCollaborateursResult']->Collaborateur;
	header('Content-Type: application/json');
	echo json_encode($tab);

}

//Test si l'url contient "CreerProjet"
if(isset($_GET['CreerProjet'])){

ini_set("soap.wsdl_cache_enabled","0");
	$param = array('unNom' => $_POST['nom'], 'unCodeSociete' => $_POST['societe']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->CreerProjet($param);
	$rslt = (array)$rslt;
	$tab = $rslt['CreerProjetResult'];
	header('Content-Type: application/json');
	echo json_encode($tab);
}

//Test si l'url contient "InsererAffectation"
if (isset($_GET['InsererAffectation'])){
	$dtpD = explode("/",$_POST['dateDeb']);
	$dtpD = $dtpD[2].'-'.$dtpD[1].'-'.$dtpD[0];
	$dtpF = explode("/",$_POST['dateFin']);
	$dtpF = $dtpF[2].'-'.$dtpF[1].'-'.$dtpF[0];
	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('matriculeCollaborateur' => $_POST['id'], 'idMetier' => $_POST['metier'], 'dateDebut' => $dtpD , 'dateFin' => $dtpF  , 'idProjet' => $_POST['idProjet']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->InsererAffectation($param);
	header('Content-Type: application/json');
}

//Test si l'url contient "GetAffectationsCollab"
if(isset($_GET['GetAffectationsCollab'])){
	ini_set("soap.wsdl_cache_enabled","0");
	$param = array('matriculeCollaborateur' => $_POST['id']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetAffectationsCollab($param);
	$rslt = (array)$rslt;
	$tab = $rslt['GetAffectationsCollabResult']->Affectation;
	header('Content-Type: application/json');
	echo json_encode($tab);

}

//Test si l'url contient "GetCollaborateursAffectesProjet"
if(isset($_GET['GetCollaborateursAffectesProjet'])){
	ini_set("soap.wsdl_cache_enabled","0");
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetCollaborateursAffectesProjet();
	$rslt = (array)$rslt;
	$tab = $rslt['GetCollaborateursAffectesProjetResult']->Collaborateur;
	header('Content-Type: application/json');
	echo json_encode($tab);

}

//Test si l'url contient "GetChefsDeProjet"
if(isset($_GET['GetChefsDeProjet'])){
	ini_set("soap.wsdl_cache_enabled","0");
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->GetChefsDeProjet();
	$rslt = (array)$rslt;
	$tab = $rslt['GetChefsDeProjetResult']->Collaborateur;
	header('Content-Type: application/json');
	echo json_encode($tab);

}

//Test si l'url contient "SupprimerAffectation"
if(isset($_GET['SupprimerAffectation'])){
	ini_set("soap.wsdl_cache_enabled","0");
	$param = array(matriculeCollaborateur=>$_POST['matricule'],idProjet=>$_POST['idProjet'],rang=>$_POST['rang']);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->SupprimerAffectation($param);
	header('Content-Type: application/json');
}

//Test si l'url contient "ModifierAffectation"
if(isset($_GET['ModifierAffectation'])){
	$dateD = substr($_POST['dateDeb'],0,4).'-'.substr($_POST['dateDeb'],4,2).'-'.substr($_POST['dateDeb'],6,2);
	$dateF = substr($_POST['dateFin'],0,4).'-'.substr($_POST['dateFin'],4,2).'-'.substr($_POST['dateFin'],6,2);
	ini_set("soap.wsdl_cache_enabled","0");
	$param = array(matriculeCollaborateur=>$_POST['matricule'],idProjet=>$_POST['idProjet'],rang=>$_POST['rang'],dateDebutModif=>$dateD,dateFinModif=>$dateF);
	$obj = new SoapClient("http://192.168.241.131/TestWs/WsGestionAffectations.asmx?wsdl");
	$rslt = $obj->ModifierAffectation($param);
	header('Content-Type: application/json');
}

?>