<?php
/**
	Assumptions:
		password is hashed by the front end
**/

	include('rsa.php');
	include('des.php');

	$user = $_POST['username'];
	$pass = $_POST['password']; // HEX encoded encrytped password hash
	$encryptedkey  = $_POST['rsa_deskey']; // Base64 encoded RSA encrypted session key
  $error = null;

	$userCheck = false;
	$passCheck = false;

	// Get the private Key
	$privateKey = get_rsa_privatekey('./private.key');

	// Decrypt the session key
	$sessionKey = rsa_decryption(base64_decode($encryptedkey), $privateKey);

	$pass = php_des_decryption($sessionKey, $pass);

  $error = openssl_error_string();

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
		                'error' => $error, 'sessionkey' => $sessionKey, 'cwd' => getcwd());
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>
