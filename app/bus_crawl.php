<?php

/**
*  Xpath: /html/body/p[3]/table/tbody/tr[2]/td/table/tbody/tr[2]/td
*         /html/body/p[3]/table/tbody/tr[2]/td/table/tbody/tr[2]/td
*/

$line= $argv[1];
$stop= $argv[2];

$url = "http://www.tmb.cat/piu/ca_ES/piuimodesoluciob.jsp";
$params=array( "linia"=> $line, "parada" => $stop );

$params= http_build_query( $params);

$query= $url.'?'.$params;
echo "Query=". $query . "\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $query); // set url to post to 
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);// allow redirects 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // return into a variable 
curl_setopt($ch, CURLOPT_TIMEOUT, 3); // times out after 4s 

$result = curl_exec($ch); // run the whole process 

curl_close($ch);  

// echo $result. "\n";


$doc = new DOMDocument();
@$doc->loadHTML( $result);

$xpath = new DOMXpath($doc);

// Get the element that is the second row of the second row of the table.
$elements = $xpath->query( '//table//tr[2]//tr[2]');

$eta= 0;
if (!is_null($elements)) {
  foreach ($elements as $element) {
    echo "<br/>[". $element->nodeName. "]";

    $nodes = $element->childNodes;
    foreach ($nodes as $node) {
      echo $node->nodeValue. "\n";
      $eta= $node->nodeValue;
    }
  }
  if( $eta == "Imminent"){
      $eta= "0 min";
  }
  $now= new DateTime;
  echo "now=".$now->format( 'Y-m-d H:i:s')."\n";
  $now->modify( $eta);
  echo "ETA=".$now->format( 'Y-m-d H:i:s')."\n";
  
}else{
    echo "vacio...\n";
}



/**
* Algorithm description:
* 1. build an http request
* 2. call the service
* 3. gather data
* 4. insert data into database
* 4.1. flavor data with current date
* 
**/
