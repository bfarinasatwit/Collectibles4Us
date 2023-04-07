<?php

class HomeController extends BaseController
{

    #not tested yet, need to make some updates in the init.sql file or whatever it's called    
    public function formProfile($albums, $collectibles)
    {
        # shaping return data as empty array
        # one array item for each album
        $returndata = [];

        foreach ($albums as $album) {
            # shaping the new aspect of a collectible as an array
            # one array item for each collectible
            $album['collectibles'] = [];

            # throwing all the collectible data into the album
            foreach ($collectibles as $collectible) {
                if ($collectible['album_id'] == $album['album_id']) {
                    $album['collectibles'][] = $collectible;
                }
            }
            # appending the returndata with an album
            $returndata[] = $album;
        }

        return $returndata;
    }

    public function getProfileAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';

        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // brings query string params into an array
        $arrQueryStringParams = $this->getQueryStringParams();

        // on the method being GET
        if (strtoupper($requestMethod) == 'GET') {
            try {
                // initializes the db extension homemodel 
                // which connects to mysql on initialization
                $getProfileModel = new HomeModel();

                // default value
                $id = -1;

                // if the query possesses a user_id value
                if (isset($arrQueryStringParams['user_id'])) {
                    $id = $arrQueryStringParams['user_id'];
                }

                // if not
                if ($id == -1) {
                    throw new Exception("No user id provided.\n");
                }

                // these calls grab the albums and collcetibles associated
                // with the user id
                $albums = $getProfileModel->getAlbums($id);
                $collectibles = $getProfileModel->getCollectibles($id);
                // this will turn it into the required array of all albums
                // with each collectible in each album assigned to its album
                $response_data = json_encode($this->formProfile($albums, $collectibles));

            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                $response_data,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    public function newAlbumAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $newAlbumModel = new HomeModel();
                // turns string input into a json object as an associative array
                $postage = json_decode(file_get_contents('php://input'), true);

                if (isset($postage['album_name']) && isset($postage['collect_type']) && isset($postage['user_id'])) {
                    $album_name = $postage['album_name'];
                    $collect_type = $postage['collect_type'];
                    $user_id = $postage['user_id'];
                } else {
                    throw new Exception("Server error: not enough data sent. (album_name, collect_type, user_id)\n");
                }

                $response_data = $newAlbumModel->newAlbum($album_name, $collect_type, $user_id);

            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                json_encode($response_data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }
    /** 
     * Function to delete specified album
     */
    public function deleteAlbumAction()
    {

        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        if(strtoupper($requestMethod) == 'DELETE'){
            try{
                $deleteAlbumModel = new HomeModel();
                // turns input into a json object in an associative array
                $postage = json_decode(file_get_contents('php://input'), true);
                if(isset($postage['album_id'])){
                    $album_id = $postage['album_id'];
                }else {
                    throw new Exception("Server error: not enough data sent. (album_id)\n");
                }
                $response_data = $deleteAlbumModel->removeAlbum($album_id);
            }catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        }else { // wrong method, not DELETE
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
         // with errors
         if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        }else{
            $this->sendOutput(
                json_encode($response_data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }
    /**
     * This function expects an http post to be made to it
     * with keys image and image_index
     */
    public function uploadAlbumImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];



        if (strtoupper($requestMethod) == 'POST') {
            try {
                // turns string input into a json object as an associative array
                if (isset($_FILES['image']) && isset($_POST['album_id'])) {
                    $file = $_FILES['image'];
                    $album_id = $_POST['album_id'];

                    // Check if the file is an image


                    // Move the file to the server
                    $filePath = './media/albums/image' . $album_id . '.jpg';
                    move_uploaded_file($file['tmp_name'], $filePath);
                } else {
                    throw new Exception("Internal server error. ");
                }
            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                json_encode(array('uploaded' => $album_id, 'file_path' => $filePath)),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    public function getAlbumImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        // brings query string params into an array
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                if (isset($arrQueryStringParams['album_id'])) {
                    $albumId = $arrQueryStringParams['album_id'];
                } else {
                    throw new Exception("No image id provided.\n");
                }

                $image = file_get_contents("./media/albums/image" . $albumId . ".jpg");

                if (!$image) {
                    throw new Exception("No jpg found with id " . $albumId);
                }

            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                $image,
                array('Content-Type: image/jpeg', 'HTTP/1.1 200 OK')
            );
        }
    }


    public function newCollectibleAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'PUT') {
            try {
                $newCollectibleModel = new HomeModel();
                // turns string input into a json object as an associative array
                $postage = json_decode(file_get_contents('php://input'), true);

                if (isset($postage['collectible_name']) && isset($postage['year']) && isset($postage['manufacturer']) && isset($postage['condition']) && isset($postage['grade']) && isset($postage['album_id'])) {
                    $collectible_name = $postage['collectible_name'];
                    $year = $postage['year'];
                    $manufacturer = $postage['manufacturer'];
                    $condition = $postage['condition'];
                    $grade = $postage['grade'];
                    $album_id = $postage['album_id'];
                } else {
                    throw new Exception("Server error: not enough data sent. (collectible_name, year, manufacturer, condition, grade, album_id)\n");
                }

                $response_data = $newCollectibleModel->newCollectible($collectible_name, $year, $manufacturer, $condition, $grade, $album_id);

            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                json_encode($response_data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }


    /**
     * This function expects an http post to be made to it
     * with keys image and collectible_id
     */
    public function uploadCollectibleImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];



        if (strtoupper($requestMethod) == 'POST') {
            try {
                // turns string input into a json object as an associative array
                if (isset($_FILES['image']) && isset($_POST['collectible_id'])) {
                    $file = $_FILES['image'];
                    $collectible_id = $_POST['collectible_id'];
                    // Move the file to the server
                    $filePath = './media/collectibles/image' . $collectible_id . '.jpg';
                    move_uploaded_file($file['tmp_name'], $filePath);
                } else {
                    throw new Exception("Internal server error. ");
                }
            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                json_encode(array('uploaded' => $collectible_id, 'file_path' => $filePath)),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    /**
     * gets the image for the desired collectible
     * expects one param of the id of the collectible
     */
    public function getCollectibleImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        // brings query string params into an array
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                if (isset($arrQueryStringParams['collectible_id'])) {
                    $collectible_id = $arrQueryStringParams['collectible_id'];
                } else {
                    throw new Exception("No image id provided.\n");
                }

                $image = file_get_contents("./media/collectibles/image" . $collectible_id . ".jpg");

                if (!$image) {
                    throw new Exception("No jpg found with id " . $collectible_id);
                }

            } catch (Exception $e) {
                // any caught exceptions will still be formatted to be send to an endpoint
                // this is WIP and we need to encompass more errors. Ex. Database connection error
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method, not GET
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // with errors
        if ($strErrorDesc) {
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with no errors
        } else {
            $this->sendOutput(
                $image,
                array('Content-Type: image/jpeg', 'HTTP/1.1 200 OK')
            );
        }
    }
}






?>