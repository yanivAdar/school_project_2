<?php  
  session_start();
  require 'utilities.php';
  if(isset($_POST['crs'])){
         $crs = $_POST['crs'];
         deleteCrsInStudents($crs);
    }
?>