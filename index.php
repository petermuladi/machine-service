<?php
require("config.php");
require("autoloader.php");

DatabaseConnect::Connect();
CoreController::Router();
DatabaseConnect::Disconnect();
//Rest Api
View::SetHeader();
print_r(View::Render());

