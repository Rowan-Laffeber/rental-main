<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once "database/connection.php";

$select_user = $conn->prepare("SELECT * FROM account WHERE email = :email");
$select_user->bindParam(":email", $_POST['email']);
$select_user->execute();
$user = $select_user->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($_POST['password'], $user['password'])) {
    $_SESSION['id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    header('Location: /');
    exit();
} else {
    $_SESSION['error'] = 'Invalid email or password.';
    header('Location: /login-form');
    exit();
}