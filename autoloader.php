<?php
// This code sets up an autoloader function for PHP classes.
//spl wait a callback function
spl_autoload_register(function($type)
{
    if(file_exists("core/$type.php"))
    {
        require_once("core/$type.php");
    }
});