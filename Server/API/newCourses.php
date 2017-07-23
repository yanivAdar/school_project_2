<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['name']) && isset($_POST['des'])){
        if(!empty($_POST['name']) && !empty($_POST['des'])){
            $name = $_POST['name'];
            $des = $_POST['des'];
            // $picture = $_POST['picture'];
            $courseId = createCourse($name,$des);
        }
    }
    header('content-Type: application/json');
    echo json_encode($courseId);
?>