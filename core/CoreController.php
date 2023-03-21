<?php 

abstract class CoreController
{
    // This method is called to route incoming requests to the appropriate function.
    public static function Router()
    {
        // Access the global configuration variable.
        global $cfg;

        // Check if the function key is present in the query string.
        if (isset($_GET[$cfg["functionKey"]])) {

            // Sanitize the input value of the function key.
            $function = htmlspecialchars($_GET[$cfg["functionKey"]]);

            // Check if the specified method exists in the ModelFunction class.
            if (method_exists("ModelFunction", $function)) {

                $response = ModelFunction::$function();

                View::setResponse($response);
            }
        } else {
            // If the function key is not present, set an error message to be sent back to the client.
            View::SetError("Function not Found");
        }
    }
}
