<?php
/**
	Assumptions:
		database only collects username, password and date and creation
			(can be reworked)
		password is hashed by the front end
**/
	$user = $_POST['username'];
	$pass = $_POST['password'];
	$date = date('Y-m-d');
	$check = false;
	
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
		$con -> select_db("tophats");
		$sql = "SELECT * FROM user WHERE username='$user'";
		$result = mysqli_query($con, $sql);

		if(mysqli_num_rows($result) == 0)
		{
			$sql = "INSERT INTO user(username, password, date_created) VALUES ('$user', '$pass', '$date')";
			$result = mysqli_query($con, $sql);
			$check = true;
		}
		$return = array('username' => $user, 'outcome' => $check);
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>