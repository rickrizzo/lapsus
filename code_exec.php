<?php
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