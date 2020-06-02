<?php 

    include '../DbHandler.php';
    use db\DbHandler;

    $name = $_POST['name'];
    $age = $_POST['age'];
    $catInfo = $_POST['catInfo'];
    $wins = $_POST['wins'];
    $loss = $_POST['loss'];

    $uploadDir="../uploads/";
    $uploadStatus = 1;
    echo $uploadDir;
    if(!empty($_FILES["file"]["name"])){
        $fileName = basename($_FILES["file"]["name"]);
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
        $uploadedFile = $fileName;

        $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'); 
        
        if(in_array($fileType, $allowTypes)){ 
            if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){ 
                $uploadedFile = $fileName; 
                
            }else{ 
                $uploadStatus = 0; 
                $response['message'] = 'Sorry, there was an error uploading your file.'; 
            } 
        }else{ 
            $uploadStatus = 0; 
            $response['message'] = 'Sorry, only PDF, DOC, JPG, JPEG, & PNG files are allowed to upload.'; 
        } 
        if($uploadStatus == 1){ 
            $db= new DbHandler();

            $sql = "INSERT INTO mma (name,age,catInfo,wins,loss,image) VALUES ('".$name."','".$age."','".$catInfo."','".$wins."','".$loss."','".$fileName."')"; 

            $db->insert($sql);

            header("location:../index.php");

        } 

     }

    
?>
