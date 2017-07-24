<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['picture']) && isset($_POST['courses'])){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $picture = $_POST['picture'];
        $courses = $_POST['courses'];
        $updatedStd = updateStd($id,$name,$phone,$email,$picture,$courses);
        header('content-Type: application/json');
        echo json_encode($updatedStd);
    }
?>