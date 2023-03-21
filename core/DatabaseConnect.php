<?php

// Define an abstract class called DatabaseConnect
abstract class DatabaseConnect
{
    private static mysqli $connection;

    public static function getConnection(): mysqli
    {
        return self::$connection;
    }

    // This method establishes a connection to the database
    public static function Connect()
    {
        global $cfg;

        $driver = new mysqli_driver();
        $driver->report_mode = MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT;

        try {
            self::$connection = new mysqli($cfg["dbhost"], $cfg["dbuser"], $cfg["password"], $cfg["dbname"]);
        } catch (Exception $th) {

            throw new SQLException("Sikertelen csatlakozás az adatbázissal", $th);
        }
    }

    // This method closes the database connection
    public static function Disconnect()
    {
        try {
            // Close the database connection
            self::$connection->close();
        } catch (Exception $th) {

            throw new SQLException("Sikertelen kapcsolatbontás az adatbázissal", $th);
        }
    }
}
