<?php

require "../DbHandler.php";
use db\DbHandler;
//dohvaćanje korjenske putanje projekta
define( 'ROOTPATH', dirname(dirname(__FILE__)) . '\\' );

$db = new DbHandler();

$id = $_POST['id'];

$sql = "SELECT image FROM mma WHERE id=$id";
$result = $db->select($sql);
$imgUrl = $result->fetch_assoc()['image'];
//brisanje putanje koja se sastoji od prethodno pronađenog korjena te dijela u kojem je spremljena slika
unlink(ROOTPATH."uploads\\".$imgUrl);

$db->delete($id);

?>