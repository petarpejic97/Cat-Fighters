<?php

require "../DbHandler.php";
use db\DbHandler;

$db = new DbHandler();

session_start();

$editId = $_POST['editId'];
$_SESSION["id"] = $editId;

$sql = "SELECT * from mma WHERE id='".$editId."'";

$db->select($sql);
$result = $db->select($sql);
if($result->num_rows>0){
    $cat = $result->fetch_assoc();     
}

echo (json_encode($cat))
?>