<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['picture']) && isset($_POST['courses'])){
        if(!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['email'])){
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $picture = $_POST['picture'];
            $courses = $_POST['courses'];
            $newStudent = createStudent($name,$phone,$email,$picture,$courses);
        }
    }
     
    // $newLocation =  '../../Client/project-pics/profile-pictures/';
    // if(isset($_FILES['myFile'])) {
    //     move_uploaded_file($_FILES['myFile']['tmp_name'], $newLocation . $_FILES['myFile']['name']);
    // }
?>