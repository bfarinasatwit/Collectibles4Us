<?php
    require_once(PROJECT_ROOT_PATH . "Model/Database.php");
    class HomeModel extends Database {
        public function getAlbums($id) {
            return $this->select("SELECT * FROM Albums 
                                  WHERE user_id = ?", ['i', $id]);
        }

        public function getCollectibles($id) {
            return $this->select("SELECT * FROM Albums JOIN Collectibles 
                                  ON Album.album_id = Collectibles.album_id 
                                  WHERE user_id = ?", ['i', $id]);
        }
    }

?>