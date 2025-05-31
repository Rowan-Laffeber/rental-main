<?php

/**
 * Dit bestand is een héél belangrijk bestand van je applicatie.
 * Alle websitebezoeken komen eerst binnen via deze index.php.
 * Dit bestand gaat vervolgens kijken voor welke pagina de bezoeker komt.
 *
 * Stel: een bezoeker komt binnen op localhost/rental/auto-huren,
 * dan zoekt dit bestand in de 'pages'-folder het bestand auto-huren.php.
 *
 * Waarom doen we dit?
 *  - We krijgen er mooiere URL’s door (auto-huren in plaats van auto-huren.php).
 *  - We kunnen hier één keer logica schrijven voor “wat als de pagina niet bestaat”.
 *  - (Buiten het niveau van dit project) We kunnen ook hier logica toevoegen
 *    om te controleren of iemand is ingelogd, in plaats van dat per pagina te herhalen.
 *
 * Deze manier van je verzoeken afhandelen heet zogenaamd de 'front-controller pattern' en dit is daar een eenvoudige versie van.
 *
 *  Deze comment mág je verwijderen nadat je het hebt gelezen.
 */

session_start();

require "database/connection.php";

// Get the request URI and trim slashes
$requestUri = $_SERVER['REQUEST_URI'];
$path = trim(parse_url($requestUri, PHP_URL_PATH), '/');

// Handle special action routes first (logout, login, etc)
if ($path === 'logout') {
    require_once __DIR__ . '/actions/logout.php';
    exit;
}

if ($path === 'login-handler') {
    require_once __DIR__ . '/actions/login.php';
    exit;
}

if ($path === 'add-car-handler') {
    require_once __DIR__ . '/actions/add-car.php';
    exit;
}

if ($path === 'register-handler') {
    require_once __DIR__ . '/actions/register.php';
    exit;
}

// Determine which page to load
$page = $_GET['page'] ?? ($path ?: 'home');
$file = __DIR__ . '/pages/' . $page . '.php';

// Include header (make sure assets use absolute paths inside header.php)
include __DIR__ . '/includes/header.php';

// Include the page content or 404
if (file_exists($file)) {
    include $file;
} else {
    http_response_code(404);
    include __DIR__ . '/pages/404.php';
}

// Include footer
include __DIR__ . '/includes/footer.php';