<?php
class BaseController
{
    /** 
     * __call magic method. Default call and
     * gets called when no other method matches the method called on the object
     */
    public function __call($name, $arguments)
    {
        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));
    }
    /** 
     * Get URI elements. This will take the url: http://localhost/index.php/home?id=3
     * and return an array "/index.php/home" and will not include the query string or the host
     * then it will split it up by a delimiter "/" to return an array that looks like:
     * 
     * ["", "index.php", "home"]
     * 
     * @return array 
     */
    protected function getUriSegments()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode('/', $uri);
        return $uri;
    }

    /** all of the url after the ? is considered the query string.
     *  example: http://localhost/index.php?msg=hello&&sender=henry
     *  would result in the query string being msg=hello&&sender=henry
     *  and the $query variable where it stored the parsed result will
     *  be an array which can be expressed in JSON as 
     *  {
     *      msg: "hello"
     *      sender: "henry"
     *  }
     * @return array
     */
    protected function getQueryStringParams()
    {

        parse_str($_SERVER['QUERY_STRING'], $query);
        // query is an array that is being initialized above and returned below
        return $query;
    }
    /** 
     * Send API output. 
     * 
     * @param mixed $data 
     * @param string $httpHeader 
     */
    protected function sendOutput($data, $httpHeaders = array())
    {
        // removes cookie header, not sure why this matters
        header_remove('Set-Cookie');
        // iterates through all headers and adds them using header() to the output endpoint
        if (is_array($httpHeaders) && count($httpHeaders)) {
            foreach ($httpHeaders as $httpHeader) {
                header($httpHeader);
            }
        }
        // adds the data as text to the output endpoint
        echo $data;
        exit;
    }
}