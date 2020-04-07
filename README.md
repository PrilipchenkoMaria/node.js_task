# node.js_task

To run API:
 1. Add your configs for mongodb to line 9 and 10 of index.js
 2. Run index.js(for example print "node index.js" to command line in project directory)
 
To test first endpoint send POST request with users.csv file in form-data to http://localhost:3000/users/csv.
To test second endpoint send GET request to http://localhost:3000/users/csv.
To test third endpoint send GET request to http://localhost:3000/users/json.

Requirements: 
  
  It is necessary to develop a primitive API on NodeJS + Express + Mongo / Postgre / MySQL (base to choose from).

  There should be several endpoints:

  1. Download the CSV file. The file must be parsed and stored in the database
  2. Get a collection of users in json format
  3. Download the CSV file. It is necessary to serialize a collection of users from the database to a CSV file and send it.

  CSV file structure:
  The first line is UserName, FirstName, LastName, Age
  The remaining lines (example) - TheBlade, Boris, Yurinov, 47
  ... and so on

