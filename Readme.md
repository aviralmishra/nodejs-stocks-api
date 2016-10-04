# nodejs-stocks-api
RESTful APIs for stocks data. Built with Node.JS and Express. It uses Jade for templates.

It provides the services to:

1. Fetch data for a single stock or multiple stocks from Yahoo finance

## Instructions to run the application

Run the following commands to run the 'dev' build of the application:

1. git clone https://github.com/aviralmishra/nodejs-stocks-api.git
2. cd nodejs-stocks-api
3. npm install
4. gulp serve
5. Point to following location in browser: http://localhost:4000/

The page lists out all the available paths and APIs.

## Note

'src/config/config.js' file is not added to the repo as it contains sensitive information.

You will need to provide this file to get the application running. Here is the template for the file:

```
module.exports = function () {

  var API_CONFIG = {
    'HOST': '<API_HOST_NAME>',
    'PATH': '<API_PATH>',
    'HEADER_MASHAPE_KEY': '<X-Mashape-Key Header>',
    'HEADER_ACCEPT_KEY': '<Accept Header e.g. application/json>'
  };

  return API_CONFIG;
};
```
