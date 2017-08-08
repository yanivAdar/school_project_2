<?php
    session_start();
    require 'utilities.php';
    $res = getAdmins();
    header('content-Type: application/json');
    echo json_encode($res);
?>