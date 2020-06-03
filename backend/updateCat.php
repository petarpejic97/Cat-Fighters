<?php

require "../DbHandler.php";
use db\DbHandler;

session_start();

$db = new DbHandler();

$name = $_POST['name'];
$age = $_POST['age'];
$catInfo = $_POST['catInfo'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];
$id = $_SESSION["id"];
//koristi se ranije spremljeni id u sessiji te updatamo podatke uz pomoć njega
$sql = "UPDATE mma SET name= '".$name."',
        age= '".$age."',
        catinfo= '".$catInfo."',
        wins= '".$wins."',
        loss= '".$loss."'
        WHERE id='".$id."'";

$db->update($sql);
header("location:../index.php");

?>