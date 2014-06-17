<?php    
     
     $price = myround($stock["price"]);
     
     print("A share of " . $stock["name"] . " (" . $stock["symbol"] . ") " . "costs " . "$" . $price . ".");
?>
