<?php

require "../DbHandler.php";
use db\DbHandler;

$db = new DbHandler();

$winId = $_POST['winId'];
$lossId = $_POST['lossId'];
//dohvaćaju se id-ovi pobijednika i gubitnika te se svakom od njih inkrementira vrijednost pobjeda ili poraza, ovisno o ishodu
$sql = "UPDATE mma SET wins = wins +1
        WHERE id='".$winId."'";
$db->update($sql);


$sql = "UPDATE mma SET loss = loss +1
        WHERE id='".$lossId."'";

$db->update($sql);
?>