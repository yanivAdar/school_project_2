<?php
	if ( isset( $_FILES['file'] ) && isset($_POST['locationClient'])) {
        $location = $_POST['locationClient'];
	    if ( 0 < $_FILES['file']['error'] ) {
	        echo json_encode(['status' => $_FILES['file']['error']]);
	    }
	    else {
	        move_uploaded_file( $_FILES['file']['tmp_name'], $location . $_FILES['file']['name'] );
	        echo ($_FILES['file']['name']);
	    }
	}
	else {
		echo "invalid";
	}

?>