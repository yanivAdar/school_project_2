<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['name']) && isset($_POST['des']) && isset($_POST['picture'])){
        if(!empty($_POST['name']) && !empty($_POST['des']) && !empty($_POST['picture'])){
            $name = $_POST['name'];
            $des = $_POST['des'];
            $picture = $_POST['picture'];
            $courseId = createCourse($name, $des, $picture);
        }
    }
    header('content-Type: application/json');
    echo json_encode($courseId);
?>