<?php
$isAdmin = false;

if (isset($_SESSION['id'])) {
    $stmt = $conn->prepare("SELECT role FROM account WHERE id = :id");
    $stmt->bindParam(":id", $_SESSION['id'], PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['role'] == 1) {
        $isAdmin = true;
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="ISO-8859-1">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Rydr</title>
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="icon" type="image/png" href="/assets/images/favicon.ico" sizes="32x32">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
</head>
<body>
<div class="topbar">
    <div class="logo">
        <a href="/">
            Rydr.
        </a>
    </div>
    <form action="/ons-aanbod" method="get">
        <input type="search" name="search" id="search" placeholder="Welke auto wilt u huren?">
        <img src="/assets/images/icons/search-normal.svg" alt="" class="search-icon">
    </form>
    <script>
        document.getElementById("search").addEventListener("keyup", myFunction);

        function myFunction() {
            const input = document.getElementById("search");
            const inputValue = input.value;
            console.log(inputValue);
        }
    </script>
    <nav id="mobilenav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/ons-aanbod">Ons aanbod</a></li>
            <li><a href="/hulp-nodig">Hulp nodig?</a></li>
            <?php if ($isAdmin): ?>
                <li><a href="/add-car-form">Admin panel</a></li>
            <?php endif; ?>
        </ul>
    </nav>

    <div class="menu">
    <button class="hamburger" onclick="toggleMobileNav()" aria-label="Toggle navigation">
        ☰
    </button>
    <script>
        function toggleMobileNav() {
            const nav = document.getElementById('mobilenav');
            nav.classList.toggle('open');
        }
    </script>
        <?php if (isset($_SESSION['id'])): ?>
            <div class="account">
                <img src="/assets/images/profil.png" alt="">
                <div class="account-dropdown">
                    <ul>
                        <li><img src="/assets/images/icons/setting.svg" alt=""><a href="/profile">Naar account</a></li>
                        <li><img src="/assets/images/icons/logout.svg" alt=""><a href="/logout">Uitloggen</a></li>
                    </ul>
                </div>
            </div>
        <?php else: ?>
            <a href="/login-form" class="button-primary" id="login">Start met huren</a>
        <?php endif; ?>
    </div>
</div>
<div class="content">
