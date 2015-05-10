<?php
  /*The following creates a connection variable with the information needed to connect. 
  This variable is used in the other php files*/
  $mysql_hostname = "localhost";
  $mysql_user = "root";
  $mysql_password = "";
  $mysql_database = "lapsus";
  $conn = mysql_connect($mysql_hostname, $mysql_user, $mysql_password) or die("Could not connect database");
  mysql_select_db($mysql_database, $conn) or die("Could not select database"); 
  $mysqli = new MySQLi($mysql_hostname, $mysql_user, $mysql_password, $mysql_database) or die(mysqli_error());
  $connpdo = new PDO('mysql:host=localhost;dbname='.$mysql_database, $mysql_user, $mysql_password);
?>
