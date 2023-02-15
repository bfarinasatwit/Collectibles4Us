<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','collectors_test');

// get the post records
$txtName = $_POST['txtName'];
$txtEmail = $_POST['txtEmail'];
$txtPsswd = $_POST['txtPsswd'];

// database insert SQL code
$sql = "INSERT INTO `users` (`userID`, `Username`, `Email`, `Password`) VALUES (NULL, '$txtName', '$txtEmail', '$txtPsswd')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Contact Records Inserted";
}

?>