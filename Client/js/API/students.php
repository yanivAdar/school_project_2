<?php
    session_start();
    require 'utilities.php';
    $resFlag = getStudents();
    header('content-Type: application/json');
    echo json_encode($resFlag);
?>