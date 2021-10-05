<?php
/**
	Assumptions:
		password is hashed by the front end
**/

	include('rsa.php');
	include('des.php');

	$user = $_POST['username'];
	$pass = $_POST['password']; // HEX encoded encrytped password hash
	$encryptedkey  = $_POST['rsa_deskey']; // RSA encrypted session key
  $error = null;

	$userCheck = false;
	$passCheck = false;

  // Get the private Key
  $privateKey = get_rsa_privatekey('private.pem');
  // Decrypt the session key
	$sessionKey = rsa_decryption($encryptedkey, $privateKey);

  // TEST
  $pubkey = get_rsa_publickey('public.pem');
  $testEncryption = rsa_encryption('Hello, test', $pubkey);

  // TEST 2
  $privateKey = get_rsa_privatekey('private.pem');
  $testDecryption = rsa_decryption($testEncryption, $privateKey);

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
		$return = array(
      'username' => $user,
      'userOutcome'=> $userCheck,
      'PassOutcome' => $passCheck,
		  'error' => $error,
      'privatekey' => $privateKey,
      'sessionkey' => $sessionKey,
      'cwd' => getcwd(),
      'testE' => $testEncryption,
      'testD' => $testDecryption
    );
	}
	mysqli_close($con);
	$return = json_encode($return);
	echo $return;
?>
