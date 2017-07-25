<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['picture']) && isset($_POST['role'])){
         if(!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['email']) && !empty($_POST['picture']) && !empty($_POST['role'])){
            $id = $_POST['id'];
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $picture = $_POST['picture'];
            $role = $_POST['role'];
            if(isset($_POST['pass']) && isset($_POST['conPass'])){
                if(!empty($_POST['pass']) && !empty($_POST['conPass'])){
                    $pass = $_POST['pass'];
                    updateAdminPass($id,$pass);
                }
            }
            $updatedAdminId = updateAdminId($id,$name,$phone,$email,$picture,$role);
            header('content-Type: application/json');
            echo json_encode($updatedAdminId);
         } else {
            echo 'values are empty';
            } 
        } else {
            echo 'values are not existing';
            }
?>