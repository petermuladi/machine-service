<?php

abstract class Model 
{
    // This method returns an array of all products that are either not finished or were finished today.
    public static function GetAll():array
    {
        try {
            $con = DatabaseConnect::getConnection();

            $query = "SELECT *
            FROM szervizelt_termekek
            WHERE statusz <> 'Kész' 
            OR (statusz = 'Kész' AND DATE(statusz_valtozas_datuma) = CURDATE())

            ORDER BY CASE statusz
                WHEN 'Beérkezett' THEN 1
                WHEN 'Hibafeltárás' THEN 2
                WHEN 'Alkatrész beszerzés alatt' THEN 3
                WHEN 'Javítás' THEN 4
                WHEN 'Kész' THEN 5
                ELSE 6

              END";

            $res = $con->query($query);
            $result = $res->fetch_all(MYSQLI_ASSOC);
            $res->free_result();
            return $result;
            
        } catch (Exception $th) {
            throw new SQLException("Sikertelen az összes Termék lekérdezése", $th);
        }
    }


    // This method returns an array of all contacts associated with a given product ID
    public static function Contact($id):array
    {

        try {

            $con = DatabaseConnect::getConnection();
            $res = $con->query("SELECT * FROM `contacts` WHERE `termek_id` = $id");
            $result = $res->fetch_all(MYSQLI_ASSOC);
            $res->free_result();
            return $result;

        } catch (Exception $th) {
            throw new SQLException("Sikertelen az összes Kapcsolattartó lekérdezése", $th);
        }
    }


    //This method adds a new product to the database
    public static function NewProduct(array $data)
    {
        try {

            $con = DatabaseConnect::getConnection();
            $con->query("INSERT INTO `szervizelt_termekek`
            (szeriaszam,gyarto,tipus,leadas_datuma,statusz,statusz_valtozas_datuma)
            VALUES(
            '" . $con->real_escape_string($data["szeriaszam"]) . "',
            '" . $con->real_escape_string($data["gyarto"]) . "',
            '" . $con->real_escape_string($data["tipus"]) . "',
            CURDATE(),
            'Beérkezett',
            NOW())");

        } catch (Exception $th) {
            throw new SQLException($th->getMessage(), $th);
        }
    }


    // This method adds a new contact to the database for the most recently added product
    public static function NewContact(array $data)
    {
        try {

            $con = DatabaseConnect::getConnection();
            $lastIdResult = $con->query("SELECT id FROM szervizelt_termekek ORDER BY leadas_datuma DESC LIMIT 1");
            $lastIdRow = $lastIdResult->fetch_assoc();            
            $lastId = $lastIdRow['id'];
            $con->query("INSERT INTO contacts (termek_id,nev,telefon,email)
            VALUES($lastId,'".$con->real_escape_string($data["nev"])."','".$con->real_escape_string($data["telefon"])."','".$con->real_escape_string($data["email"])."')");

        } catch (Exception $th) {
            throw new SQLException($th->getMessage(), $th);
        }
    }


    //Change status
    public static function NewStatus(array $data,$id)
    {
        try {

            $con = DatabaseConnect::getConnection();
            $con->query("
            UPDATE `szervizelt_termekek`
            SET statusz = '".$con->real_escape_string($data["statusz"])."'
            WHERE id = $id;
        ");

        } catch (Exception $th) {
            throw new SQLException($th->getMessage(), $th);
        }
    }
}