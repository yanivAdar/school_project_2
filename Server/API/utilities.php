<?php
    require '../DAL/connection.php';
     function isEmail($email){
        $query = "SELECT admin_email FROM admins";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $userMail = mysqli_fetch_row($resQuery);
        $flag = false;
        while(isset($userMail)){
            if($email === $userMail[0]){
                $flag = true;
                return $flag;
            } else {
                $userMail = mysqli_fetch_row($resQuery);
            }
        }
        return $flag;
        mysqli_free_result($resQuery);
    }
     function isPass($pass, $email){
        $query = "SELECT admin_pass FROM admins WHERE admin_email='$email'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $userPass = mysqli_fetch_row($resQuery);
        $flag = false;
        if($pass === $userPass[0]){
            $flag = true;
            return $flag;
        } 
        mysqli_free_result($resQuery);
        return $flag;
    }

    function getAdmin($email){
        $query = "SELECT * FROM admins WHERE admin_email='$email'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $admin = mysqli_fetch_row($resQuery);
        return $admin;
    }
    function getStudents(){
        $query = "SELECT * FROM students";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $students = mysqli_fetch_row($resQuery);
        $stdData = [];
        while($students){
            $singleStd = [];
            foreach ($students as $key => $value) {
                array_push($singleStd,$value);
            }
            array_push($stdData,$students);
            $students = mysqli_fetch_row($resQuery);
        }
        return $stdData;
    }
    function updateStd($id,$name,$phone,$email,$picture,$courses){
        $query = "UPDATE students SET std_full_name='$name',std_phone='$phone',std_email='$email',std_picture='$picture',std_courses='$courses' WHERE std_email='$id'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $query2 = "SELECT * FROM students WHERE std_full_name='$name'";
        $resquery2 = mysqli_query($GLOBALS['connection'], $query2);
        $student = mysqli_fetch_row($resquery2);
        return $student;
    }
    function deleteStd($id){
        $query = "DELETE FROM students WHERE std_email='$id'";
        $resquery = mysqli_query($GLOBALS['connection'], $query);
        // echo 'ok';
    }
    function createStudent($name,$phone,$email,$picture,$courses){
        $query = "INSERT INTO students (std_full_name, std_phone, std_email, std_picture, std_courses) VALUES ('$name','$phone','$email','$picture','$courses')";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
    }
?>