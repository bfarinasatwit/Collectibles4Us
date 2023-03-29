<?php
    // require("./Inc/Bootstrap.php");
    
    // $loginModel = new LoginModel("localhost:3306");
    // $homeModel = new HomeModel;

    $img_id = 1;

    $imageData = base64_encode(file_get_contents("./media/image" . $img_id . ".jpg"));

    var_dump(json_encode(array('imageData' => $imageData)))
?>