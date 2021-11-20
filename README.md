# URL Shortener Assignment

### Problem Statement

Please create a URL shortener application that can has to do the following:

1. Accept a url from a user and return a shortened url code
2. When a request comes to the code generated in the step #1, it should redirect to the original URL.
3. It can delete previous shortened URLS

Create a web application frontend using a framework of choice which can do the following:

1. List all the URL short codes and the original URL along with their creation timestamp as a table. (Refer Fig 1)
2. The table should have a delete button to delete a record.
3. The UI should support a button to create a new URL short code. The button will open a dialog box where the user can enter the URL. (Refer Fig. 2)

Please implement a backend application server to serve the following requests

1. POST /shortener
  1. Request
    1. Body
      1. URL (String)
  2. Response
    1. Body
      1. id(Integer)
      2. url (String)
      3. short\_code (String)
      4. created\_at (Date Time)
2. GET /shortener
  1. Request
    1. Query Parameters
      1. page (Integer) -- Page to be returned
      2. per\_page (Integer) -- Number of records per page
  2. Response:
    1. Body
      1. Items:
        1. List of object with following schema
          1. id (Integer)
          2. url (String)
          3. short\_code (String)
          4. Created\_at (Date Time)
        2. page (Integer) -- The current page
        3. pages (Integer) -- Total pages
        4. per\_page (Integer) -- Number of records per page
        5. total (Integer) -- Total records
3. DELETE /shortener/\&lt;id\&gt;
  1. Request
    1. Path Parameter
      1. id (Integer) -- The id to be deleted
  2. Response:
    1. \&lt;Empty\&gt;
4. GET /\&lt;code\&gt;
  1. Request
    1. Path Parameter
      1. code (String)
  2. Response:
    1. Http Status
      1. 301
    2. Header
      1. Location: \&lt;Original URL\&gt;

### Solution

##### Frameworks:

You can solve the above problem through a MVC application using a python framework like Django or by creating a standalone ReactJs application and a separate application server using frameworks like ExpressJs or flask.

##### Databases:

Your application should interact with a relational database (preferably postgresql). The application server should interact with the database using an ORM like Django ORM or sqlalchemy or Typeorm.

##### Docker:

Please provide a Dockerfile to build docker containers of the application server. Please provide a docker-compose file to run the application locally.

Please include all your source code in a github repository with instructions to run the application locally.

### Appendix

1. Mockups

![](RackMultipart20211119-4-se9v8j_html_f99149fec1980093.png)

Figure 1: Home Page

![](RackMultipart20211119-4-se9v8j_html_30daa86cd2bdcb39.png)

Figure 2. Add New URL