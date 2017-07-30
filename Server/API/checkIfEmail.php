<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['email']) && isset($_POST['table']) && isset($_POST['pos'])){
        $email = $_POST['email'];
        $table = $_POST['table'];
        $pos = $_POST['pos'];
        $res = isEmail($email, $table, $pos);
    }
    header('content-Type: application/json');
    echo json_encode($res);
?>