<?php

require "../DbHandler.php";
use db\DbHandler;

$db = new DbHandler();

session_start();

$editId = $_POST['editId'];
//stvaranje sessije kako bi se mogao dohvatiti id kod updatanja, svakim ulaskom u edit session["id"] se mijenja
$_SESSION["id"] = $editId;

$sql = "SELECT * from mma WHERE id='".$editId."'";

$db->select($sql);
$result = $db->select($sql);
if($result->num_rows>0){
    $cat = $result->fetch_assoc();     
}
//prebacivanje objekta u JSON kako bi bilo lakše rukovanje podacima u frontendu
echo (json_encode($cat))
?>