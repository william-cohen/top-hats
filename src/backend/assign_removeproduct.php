<?php
	/** Assumptions
			POST will contain the title of an object that is to be deleted
			
	/** Testing
	$title = 'test';
	$desc = 'test';
	$price = 69;
	$img = 'test';
	$date = date('Y-m-d');
	$check = false;
	**/
	
	$title = $_POST['title'];
	$date = date('Y-m-d');
	
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
		
		//check if there is already a product with that name within the database
		$sql = "select * from products where title='$title'";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) > 0)
		{
			$sql = "delete from products where title = '$title'";
			$result = mysqli_query($con, $sql);
			
			$sql = "select * from products where title = '$title'";
			$result = mysqli_query($con, $sql);
			if(mysqli_num_rows($result) == 0)
			{
				$check = true;
			}
		}
		$return = array('itemRemoved' => $check);
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>