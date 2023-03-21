<?php

//call->from Model
abstract class ModelFunction
{
    //🚀Error Handling
    private static function ResponseError(string $message)
    {
        return array("Response" => $message, "type" => "Error", "DateTime" => date("Y-m-d H:i:s"));
    }

    //GET all Products
    public static function AllProduct(): array
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "GET") {
                return  Model::GetAll();
            } else {
                return self::ResponseError("A funkció csak GET methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }

    //GET all Contact
    public static function AllContact(): array
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "GET") {
                $id = $_GET["id"];
                return  Model::Contact($id);
            } else {

                return self::ResponseError("A funkció csak GET methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }

    //POST Add new product
    public static function AddNewProduct(): array
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $data = json_decode(file_get_contents("php://input"), true);
                Model::NewProduct($data);
                return array("status" => "ok", "Datetime" => date("Y:m:d H:i:s"));
            } else {

                return self::ResponseError("A funkció csak POST methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }

    //POST Add new contact
    public static function AddNewContact(): array
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $data = json_decode(file_get_contents("php://input"), true);
                Model::NewContact($data);
                return array("data" => $data, "status" => "ok", "Datetime" => date("Y:m:d H:i:s"));
            } else {

                return self::ResponseError("A funkció csak POST methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }

    //PUT Update status
    public static function Update(): array
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "PUT") {
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $_GET["id"];
                Model::NewStatus($data, $id);
                return array("status" => "ok", "Datetime" => date("Y:m:d H:i:s"));
            } else {
                return self::ResponseError("A funkció csak PUT methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }

    //POST send mail
    public static function SendEmail()
    {
        try {

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $data = json_decode(file_get_contents("php://input"), true);
                MailModel::SendMail($data);
                return array("status" => "ok", "Datetime" => date("Y:m:d H:i:s"));
            } else {

                return self::ResponseError("A funkció csak POST methoddal érhető el");
            }
        } catch (SQLException $th) {

            return self::ResponseError($th->getMessage());
        }
    }
}
