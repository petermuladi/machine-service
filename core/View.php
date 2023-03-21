<?php 
//View make API output
abstract class View
{
    private static array $response;

    public static function setResponse(mixed $data): void
    {
        if (is_array($data)) {

            self::$response = $data;
        }
        else {
            self::$response = array($data);
        }
    }

    //Error Handling
    public static function SetError(string $message)
    {
        self::$response = array("Error" => $message, "Datetime" => date("Y-m-d H:i:s"));
    }

    //Encode response to json and Render -> in index.php print_r(View:Render())
    public static function Render()
    {
        return json_encode((self::$response));
    }

    //set Header information  
    public static function SetHeader()
    {
        header("Content-type: application/json");
    }

}
