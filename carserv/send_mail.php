<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $ttype = $_POST["ttype"];
        $stype = $_POST["stype"];
        $explanation = $_POST["explanation"];
        
        // Set the recipient email address here
        $recipient_email = "mwamalekela@gmail.com";
        
        // Email subject
        $subject = "Someone booked a service ECUTUNER $name";
        
        // Email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Truck: $ttype\n";
        $email_content .= "Service: $stype\n";
        $email_content .= "Explanation: $explanation\n";
        
        // Send the email
        $headers = "From: $email";
        
        if (mail($recipient_email, $subject, $email_content, $headers)) {
            // the email sent successful
        } else {
            // some field might be missing
        }
    }
?>