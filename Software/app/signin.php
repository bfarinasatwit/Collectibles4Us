#This will be the php file that contacts the server and then validates data
<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('db', 'root', 'password', 'Collectbiles4US');

//retrieve data from webpage
$txtEmail = $_POST['email'];
$txtPsswd = $_POST['password'];
//this was updated on 3/16/2023 to hash instead of password_hash
$hashedPsswd = hash('sha256', $txtPsswd);
//query to see if matching email and password exist in db
$sql = "SELECT * FROM users WHERE email = '$txtEmail' AND user_pass = '$hashedPsswd'";
$result = mysqli_query($con, $sql);
//testers to see what the query returns and then to see all the global variable values
var_dump($result);
var_dump($GLOBALS);
//actually checking to see if result is valid or not
$check = mysqli_fetch_array($result);
//if match send okay to controller to build view
if (isset($check)) {
    //just a tester remove when building webpage
    echo 'Sucess!';
}
//else say incorrect email and password
else {
    //just a tester remove when building webpage
    echo 'Faliure';
}

?>