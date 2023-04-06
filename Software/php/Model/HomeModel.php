<?php
require_once(PROJECT_ROOT_PATH . "Model/Database.php");
class HomeModel extends Database
{
    /**
     * This function will get all the info for albums under a specific user_id
     */
    public function getAlbums($id)
    {
        return $this->select("SELECT * FROM albums 
                                  WHERE user_id = ?", ['i', $id]);
    }

    /**
     * this function will get all the info for all collectibles including album id 
     * under a specific user_id
     */
    public function getCollectibles($id)
    {
        return $this->select("SELECT albums.album_id , collectibles.*  FROM albums JOIN collectibles 
                                  ON albums.album_id = collectibles.album_id 
                                  WHERE user_id = ?", ['i', $id]);
    }

    public function checkExistingAlbum($name, $user_id) {
        return $this->select("SELECT * FROM albums WHERE album_name = ? AND user_id = ?", ['ss', $name, $user_id]);
    }

    public function newAlbum($name, $type, $user_id)
    {
        if ($this->select("SELECT * FROM albums WHERE album_name = ? AND user_id = ?", ['ss', $name, $user_id])) {
            throw new Exception("Album with this name and user already exists.\n");
        }
        $this->insert("INSERT INTO albums (album_name, collect_type, user_id) VALUES
            (?, ?, ?)", ['ssi', $name, $type, $user_id]);
            
        return $this->select("SELECT * FROM albums WHERE album_id = (SELECT MAX(album_id) FROM albums)");
    }
    public function newCollectible($collectible_name, $year_created, $manufacturer, $c_condition, $graded, $album_id){
        $this->insert("INSERT INTO collectibles (collectible_name, year_created, manufacturer, c_condition, graded, album_id) VALUES
        (?,?,?,?,?,?)", ['sssisi', $collectible_name, $year_created, $manufacturer, $c_condition, $graded, $album_id]);
        return $this->select("SELECT * FROM collectibles WHERE collectible_id = (SELECT MAX(collectible_id) FROM collectibles)");
    }
}

?>