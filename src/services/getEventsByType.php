<?php
	
	require("constants.php");
	require("header.php");
	
	$type = isset($_GET["type"]) ? $_GET["type"] : -1; 
	
	//connect to database
	$link = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	//echo 'Connected successfully';
	mysql_select_db(DB, $link);
	
	//get event for type
	$sql = "SELECT id, lat, lng FROM " . TABLE_EVENTS . ($type==-1 ? "" : " WHERE type='$type'");
	$result = mysql_query($sql, $link);
	$events = array();
	while ($row = mysql_fetch_array($result)) 
	{
		$event = array();
		$event["id"] = $row["id"];
		$event["lat"] = $row["lat"];
		$event["lng"] = $row["lng"];
		$events[ $event["id"] ] = $event;
	}
	
	//create response json
	$response = array();
	$response["events"] = $events;
	echo json_encode($response);

?>