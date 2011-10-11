<?php

$now= new DateTime;
echo $now->format( 'Y-m-d H:i:s'). "\n";

$now->modify( "10 min");

echo $now->format( 'Y-m-d H:i:s'). "\n";


