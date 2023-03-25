<?php
    require_once(PROJECT_ROOT_PATH . "Model/Database.php");
    class HomeModel extends Database {
        /**
         * This function will get all the info for albums under a specific user_id
         */
        public function getAlbums($id) {
            return $this->select("SELECT * FROM albums 
                                  WHERE user_id = ?", ['i', $id]);
        }

        /**
         * this function will get all the info for all collectibles including album id 
         * under a specific user_id
         */
        public function getCollectibles($id) {
            return $this->select("SELECT albums.album_id , collectibles.*  FROM albums JOIN collectibles 
                                  ON albums.album_id = collectibles.album_id 
                                  WHERE user_id = ?", ['i', $id]);
        }
    }

?>