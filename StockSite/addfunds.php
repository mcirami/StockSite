<?php

    require("../includes/config.php");
    
    // make sure a user is logged in
    if(isset($_SESSION["id"]))
    {
        // if form submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            // Make sure user inputs a cash amount
            if (empty($_POST["cash"]))
            {
                apologize("You must input an amount!");
            }
            
            // Get cash value from user's table
            $cash = query("SELECT cash FROM users WHERE id = ?",
                $_SESSION["id"]);
            
            // Add cash inputed to user's cash on hand
            $totalcash = myround($cash[0]["cash"] + $_POST["cash"]);
            
            // Add the amount of cash to user table
            $update = query("UPDATE users SET cash = ? WHERE id = ?",
                $totalcash, $_SESSION["id"]);
            if ($update === false)
            {
                apologize("Cash was not able to be added");
            }
            else
            {
                redirect("/");
            } 
            
        }
        
        else
        {
            // Display add funds form page
            render("addfunds_form.php", ["title" => "Add Funds"]);
        }
        
    }
        

?>
