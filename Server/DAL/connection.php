<?php
    require 'env.php';
    $GLOBALS['connection'] = mysqli_connect(host,username,pass,database);
    if(mysqli_connect_error()){
        die('something went wrong'.mysqli_connect_errno());
    }
    
?>