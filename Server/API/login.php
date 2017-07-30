<?php
    session_start();
    require 'utilities.php';
    $resFlag = false;
    if(isset($_SESSION['email']) && isset($_SESSION['pass'])){
        $resFlag = ture;
    }

    if(isset($_POST['email']) && isset($_POST['pass']) && isset($_POST['table'])){
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $table = $_POST['table'];
        $pos = 'admin_email';
        if(!empty($email) && !empty($pass) && !empty($table)){
            if(!isEmail($email,$table,$pos)){
                $resFlag = 'email not found';
            }
            else {
                if(!isPass($pass,$email)){
                    $resFlag = 'password incorrect';
                }    
                else {
                $_SESSION['email'] = $email;
                $_SESSION['pass'] = $pass;
                $resFlag = true;
                }
            }
        } else {
            $resFlag = 'Please fill both E-mail and Password';
        }
    }
    header('content-Type: application/json');
    echo json_encode($resFlag);
    // require '../DAL/disconnect.php';
// ?>