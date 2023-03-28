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
                    $response_data = $newAlbumModel->newAlbum(
                        $postage['album_name'],
                        $postage['collect_type'],
                        $postage['user_id']
                    );
                } else {
                    throw new Exception("Server error: not enough data sent. (album_name, collect_type, user_id)\n");
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
                $response_data,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    /**
     * This function expects an http post to be made to it
     * with keys image and image_index
     */
    public function uploadImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                // turns string input into a json object as an associative array
                $postage = json_decode(file_get_contents('php://input'), true);
                if (isset($postage['image']) && isset($postage['imageIndex']) && isset($postage['imageType'])) {
                    move_uploaded_file($postage['image'], '../media/image' . $postage['imageIndex'] . ".jpg");
                } else {
                    throw new Exception("No file was sent, or no image index or type was given.\n");
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
                json_encode(array('uploaded' => $postage['imageIndex'])),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    public function getImageAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';
        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        // brings query string params into an array
        $arrQueryStringParams = $this->getQueryStringParams();

        if (strtoupper($requestMethod) == 'GET') {
            try {
                if (isset($arrQueryStringParams['image_id'])) {
                    $image_id = $arrQueryStringParams['image_id'];
                } else {
                    throw new Exception("No image id provided.\n");
                }

                $imageData = base64_encode(file_get_contents("../media/image" . $image_id . ".jpg"));

                if (!$imageData) {
                    throw new Exception("No jpg found with id " . $image_id);
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
                json_encode(array('imageData' => $imageData)),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }
}

?>