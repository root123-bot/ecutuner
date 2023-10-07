<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    
    // Set the recipient email address here
    $recipient_email = "mwamalekela@gmail.com";
    
    // Email subject
    // $subject = "New Contact Form Submission from $name";
    
    // Email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Message: $message\n";
    
    // Send the email
    $headers = "From: $email";
    
    if (mail($recipient_email, $subject, $email_content, $headers)) {
        // email sent successful
    } else {
        // some fields might be missing
    }
}
?>
