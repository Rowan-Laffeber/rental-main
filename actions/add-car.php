<?php
session_start();
require "database/connection.php";

        $create_account = $conn->prepare("INSERT INTO car (brand, type, color, transmission, seats, tank_capacity, price_day, in_use, user_id) VALUES (:brand, :type, :color, :transmission, :seats, :tank_capacity, :price_day, :in_use, :user_id)");
        $create_account->bindParam(":brand", $brand);
        $create_account->bindParam(":type", $type, );
        $create_account->bindParam(":color", $color);
        $create_account->bindParam(":transmission", $transmission);
        $create_account->bindParam(":seats", $seats);
        $create_account->bindParam(":tank_capacity", $tank_capacity);
        $create_account->bindParam(":price_day", $price_day);
        $create_account->bindParam(":in_use", $in_use);
        $create_account->bindParam(":user_id", $user_id);
        $create_account->execute();

        $_SESSION["success"] = "Auto tovoegen is gelukt";
        header("Location: /add-car-form");
        exit();

