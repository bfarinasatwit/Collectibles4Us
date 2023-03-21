<?php
class LoginController extends BaseController
{
    public function loginAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';

        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // only works with POST request
        if (strtoupper($requestMethod) == 'POST') {
            try {
                // opening new LoginModel() object
                // child class of Database. So on this line we are instantializing
                // Db object and connecting to the mysql db
                $loginModel = new LoginModel();

                // so we know if we got anything from the front end
                $email = '';
                $passwd = '';

                // turns string input into a json object as an associative array
                $postage = json_decode(file_get_contents('php://input'), true);

                // if not both passwd and email throw
                if (isset($postage['email']) && isset($postage['passwd'])) {
                    // otherwise assign vars
                    $email = $postage['email'];
                    $passwd = $postage['passwd'];
                } else {
                    throw new Exception("No email, or no password provided.\n");
                }

                // grab the response data from the db, which in this case is 
                // SELECT * FROM users WHERE email=email passwd=passwd
                $response_data = $loginModel->compareCredentials($email, $passwd);

                // bad login, send 200 OK with an error
                if (!$response_data) {
                    $strErrorDesc = "Incorrect login. Try again!\n";
                    $strErrorHeader = 'HTTP/1.1 200 OK';
                }
            // all server throws go here and get sent back as ISE 500
            } catch (Exception $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        // sending output
        // with errors
        if ($strErrorDesc) {
            $this->sendOutput( // sendOutput(data string, headers list array)
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
            // with correct login
        } else {
            $this->sendOutput(
                json_encode($response_data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }

    public function newUserAction()
    {
        // populated with errors, returns zero if no errors
        $strErrorDesc = '';

        // gets request method
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        if ($requestMethod == 'PUT') {
            try {
                // opening new LoginModel() object
                // child class of Database. So on this line we are instantializing
                // Db object and connecting to the mysql db
                $loginModel = new LoginModel();

                // so we know if we got anything from the front end
                $firstName = '';
                $lastName = '';
                $email = '';
                $passwd = '';

                // turns string input into a json object as an associative array
                $postage = json_decode(file_get_contents('php://input'), true);

                // if anything is missing, throw. This goes to the 500 Internal Server error
                if (isset($postage['email']) && isset($postage['passwd']) && isset($postage['firstName']) && isset($postage['lastName'])) {
                    // nothing is missing so assign and store
                    $firstName = $postage['firstName'];
                    $lastName = $postage['lastName'];
                    $email = $postage['email'];
                    $passwd = $postage['passwd'];
                } else {
                    throw new Exception("Full form not provided.\n");
                }

                // if checkexists returns the info of whoever has that email. If empty, then its a valid new user
                if ($loginModel->checkExists($email)) {
                    // but if it's not empty, then we have an error
                    $strErrorDesc = "That email is already taken. Try again!\n";
                    $strErrorHeader = 'HTTP/1.1 200 OK';
                } else {
                    // newuser inserted, then return the info of the new user
                    $response_data = $loginModel->newUser($firstName, $lastName, $email, $passwd);
                }

            } catch (Exception $e) {
                $strErrorDesc = $e->getMessage() . 'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else { // wrong method
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        if ($strErrorDesc) { // if errors
            $this->sendOutput(
                json_encode(array('error' => $strErrorDesc)),
                array('Content-Type: application/json', $strErrorHeader)
            );
        } else { // without errors
            $this->sendOutput(
                json_encode($response_data),
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        }
    }
}

?>