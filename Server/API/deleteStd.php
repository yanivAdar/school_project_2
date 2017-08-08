<?php  
  session_start();
  require 'utilities.php';
  if(isset($_POST['id'])){
         $id = $_POST['id'];
         deleteStd($id);
    }
?>