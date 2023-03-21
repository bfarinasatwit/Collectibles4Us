<?php

    class HomeController extends BaseController{
    
        #not tested yet, need to make some updates in the init.sql file or whatever it's called    
        public function formProfile($albums, $collectibles) {
            # shaping return data as empty array
            # one array item for each album
            $returndata = [];

            foreach($albums as $album) {
                # shaping the new aspect of a collectible as an array
                # one array item for each collectible
                $album['collectibles'] = [];

                # throwing all the collectible data into the album
                foreach($collectibles as $collectible) {
                    if($collectible['album_id'] == $album['album_id']) {
                        $album['collectibles'][] = $collectible;
                    }
                }
                # appending the returndata with an album
                $returndata[] = $album;
            }

            return $returndata;
        }

        public function getProfileAction() {
            // populated with errors, returns zero if no errors
            $strErrorDesc = '';

            // gets request method
            $requestMethod = $_SERVER['REQUEST_METHOD'];

            // brings query string params into an array
            $arrQueryStringParams = $this->getQueryStringParams();

            if (strtoupper($requestMethod) == 'GET') {
                try {
                    $getProfileModel = new HomeModel();

                    $id = -1;

                    if(isset($arrQueryStringParams['user_id'])) {
                       $id = $arrQueryStringParams['user_id'];
                    }

                    if($id == -1) {
                        throw new Exception("Invalid user id provided.\n");
                    }

                    $response_data = json_encode($this->formProfile($getProfileModel->getAlbums($id), 
                                                                   $getProfileModel->getCollectibles($id)));

                } catch (Exception $e) {
                    $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                }
            } else { // wrong method
                $strErrorDesc = 'Method not supported';
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
            }

            // with errors
            if($strErrorDesc) {
                $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)); 
            // with no errors
            } else {
                $this->sendOutput($response_data,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
            }
        }
    }

?>