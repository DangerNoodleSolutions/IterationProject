const { Pool } = require('pg');

const PG_URI = 'postgres://tefomubt:cHMyP7kQmk1R0jvqWiMGIUx6REHHeUwa@castor.db.elephantsql.com/tefomubt';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});



// CREATE TABLE users(
//   uuid serial PRIMARY KEY,
//   full_name varchar (32) NOT NULL,
//   username varchar (32) NOT NULL,
//   email varchar (32) NOT NULL,
//   password varchar (255),
//   UNIQUE(username)
// );

// CREATE TABLE journals(
//   id serial PRIMARY KEY,
//   title varchar (32) NOT NULL,
//   category varchar (32) NOT NULL,
//   date DATE NOT NULL,
//   body TEXT NOT NULL,
//   user_id INT NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES users(uuid)
// );

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
