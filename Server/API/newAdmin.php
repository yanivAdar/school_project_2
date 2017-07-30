<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['picture']) && isset($_POST['role']) && isset($_POST['pass']) && isset($_POST['conPass'])){
        if(!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['email']) && !empty($_POST['picture']) && !empty($_POST['role']) && !empty($_POST['pass']) && !empty($_POST['conPass'])){
            if($_POST['pass'] == $_POST['conPass'])
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $picture = $_POST['picture'];
            $role = $_POST['role'];
            $pass = md5($_POST['pass']);
            $newAdminId = createAdmin($name,$phone,$email,$picture,$role,$pass);
        }
    }
    header('content-Type: application/json');
    echo json_encode($newAdminId);
?>