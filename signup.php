<?php
	session_start(); //starts session, duh 
	require_once 'config.php'; 
	require 'connection.php';
	$First=mysql_real_escape_string($_POST['First']); //by using mysql_real_escape_string you escape any special characters in the string
	$Last=mysql_real_escape_string($_POST['Last']); 
	$email=mysql_real_escape_string($_POST['email']);
	$pass=mysql_real_escape_string($_POST['pass']);
	$newuser = "INSERT INTO Users (First, Last, email, pass) 
	VALUES('$First','$Last', '$email', '$pass')"; 
	$mysqli->query($newuser) or die(mysqli_error($conn)); //the query is executed meaning the values from the sql variables taken from the html form are inserted into the Users table and into corresponding place
	$conn->exec($newuser); 
	//Code below creates a file directory for users
	/*$usertable = "CREATE TABLE IF NOT EXISTS " . $email . "(
	`id` int(11) NOT NULL,
  	`src` varchar(255) NOT NULL
	) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4";
	$modtable= "ALTER TABLE " . $email . "
 	ADD PRIMARY KEY (`id`);";
	$mysqli->query($usertable) or die(mysqli_error($mysqli));
	$mysqli->query($modtable) or die(mysqli_error($mysqli));
	//Directory manipulation here
	$index_file = './users/user1/index.php';
	$edit_file = './users/user1/edit.php';
	$database_file = './users/user1/database.php';
	//add these files
	$file_upload = './users/user1/file_upload.php';
	$edit_info = './users/user1/edit_info.php';
	
	$new_index = './users/' . $user . '/index.php';
	$new_edit = './users/' . $user . '/edit.php';
	$new_database = './users/' . $user . '/database.php';
	$userdir = './users/' . $user .'/';
	$useruploads = './users/' . $user .'/uploads/';
	
	$new_fileup = './users/' . $user . '/file_upload.php';
	$new_editinfo = './users/' . $user . '/edit_info.php';
	if (!mkdir($userdir, 0777, true)) {
    		die('Failed to create folders...');
    	}
    if (!mkdir($useruploads, 0777, true)) {
   		die('Failed to create folders...');
   	}
   	if (!copy($index_file, $new_index)) {
   		echo "failed to copy $index_file...\n";
	}
	if (!copy($edit_file, $new_edit)) {
    	echo "failed to copy $edit_file...\n";
	}
	if (!copy($database_file, $new_database)) {
    	echo "failed to copy $database_file...\n";
	}
	if (!copy($file_upload, $new_fileup)) {
    	echo "failed to copy $file_upload...\n";
	}
	copy($file_upload, $new_fileup);
	if (!copy($edit_info, $new_editinfo)) {
    	echo "failed to copy $edit_info...\n";
	}
	copy($edit_info, $new_editinfo);*/
	header("location: index.html"); //once signed up, brings user back to index page
	mysql_close($conn);
	?>
