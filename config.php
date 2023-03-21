<?php 
ob_start();
$cfg = array();
//database MySQL
$cfg["dbhost"]="";
$cfg["dbuser"]="";
$cfg["password"]="";
$cfg["dbname"]="";
//Mailtrap config -> sign up https://mailtrap.io/
$cfg["host"]="smtp.mailtrap.io";
$cfg["username"]="";
$cfg["pass"]="";
$cfg["port"]=0;
//Api query function key
$cfg["functionKey"] = "api";
ob_end_clean();