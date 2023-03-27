<?php
    require("./Inc/Bootstrap.php");
    
    $loginModel = new LoginModel("localhost:3306");

    $first = "Henry";

    $last = "Walker";

    $email = "random@me.com";

    $passwd = "superpass";

    var_dump($loginModel->compareCredentials($email, $passwd));
?>