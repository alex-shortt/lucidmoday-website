<?php

$msg = "Name: " . $_GET['name'] . "\nEmail: " . $_GET['email'] . "";
$msg = wordwrap($msg,70);
$subject = "New Mount Lucid RSVP :: " . $_GET['name'] . "";

$mail=mail("lucidmondays@gmail.com", $subject, $msg, $header);
$mail=mail("revengexstormtech@gmail.com", $subject, $msg, $header);

?>
