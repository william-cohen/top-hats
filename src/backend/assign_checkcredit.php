<?php
/**
	Assumptions:
		POST will contain a username, and it will return either a valid credit_card value
		from the database or null if no saved credit exists
		
**/
	//$user = 'rhys';
	$user = $_POST['username'];
	$return = null;
	
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
		//get the user and find it's id from the user table
		$con-> select_db("tophats");
		
		//find the user on the database
		$sql = "SELECT * FROM user WHERE username='$user'";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_array($result);
			$return = $row['credit_card'];
		}
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>