<?php
/**
	Assumptions:
		the session key will be put into post as 'session_key' and it will also contain the user
**/
	$key = $_POST['session_key'];
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
		$sql = "UPDATE user SET session_key ='$key' WHERE username='$user'";
		$result = mysqli_query($con, $sql);
		$check = true;
	}
	mysqli_close($con);
	$return = array('username' => $user, 'outcome' => $check);
	$return = json_encode($return);
	echo $return;
?>