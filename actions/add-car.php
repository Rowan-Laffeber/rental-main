<?php
session_start();
require "database/connection.php";

$brand = $_POST['brand'] ?? '';
$type = $_POST['type'] ?? '';
$color = $_POST['color'] ?? '';
$transmission = $_POST['transmission'] ?? '';
$seats = $_POST['seats'] ?? '';
$tank_capacity = $_POST['tank-capacity'] ?? '';
$class = $_POST['class'] ?? '';
$price_day = $_POST['price-day'] ?? '';
$in_use = $_POST['in-use'] ?? '0'; // default to 0 if not set

try {
    $create_account = $conn->prepare("INSERT INTO car (
        brand, type, color, transmission, seats, tank_capacity, class, price_day, in_use
    ) VALUES (
        :brand, :type, :color, :transmission, :seats, :tank_capacity, :class, :price_day, :in_use
    )");

    $create_account->bindParam(":brand", $brand);
    $create_account->bindParam(":type", $type);
    $create_account->bindParam(":color", $color);
    $create_account->bindParam(":transmission", $transmission);
    $create_account->bindParam(":seats", $seats);
    $create_account->bindParam(":tank_capacity", $tank_capacity);
    $create_account->bindParam(":class", $class);
    $create_account->bindParam(":price_day", $price_day);
    $create_account->bindParam(":in_use", $in_use);

    $create_account->execute();

    $_SESSION["success_car      "] = "Auto toevoegen is gelukt.";
    header("Location: /add-car-form");
    exit();

} catch (PDOException $e) {
    $_SESSION["message"] = "Fout bij toevoegen van auto: " . $e->getMessage();
    header("Location: /add-car-form");
    exit();
}