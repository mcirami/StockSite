<?php 
    
    require("../includes/config.php");
    
    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // Get values of users transaction from history table
        $rows = query("SELECT transaction, datetime, symbol, shares, price FROM history WHERE id = ?",
            $_SESSION["id"]);
        
        
        // Put all values in 1 associative array
        $positions = [];
        if ($rows !== false)
        {
            
            foreach ($rows as $row)
            {
                $positions[] = [
                    "transaction" => $row["transaction"],
                    "datetime" => $row["datetime"],
                    "symbol" => $row["symbol"],
                    "shares" => $row["shares"],
                    "price" => myround($row["price"])
                ];
            }
            
        }
        
        // Pass values to history table page
        render("history_table.php", ["title" => "History", "positions" => $positions]);
    }

?>    
