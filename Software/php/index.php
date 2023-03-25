<?php
// CORS headers. These allow our server to be contacted by
// cross-origin hosts
header("Access-Control-Allow-Origin: *");
// with these methods
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
// and with this header
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Handle preflight request here if ya want
    exit();
}

// requires bootstrap to include all necessary files
require __DIR__ . "/Inc/Bootstrap.php";
// gets the uri path and turns it into
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// an array (see basecontroller.php getUriSegments())
$uri = explode('/', $uri);

/** 
 * example url : http://localhost:3300/index.php/login/login
 * then uri becomes ["", "index.php", "login", "login"]
 * in which case uri[2] is "login" and uri[3] is "login"
 */
if (isset($uri[2]) && isset($uri[3])) { // isset determines if
    if ($uri[2] == 'login') {
        // require the logincontroller
        require_once(PROJECT_ROOT_PATH . "Controller/LoginController.php");
        // instantiate it
        $objFeedController = new LoginController();
        // make login into loginAction and store it in $strMethodName
        $strMethodName = $uri[3] . 'Action';
        // call it from the controller
        $objFeedController->{$strMethodName}();
    } elseif ($uri[2] == 'home') {
        // require the homecontroller
        require_once(PROJECT_ROOT_PATH . "Controller/HomeController.php");
        // instantiate it
        $objFeedController = new HomeController();
        // example: getUser will turn into getUserAction
        $strMethodName = $uri[3] . 'Action';
        // call it
        $objFeedController->{$strMethodName}();
    } elseif ($uri[2] == 'test') { //test
        header('HTTP/1.1 200 OK');
        echo "sup";
    } else {// if no conditions are met, then 404
        header("HTTP/1.1 404 Not Found");
        exit();
    }
} else { // if the top condition is not met e.g.( isset($uri[2]) && isset($uri[3])) )
    header("HTTP/1.1 404 Not Found");
    exit();
}
?>