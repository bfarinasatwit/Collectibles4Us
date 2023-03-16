<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('db', 'root', 'password','Collectbiles4US');

// get the post records

$txtFirstName = $_POST['firstname'];
$txtLastName = $_POST['lastname'];
$txtEmail = $_POST['email'];
$txtPsswd = $_POST['password'];
//hashing the password to check the database
//this was updated on 3/16/2023 to hash instead of password_hash
$hashedPsswd = hash('sha256',$txtPsswd);
// database insert SQL code
$sql = "INSERT INTO `users` ( `firstName`, `lastName`, `email`, `user_pass`) VALUES ('$txtFirstName', '$txtLastName','$txtEmail', '$hashedPsswd')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Contact Records Inserted";
}

?>