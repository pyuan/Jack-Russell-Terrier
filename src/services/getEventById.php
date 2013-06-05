<?php
	
	require("constants.php");
	require("header.php");
	
	$id = isset($_GET["id"]) ? $_GET["id"] : -1; 
	$locale = isset($_GET["locale"]) ? $_GET["locale"] : DEFAULT_LOCALE;
	if($id == -1) {
		exit("Error: no event id specified.");
	}
	
	//connect to database
	$link = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	//echo 'Connected successfully';
	mysql_select_db(DB, $link);
	
	//get event for type
	$sql = "SELECT * FROM " . TABLE_EVENTS . " WHERE id='$id'";
	$result = mysql_query($sql, $link);
	$event = array();
	while ($row = mysql_fetch_array($result)) 
	{
		$event["id"] = $row["id"];
		$event["name"] = $row["name"];
		$event["loc_name"] = $row["loc_name"];
		$event["description"] = $row["description"];
		$event["address"] = $row["address"];
		$event["phone"] = $row["phone"];
		$event["price"] = $row["price"];
		$event["schedule"] = $row["schedule"];
		$event["type"] = $row["type"];
		$event["lat"] = $row["lat"];
		$event["lng"] = $row["lng"];
	}
	
	//if any other locale selected, read from static file
	if($locale != DEFAULT_LOCALE) 
	{
		$file = "../data/translations/" . $locale . "/event.json";
		if(!file_exists($file)) {
			exit("Translation does not exist for locale: $locale");
		}
		
		$translation = file_get_contents($file, true);
		$translation = json_decode($translation);
		
		//convert json object to php array
		$translationArr = array();
		foreach($translation as $key => $value) {
        	$translationArr[$key] = $value;
       	}
		
		//merge translation json to return json
		$event = array_merge($event, $translationArr);
	}
	
	//create response json
	$response = array();
	$response["event"] = $event;
	echo json_encode($response);

?>