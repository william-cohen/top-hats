<?php
/**
	Assumptions:
		POST will contain all 'n' cart item titles keyed by 1, 2, ... n , and creditcard if it will be saved
		Credit card is encrypted by the front end
		Orders don't need to store subtotal, and total quantity of items
		product(id int auto_iterate not null,

**/
	/**
	$array = array('test1', 'test1', 'test1');
	$user = 'rhys';
	$date = date('Y-m-d');
	$check = false;
	$outcome = false;
	**/

	$user = $_POST['username'];
	// $card = $_POST['creditcard']
	$date = date('Y-m-d');
	$check = false;
	$outcome = false;
	// $_POST["n"] => n'th cart item title

	//check if the credit card is present in $_POST
	if(isset($_POST['creditcard']) && !empty($_POST['creditcard']))
	{
		$card = $_POST['creditcard'];
		$check = true;
	}

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
			//find the ID given the user
			$row = mysqli_fetch_array($result);
			$id = $row['id'];

			//if the credit card is going to be saved to the server
			if($check)
			{
				//$sql = "SELECT * FROM user WHERE id='$id'";
				$sql = "UPDATE user SET credit_card = '$card' WHERE id='$id'";
				$result = mysqli_query($con, $sql);
			}

			//create order from user ID + date
			$sql = "INSERT INTO orders(user_id, date_created) VALUES ('$id', '$date')";
			$result = mysqli_query($con, $sql);
			$order_id = mysqli_insert_id($con);

			//create items given product id, and order id
			$x = 0;
			while (isset($_POST["$x"]))
			{
				//find product id given title
				$product_title = $_POST["$x"];
				$sql = "SELECT * FROM products where title = '$product_title'";
				$result = mysqli_query($con, $sql);
				$row = mysqli_fetch_array($result);
				$product_id = $row['id'];

				//create item given product id and order id
				$sql = "INSERT INTO item(order_id, product_id, date_created)
				VALUES ('$order_id', '$product_id', '$date')";
				$result = mysqli_query($con, $sql);

				$x = $x + 1;
			}
			$outcome = true;
		}
		$return = array('username' => $user, 'outcome' => $outcome);
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>
