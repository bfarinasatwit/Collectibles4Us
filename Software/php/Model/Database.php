<?php
class Database
{
    // this variable is the connection to mysql
    protected $connection = null;

    // constructor
    public function __construct($host = DB_HOST)
    {
        try {
            $this->connection = new mysqli($host, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);

            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * This function calls executestatement with the query
     * takes the result and returns it.
     * 
     * This is meant to be for insert queries
     */
    public function insert($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = $stmt->get_result();
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * This function calls executestatement with the query
     * takes the result and returns it.
     * 
     * This is meant to be for select queries. They are currently the
     * same, but may change to be different in the future
     */
    public function select($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * This function calls executestatement with the query 
     * takes the result and returns it
     * 
     * This is meant to be used for deleting an album
     * needs to be called after deleting all collectilbes
     * from the album because of foreign key restraints in MySQL
     * 
     */
    public function delete($query = "", $params = []){
        try {
            $stmt = $this->executeStatement($query, $params);
            $affectedRows = $stmt->affected_rows;
            $stmt->close();
            return $affectedRows;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * This function calls executestatement with the query 
     * takes the result and returns it
     * 
     * This is meant to be used for deleting all
     * of the collectibles inside a specified album
     * 
     */
    public function deleteAlbumCollectible($query = "", $params = []){
        try {
            $stmt = $this->executeStatement($query, $params);
            $stmt->close();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * This function uses the prepare and bind_param functions for mysqli
     * This ensures no code can be injected, rather than just using 
     * mysqli.query("string")
     */
    public function executeStatement($query, $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);

            if ($stmt === false) {
                throw new Exception("Unable to do prepared statement: " . $query);
            }

            if ($params) {
                // the slice of all of the array params including index 1 and higher
                $args = array_slice($params, 1);
                $stmt->bind_param($params[0], ...$args);
            }

            // executes and then returns the result.
            $stmt->execute();
            return $stmt;

        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
?>