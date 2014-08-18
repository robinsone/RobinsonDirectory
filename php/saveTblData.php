<?php
// Unescape the string values in the JSON array
$tableData = $_POST['pTableData'];

file_put_contents('Json/registry.json', $tableData);
// Decode the JSON array

//$tableData = json_decode($tableData,TRUE);

// now $tableData can be accessed like a PHP array




?>