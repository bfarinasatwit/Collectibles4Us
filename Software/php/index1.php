<?php
    require("./Inc/Bootstrap.php");
    
    $loginModel = new LoginModel("localhost:3306");

    $first = "Henry";

    $last = "Walker";

    $email = "walkerh4@wit.edu";

    $passwd = "ad";

    $loginModel->newUser($first, $last, $email, $passwd);
    
    $response = json_encode($loginModel->compareCredentials($email, $passwd));

    echo $response;
?>