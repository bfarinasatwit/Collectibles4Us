<?php
require_once(PROJECT_ROOT_PATH . "Model/Database.php");

class LoginModel extends Database
{
    public function compareCredentials($email, $passwd)
    {
        return $this->select("SELECT * FROM users WHERE email = ? AND user_pass = ?", ["ss", $email, hash('sha256', $passwd)]);
    }

    public function newUser($firstName, $lastName, $email, $passwd)
    {
        // inserts then
        $this->insert("INSERT INTO users VALUES (NULL, ?, ?, ?, ?)", ["ssss", $firstName, $lastName, hash('sha256', $passwd), $email]);
        // returns their info. This may be a little inefficient when you could just not query sql
        return $this->select("SELECT * FROM users WHERE email = ? AND user_pass = ?", ["ss", $email, hash('sha256', $passwd)]);
    }

    public function checkExists($email)
    {
        return $this->select("SELECT * FROM users WHERE email = ?", ["s", $email]);
    }
}

?>