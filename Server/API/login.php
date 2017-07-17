<?php
    session_start();
    require 'utilities.php';
    $resFlag = false;
    if(isset($_SESSION['email']) && isset($_SESSION['pass'])){
        $resFlag = ture;
    }

    if(isset($_POST['email']) && isset($_POST['pass'])){
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        // echo $email;
        if(!empty($email) && !empty($pass)){
            if(!isEmail($_POST['email'])){
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