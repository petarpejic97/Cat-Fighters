<?php 

    include '../DbHandler.php';
    use db\DbHandler;
    //spremanje podataka iz forme
    $name = $_POST['name'];
    $age = $_POST['age'];
    $catInfo = $_POST['catInfo'];
    $wins = $_POST['wins'];
    $loss = $_POST['loss'];
    //označavam file u koji će se spremati slike
    $uploadDir="../uploads/";
    $uploadStatus = 1;
    echo $uploadDir;
    if(!empty($_FILES["file"]["name"])){
        $fileName = basename($_FILES["file"]["name"]);
        $targetFilePath = $uploadDir . $fileName; 
        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION); 
        $uploadedFile = $fileName;

        $allowTypes = array('pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg'); 
        //provjera odgovara li format zadanima
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
            //spremanje u tablicu pod nazivom mma
            $sql = "INSERT INTO mma (name,age,catinfo,wins,loss,image) VALUES ('".$name."','".$age."','".$catInfo."','".$wins."','".$loss."','".$fileName."')"; 

            $db->insert($sql);
            //promjena lokacije
            header("location:../index.php");

        } 

     }

    
?>
