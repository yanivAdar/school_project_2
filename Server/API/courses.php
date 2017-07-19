<?php
    session_start();
    require 'utilities.php';
    $res = getCourses();
    header('content-Type: application/json');
    echo json_encode($res);
?>