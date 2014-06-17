<?php

    require_once("PHPMailer/class.phpmailer.php");
    
    $email = query("SELECT email FROM users WHERE id = ?",
        $_SESSION["id"]);
    
    if ($transaction["transaction"] == 'sold')
    {
        $shares = $shares[0]["shares"];
    }
    else
    {
        $shares = $_POST["shares"];
    }
    
    $mail             = new PHPMailer();

    $mail->IsSMTP();
    $mail->Host       = "mail.smtp.gmail.com";

    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = "tls";
    $mail->Host       = "smtp.gmail.com";
    $mail->Port       = 587;
    $mail->Username   = "mcirami@gmail.com";
    $mail->Password   = xxxxxxxxx;  // didn't want to display my password here but email does go through with correct password

    $mail->SetFrom('mcirami@gmail.com');

    $mail->AddReplyTo("mcirami@gmail.com");

    $mail->Subject    = "Your Receipt";

    $mail->AltBody    = "To view the message, please use an HTML compatible email viewer!";

    $mail->MsgHTML("You just " . $transaction["transaction"] . " " . $shares .
            " shares of " . $stock["name"] . " (" . $stock["symbol"] . ") " .
            "stock " . "at $" . myround($stock["price"]) . " a share" . "." . "<br/><br/>" .
            "Your total is: $" . myround($stock["price"] * $shares) . "<br/><br/>" .
            "Thank you!");

    $address = $email[0]["email"];
    $mail->AddAddress($address, "John Doe");
     

    if ($mail->Send() == false)
    {
        die("Sorry, our attempt to email your receipt failed. Please contact support.");
    }
    else
    {
        print("Thank you! Your receipt has been emailed to you!");
    }

?>
