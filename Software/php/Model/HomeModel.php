<?php
    require_once(PROJECT_ROOT_PATH . "Model/Database.php");
    class HomeModel extends Database {
        public function getAlbums($id) {
            return $this->select("SELECT * FROM albums 
                                  WHERE user_id = ?", ['i', $id]);
        }

        public function getCollectibles($id) {
            return $this->select("SELECT albums.album_id , collectibles.*  FROM albums JOIN collectibles 
                                  ON albums.album_id = collectibles.album_id 
                                  WHERE user_id = ?", ['i', $id]);
        }
    }

?>