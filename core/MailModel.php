<?php 
// Import the necessary PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require the PHPMailer classes
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Define an abstract class called MailModel
abstract class MailModel
{

    // This method sends an email using PHPMailer and returns a boolean indicating success
    public static function SendMail(array $data):bool
    {
        // Access the global configuration variable
        global $cfg;

        // Create a new PHPMailer object
        $mail = new PHPMailer(true);

        try {
            // Configure the SMTP settings using the global configuration settings
            $mail->isSMTP();
            $mail->Host = $cfg["host"];
            $mail->SMTPAuth = true;
            $mail->Username = $cfg["username"];
            $mail->Password = $cfg["pass"];
            $mail->SMTPSecure = 'tls';
            $mail->Port = $cfg["port"];

            // Set the sender and recipient addresses, subject, and message body
            $mail->setFrom('info@gepszerviz.hu');
            $mail->addAddress($data["address"]);
            $mail->Subject = $data["subject"];
            $mail->isHTML(true);
            $mail->Body = $data["body"];

            // Send the email and return a boolean indicating success
            return  $mail->send();

        } catch (Exception $e) {
            // If an exception is thrown, echo an error message containing the error info
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
