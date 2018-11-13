<?php

header('Content-Type: application/json;');
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("Brazil/East");


$day_of_week = date("w");


if( $day_of_week >= 1 && $day_of_week <= 5){  // Seg a Sex

    $open = "7:00";
    $close = "23:50";
}else if ( $day_of_week === 6 ){ // Sabado
    $open = "8:00";
    $close = "21:00";
}else{ // Domingo
    $open = "9:00";
    $close = "20:50";
}

$current_time = date("H:i");

$current_time = DateTime::createFromFormat('H:i', $current_time);
$open = DateTime::createFromFormat('H:i', $open);
$close = DateTime::createFromFormat('H:i', $close);

if ($current_time > $open && $current_time < $close)
{
    $response = array(
        "date" => true
    );
}else{
    $response = array(
        "date" => false
    );
}

print_r(json_encode($response));

?>