<?php
/**
	Assumptions:
		password is hashed by the front end
**/
	$user = $_POST['username'];
	$pass = $_POST['password'];
	$key  = $_POST['deskey'];
	$userCheck = false;
	$passCheck = false;




	$key = hex2bin($key);

	$pass = base64_decode($pass);

	$decryptedPass = openssl_decrypt($pass, 'des-ecb', $key, OPENSSL_RAW_DATA | OPENSSL_ZERO_PADDING, '');

	if ($decryptedPass === false)
	{
		$decryptedPass = openssl_error_string();
	}

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
		$sql = "SELECT * FROM user WHERE username='$user'";
		$result = mysqli_query($con, $sql);

		if(mysqli_num_rows($result) == 1)
		{
			$userCheck = true;
			$row = mysqli_fetch_array($result);
			if($row['password'] == $pass)
			{
				$passCheck = true;
			}
		}
		$return = array('username' => $user, 'userOutcome'=> $userCheck, 'PassOutcome' => $passCheck,
		                'decryptedPass' => $decryptedPass);
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>
