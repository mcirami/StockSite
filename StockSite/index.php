<?php 
    
    require("includes/config.php");
    
    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // Get user's stocks and amount of shares
        $rows = query("SELECT symbol, shares FROM Portfolio WHERE id = ?",
            $_SESSION["id"]);
        
        // Get user's cash on hand
        $cash = query("SELECT cash FROM users WHERE id = ?",
            $_SESSION["id"]);
        
        // Put values into 1 associative array
        $positions = [];
        foreach ($rows as $row)
        {
            $stock = lookup($row["symbol"]);
            if ($stock !== false)
            {
                $positions[] = [
                    "name" => $stock["name"],
                    "price" => $stock["price"],
                    "shares" => $row["shares"],
                    "symbol" => $row["symbol"]
                ];
            }
        }

        // pass values into portfolio
        render("portfolio.php", ["positions" => $positions, "cash" => $cash, "title" => "Portfolio"]);
    
    }
?>
