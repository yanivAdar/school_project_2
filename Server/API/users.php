<?php
    session_start();
    require 'utilities.php';
    $resFlag = getAdmin($_SESSION['email']);
    header('content-Type: application/json');
    echo json_encode($resFlag);
?>