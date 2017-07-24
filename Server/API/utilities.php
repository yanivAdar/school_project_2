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
    function getCourses(){
        $query = "SELECT * FROM courses";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $courses = mysqli_fetch_row($resQuery);
        $crsData = [];
        while($courses){
            $singleCrs = [];
            foreach ($courses as $key => $value) {
                array_push($singleCrs,$value);
            }
            array_push($crsData,$courses);
            $courses = mysqli_fetch_row($resQuery);
        }
        return $crsData;
    }
    function updateStd($id,$name,$phone,$email,$picture,$courses){
        $query = "UPDATE students SET std_full_name='$name',std_phone='$phone',std_email='$email',std_picture='$picture',std_courses='$courses' WHERE std_email='$id'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $query2 = "SELECT * FROM students WHERE std_full_name='$name'";
        $resquery2 = mysqli_query($GLOBALS['connection'], $query2);
        $student = mysqli_fetch_row($resquery2);
        return $student;
    }
    function updateCrs($id,$name,$des,$picture){
        $query = "UPDATE courses SET course_name='$name',course_description='$des',course_img='$picture' WHERE id='$id'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $query2 = "SELECT id FROM courses WHERE id='$id'";
        $resQuery2 = mysqli_query($GLOBALS['connection'], $query2);
        $courseId = mysqli_fetch_row($resQuery2);
        return $courseId;
    }
    function deleteStd($id){
        $query = "DELETE FROM students WHERE std_email='$id'";
        $resquery = mysqli_query($GLOBALS['connection'], $query);
    }
    function deleteCrs($id){
        $query = "DELETE FROM courses WHERE id='$id'";
        $resquery = mysqli_query($GLOBALS['connection'], $query);
    }
    function deleteCrsInStudents($crs){
        $query = "UPDATE students SET std_courses = REPLACE(std_courses, ',$crs', '') WHERE std_courses like '%,$crs%'";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);

    }
    function createStudent($name,$phone,$email,$picture,$courses){
        $query = "INSERT INTO students (std_full_name, std_phone, std_email, std_picture, std_courses) VALUES ('$name','$phone','$email','$picture','$courses')";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
    }
    function createCourse($name, $des, $picture){
        $query = "INSERT INTO courses (course_name, course_description, course_img) VALUES ('$name','$des','$picture')";
        $resQuery = mysqli_query($GLOBALS['connection'], $query);
        $query2 = "SELECT id FROM courses WHERE course_name='$name'";
        $resQuery2 = mysqli_query($GLOBALS['connection'], $query2);
        $courseId = mysqli_fetch_row($resQuery2);
        return $courseId;
    }
?>