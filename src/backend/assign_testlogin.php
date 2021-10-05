<?php
/**
	Assumptions:
		password is hashed by the front end
**/

	include('rsa.php');
	include('des.php');

	$user = $_POST['username'];
	$encryptedPass = $_POST['password']; // HEX encoded encrytped password hash
	$encryptedKey  = $_POST['rsa_deskey']; // RSA encrypted session key
  $error = null;

	$userCheck = false;
	$passCheck = false;
  $sessionCheck = false;

  // Get the private Key
  $privateKey = get_rsa_privatekey('private.pem');
  // Decrypt the session key
	$sessionKey = rsa_decryption($encryptedKey, $privateKey);

  // Decrypt the password with the session key
	$pass = php_des_decryption($sessionKey, $encryptedPass);
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
        // Save the session key for the user (used for checkout)
        $sql = "UPDATE user SET session_key ='$key' WHERE username='$user'";
        $result = mysqli_query($con, $sql);
        $sessionCheck = true;
			}
		}
		$return = array(
      'username' => $user,
      'userOutcome'=> $userCheck,
      'passOutcome' => $passCheck,
		  'sessionOutcome' => $sessionCheck
    );
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>
