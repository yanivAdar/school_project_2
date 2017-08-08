<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['crs']) && isset($_POST['id'])){
            $crs = $_POST['crs'];
            $id = $_POST['id'];
            $updatedCrs = updateCouresStudentsList($crs, $id);
            print_r($updatedCrs);
    } else {
        echo 'problemo';
    }
?>