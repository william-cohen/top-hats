<?php
/**
	Assumptions:
		password is hashed by the front end
**/
	$user = 'david';//$_POST['username'];
	$pass = '{"ct":"/e04zdU48o86WzcDreBd9+3/6sO006bZHpi2GmZX9Y8…abea5da24add3d1c9c6f8700","s":"83b5e61db5ed545c"}';//$_POST['password'];
	$key  = '12345678';//$_POST['deskey'];
	$userCheck = false;
	$passCheck = false;

/**
* Decrypt data from a CryptoJS json encoding string
*
* @param mixed $passphrase
* @param mixed $jsonString
* @return mixed
*/
function cryptoJsAesDecrypt($passphrase, $jsonString){
    $jsondata = json_decode($jsonString, true);
    $salt = hex2bin($jsondata["s"]);
    $ct = base64_decode($jsondata["ct"]);
    $iv  = hex2bin($jsondata["iv"]);
    $concatedPassphrase = $passphrase.$salt;
    $md5 = array();
    $md5[0] = md5($concatedPassphrase, true);
    $result = $md5[0];
    for ($i = 1; $i < 3; $i++) {
        $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
        $result .= $md5[$i];
    }
    $key = substr($result, 0, 32);
    echo "KEY: ".$key."\n";
    echo "CT: ".$ct."\n";
    $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
    echo "DATA: ".$data."\n";
    echo openssl_error_string();
    return json_decode($data, true);
}

/**
* Encrypt value to a cryptojs compatiable json encoding string
*
* @param mixed $passphrase
* @param mixed $value
* @return string
*/
function cryptoJsAesEncrypt($passphrase, $value){
    $salt = openssl_random_pseudo_bytes(8);
    $salted = '';
    $dx = '';
    while (strlen($salted) < 48) {
        $dx = md5($dx.$passphrase.$salt, true);
        $salted .= $dx;
    }
    $key = substr($salted, 0, 32);
    $iv  = substr($salted, 32,16);
    $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
    $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
    return json_encode($data);
}

	$decrypted = cryptoJsAesDecrypt("12345678", '{"ct":"4lFp83+24KwsQ09/Sr2EJ5qobICyTzK7pERHbkCtYBo…c61c03b23aa254acf97004bb","s":"3a9f30c9e63fa97b"}');

	echo "\n\nout:\n";
	echo $decrypted;
	echo "endout\n";


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
