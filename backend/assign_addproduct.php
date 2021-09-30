<?php
/**
	Assumptions:
		product is either in POST as described or as an json object
		POST = { title, description, price, img)
		or
		array(title, description, price, img)
**/
	/** TESTING
	$title = $_POST['title'];
	$desc = $_POST['description'];
	$price = $_POST['price'];
	$img = $_POST['img'];
	$date = date('Y-m-d');
	**/
	
	/** TESTING
	$title = $array[0]
	$desc = $array[1]
	$price = $array[2]
	$img = $array[3]
	**/
	
	$title = $_POST['title'];
	$desc = $_POST['desc'];
	$price = $_POST['price'];
	$img = $_POST['img'];
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
		$con-> select_db("tophats");
		
		//check if there is already a product with that name within the database
		$sql = "select * from products where title='$title'";
		$result = mysqli_query($con, $sql);
		if(mysqli_num_rows($result) == 0)
		{
			//create product with the following information
			$sql = "INSERT INTO products(title, description, price, img, date_created) VALUES ('$title', '$desc', '$price', '$img', '$date')";
			$result = mysqli_query($con, $sql);
			
			//check if the product has been added
			$sql = "select * from products where title = '$title'";
			$result = mysqli_query($con, $sql);
			if(mysqli_num_rows($result) == 1)
			{
				$check = true;
			}
		}
		$return = array('itemAdded' => $check);
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>