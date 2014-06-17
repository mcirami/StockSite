<?php

    require("../includes/config.php");
    
    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // if form submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            // Checks for empty inputs or wrong characters
            
            if (empty($_POST["symbol"]))
            {
                apologize("You must input a stock symbol!");
            }
            else if (empty($_POST["shares"]))
            {
                 apologize("You must the amount of shares you want to buy!");
            }
            else if (!(preg_match("/^\d+$/", $_POST["shares"])))
            {
                apologize("Invalid number of shares!");
            }
            
            // Get user's cash on hand
            $cash = query("SELECT cash FROM users WHERE id = ?",
                $_SESSION["id"]);
                
            // Look up stocks symbol to get price
            $stock = lookup($_POST["symbol"]);
            if ($stock === false)
            {
                apologize("Symbol not found");
            }
            
            if (($stock["price"] * $_POST["shares"]) > $cash[0]["cash"])
            {
                apologize("You don't have enough cash to do that!");
            }
            
            // Insert the transaction in the Portfolio table
            query("INSERT INTO Portfolio (id, symbol, shares) VALUES
                (?, ?, ?) ON DUPLICATE KEY UPDATE shares = shares + VALUES(shares)",
                $_SESSION["id"], $stock["symbol"], $_POST["shares"]);
       
            $total = money_format('%i', $cash[0]["cash"] - ($stock["price"] * $_POST["shares"]));
            
            // Update the amount of cash user has after buying stock
            query("UPDATE users SET cash = ? WHERE id = ?",
                $total ,$_SESSION["id"]);
            
            // Insert the transaction into the history table
            $insert = query("INSERT INTO history (id, transaction, datetime, symbol, shares, price) VALUES (?, 'BUY', Now(), ?, ?, ?)", 
                $_SESSION["id"], $stock["symbol"], $_POST["shares"], $stock["price"]);
            
            if ($insert === false)
            {
                apologize("Error: Wasn't able to insert transaction into history table");
            }
            
            $transaction = [
                "transaction" => "purchased"
                ];
            
            // Pass values to email receipt
            render("receipt.php", ["stock" => $stock, $_POST["shares"], "transaction" => $transaction, "name" => "Receipt"]);
            
//            redirect("/");
            
        }
        
        else
        {   
            render("buy_form.php", ["title" => "Buy"]);
        }
    
    }

?>
