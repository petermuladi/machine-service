<?php 
//Error Handling SQL exception
class SQLException extends Exception
{

    public function __construct(string $message, Throwable $previous)
    {
        parent::__construct($message, 1000, $previous);
    }

}