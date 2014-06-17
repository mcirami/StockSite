<?php

    require("../includes/config.php");
    
    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // if form submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            // Checks for empty selection
            if (empty($_POST["symbol"]))
            {
                apologize("You must select a stock symbol!");
            }
            
            // Look up stocks symbol to get price
            $stock = lookup($_POST["symbol"]);
            if ($stock === false)
            {
                apologize("Symbol not found");
            }
            
            // Get user's cash on hand
            $cash = query("SELECT cash FROM users WHERE id = ?",
                $_SESSION["id"]);
            
            // Get amount of shares user has of the stock selling
            $shares = query("SELECT shares FROM Portfolio WHERE id = ? AND symbol = ?",
                $_SESSION["id"], $stock["symbol"]);
            
            // Figure total amount to be credited to user
            $total = money_format('%i', $cash[0]["cash"] + ($stock["price"] * $shares[0]["shares"]));
            
            // Update user's cash on hand after sale
            query("UPDATE users SET cash = ? WHERE id = ?",
                $total, $_SESSION["id"]);
            
            // Delete stock from portfolio
            query("DELETE FROM Portfolio WHERE id = ? AND symbol = ?",
                $_SESSION["id"], $stock["symbol"]);
            
            // Insert the transaction into the history table
            $insert = query("INSERT INTO history (id, transaction, datetime, symbol, shares, price) VALUES 
                (?, 'SELL', Now(), ?, ?, ?)", 
                $_SESSION["id"], $stock["symbol"], $shares[0]["shares"], $stock["price"]);
            
            if ($insert === false)
            {
                apologize("Error: Wasn't able to insert transaction into history table");
            }
            
            $transaction = [
                "transaction" => "sold"
                ];

            // Pass values to send receipt
            render("receipt.php", ["stock" => $stock, "shares" => $shares, "transaction" => $transaction, "name" => "Receipt"]);

//            redirect("/");
            
        }
        else
        {
            $symbol = query("SELECT symbol FROM Portfolio WHERE id = ?", 
                $_SESSION["id"]);
            
            render("sell_form.php", ["symbol" => $symbol, "title" => "Sell"]);
        }
    
    }

?>
