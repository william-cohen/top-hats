<?php
	/**
		Assumptions:
			POST will contain the username of the user to have their items displayed
			A json object with each order will be returned in the format:
			array(
				array(orderNo)
				array(title, desc, price, img)
				...
				array(titleN, descN, priceN, imgN)
				array(orderNo2)
				array(title, desc, price, img)
				...
				array(titleM, descM, priceM, imgM)
				array(OrderNo*)
			)
	**/
	$user = $_POST['username'];
	//$user = 'rhys';
	
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
		//find the id given the username
		$sql = "SELECT id FROM user WHERE username='$user'";
		$result = mysqli_query($con, $sql);
		$array = array();
		//check for a result 
		if(mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_array($result);
			$user_id = $row['id'];
			//echo $user_id;
			//find the order ids which are associated to this user id
			$sql = "SELECT id from orders where user_id = '$user_id'";
			$result = mysqli_query($con, $sql);
			while($row = mysqli_fetch_array($result))
			{
				$order_id = $row['id'];
				
				//push order_id into the array
				$array[] = $order_id;
				//for each order id, find the associated item
				$item_sql = "SELECT product_id FROM item where order_id = '$order_id'";
				$item_result = mysqli_query($con, $item_sql);
				while($item_row = mysqli_fetch_array($item_result))
				{
					//for each item, find the product associated to it and add it to an array
					$product_id = $item_row['product_id'];
					$product_sql = "SELECT * FROM products where id = '$product_id'";
					$product_result = mysqli_query($con, $product_sql);
					while($product_row = mysqli_fetch_array($product_result))
					{
						$title = $product_row['title'];
						$desc = $product_row['description'];
						$price = $product_row['price'];
						$date = $product_row['date_created'];
					
						$temp = array($title, $desc, $price, $date);
						$array[] = $temp;
					}
				}
			}
			$return = $array;
		}
		mysqli_close($con);
		$return = json_encode($return);
		echo $return;
	}
?>