<?php

    // configuration
    require("../includes/config.php");

    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // if form submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            // Check for empty input
            if (empty($_POST["symbol"]))
            {
                apologize("You must input a stock symbol");
            }
            
            // Look up stock price
            $stock = lookup($_POST["symbol"]);
            if ($stock === false)
            {
                apologize("Symbol not found");
            }
            
            // Pass values to print quote page
            render("print_quote.php", ["title" => "Quote", "stock" => $stock]);
            
        }
        else
        {
            // render form
            render("quote_form.php", ["title" => "Get Quote"]);
        }
    
    }

?>
