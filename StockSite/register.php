<?php

    // configuration
    require("../includes/config.php");
    
    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // Check for empty inputs
        
        if (empty($_POST["username"]))
        {
            apologize("You must create a username.");
        }
        else if (empty($_POST["email"]))
        {
            apologize("You must enter an email address");
        }
        else if (empty($_POST["password"]))
        {
            apologize("You must create a password.");
        }
        else if (empty($_POST["confirmation"]))
        {
            apologize("You must confirm your password.");
        }
        else if($_POST["password"] != $_POST["confirmation"])
        {
            apologize("Your passwords do not match!");
        }
        
        // Get all usernames from users table where input matches username
        $result = query("SELECT * FROM users WHERE username = ?", $_POST["username"]);
        
        // Check if username already exists
        if(count($result) > 0)
        {
            apologize("Username already in use!");
        }
        
        // Insert new user into user table
        $insert = query("INSERT INTO users (username, email, hash, cash) VALUES (?, ?, ?, 10000.00)", 
        $_POST["username"], $_POST["email"], crypt($_POST["password"]));
        
        if ($insert === false)
        {
            apologize("Error: Account wasn't able to be created");
        }
        
        // Login user by setting session id
        $rows = query("SELECT LAST_INSERT_ID() AS id");
        $id = $rows[0]["id"];
        $_SESSION["id"] = $id;
        redirect("/");
        
    }
    else
    {
        // else render form
        render("register_form.php", ["title" => "Register"]);
    }

?>
