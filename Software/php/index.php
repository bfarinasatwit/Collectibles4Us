<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request here if ya want
    exit();
}

require __DIR__ . "/Inc/Bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if (isset($uri[2]) && isset($uri[3])) {
    if ($uri[2] == 'login') {
        require_once(PROJECT_ROOT_PATH . "Controller/LoginController.php");

        $objFeedController = new LoginController();
        $strMethodName = $uri[3] . 'Action';
        $objFeedController->{$strMethodName}();
    } elseif ($uri[2] == 'home') {
        require_once(PROJECT_ROOT_PATH . "Controller/HomeController.php");

        $objFeedController = new HomeController();
        $strMethodName = $uri[3] . 'Action';
        $objFeedController->{$strMethodName}();
    } elseif ($uri[2] == 'test') {
        header('HTTP/1.1 200 OK');
        echo "sup";
    } else {
        header("HTTP/1.1 404 Not Found");
        exit();
    }
} else {
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>