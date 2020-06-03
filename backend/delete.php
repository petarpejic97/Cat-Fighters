<?php

require "../DbHandler.php";
use db\DbHandler;
define( 'ROOTPATH', dirname(dirname(__FILE__)) . '\\' );

$db = new DbHandler();

$id = $_POST['id'];

$sql = "SELECT image FROM mma WHERE id=$id";
$result = $db->select($sql);
$imgUrl = $result->fetch_assoc()['image'];

unlink(ROOTPATH."uploads\\".$imgUrl);

$db->delete($id);

?>