<?php
/**
	Assumptions:
		The post will contain the user
**/
	$user = $_POST['username'];
	$check = false;
	
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
		$sql = "UPDATE user SET session_key = NULL WHERE username='$user'";
		$result = mysqli_query($con, $sql);
		$check = true;
	}
	mysqli_close($con);
	$return = array('username' => $user, 'outcome' => $check);
	$return = json_encode($return);
	echo $return;
?>