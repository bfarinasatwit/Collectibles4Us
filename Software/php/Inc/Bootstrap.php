<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include main configuration file 
require_once PROJECT_ROOT_PATH . "Inc/Config.php";
// include the base controller file 
require_once PROJECT_ROOT_PATH . "Controller/BaseController.php";
// include the login model file
require_once PROJECT_ROOT_PATH . "Model/LoginModel.php";
// include homemodel
require_once PROJECT_ROOT_PATH . "Model/HomeModel.php"
?>