<?php
    session_start();
    require 'utilities.php';
    if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['des']) && isset($_POST['picture'])) {
        if(!empty($_POST['name']) && !empty($_POST['des']) && !empty($_POST['picture'])) {
            $id = $_POST['id'];
            $name = $_POST['name'];
            $description = $_POST['des'];
            $picture = $_POST['picture'];
            $updatedCrsId = updateCrs($id,$name,$description,$picture);
            header('content-Type: application/json');
            echo json_encode($updatedCrsId);
        }
    }
    else {
        echo 'problemo';
    }
?>