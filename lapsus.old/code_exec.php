<?php
	/*This code executes the connection made in connection.php and assigns each php variable to the corresponding
	HTML variable. Then it's inserted into the Users table*/
	require_once 'config.php';
	require 'connection.php';
	$fname=$_POST['First'];
	$lname=$_POST['Last'];
	$email=$_POST['email'];
	$pass=$_POST['pass'];
	$newuser = "INSERT IGNORE INTO Users (First, Last, email, pass) VALUES('$First', '$Last', '$email', '$pass')";
	$conn->exec($newuser);
	mysql_close($conn);
?>
