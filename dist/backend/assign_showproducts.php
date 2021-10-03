<?php
/**
	Assumptions:
		The script will return an array of arrays containing each product and their details
			array[0] array[id,title, desc, price, etc]
			array[n] array[nId, nTitle, nDesc, nPrice, etc]
**/	
	$array = array();
	//connecting to the SQL database
	$serverAddress = "localhost";
	$serverUser = "root";
	$serverPass = "password";
	$con = new mysqli($serverAddress, $serverUser, $serverPass);
	
	if(mysqli_connect_errno())
	{
		$return = array('connection' => false);
	}
	else
	{
		$con-> select_db("tophats");
		$sql = "SELECT * FROM products";
		$result = mysqli_query($con, $sql);
		while($row = mysqli_fetch_array($result))
		{
			$id = $row['id'];
			$title = $row['title'];
			$desc = $row['description'];
			$price = $row['price'];
			$date = $row['date_created'];
			
			$array[] = array($id, $title, $desc, $price, $date);
		}
		$return = $array;
	}

	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?> 