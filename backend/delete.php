<?php

require "../DbHandler.php";
use db\DbHandler;

$db = new DbHandler();

$id = $_POST['id'];

$db->delete($id);

?>