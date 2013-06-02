<?php
	
	require("constants.php");
	require("header.php");
	
	$locale = isset($_GET["locale"]) ? $_GET["locale"] : -1; 
	
	if($locale == -1) {
		exit("Error: No locale Specified.");
	}
	
	$file = "../data/translations/" . $locale . "/event.json";
	if(!file_exists($file)) {
		exit("Translation does not exist for locale: $locale");
	}
	
	$translation = file_get_contents($file, true);
	echo $translation;

?>