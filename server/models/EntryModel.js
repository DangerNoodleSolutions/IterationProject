// const mongoose = require('mongoose');
// const Schema =  mongoose.Schema;


// const entrySchema = new Schema({
//   title: {type: String, required: false},
//   date: {type: Date, default: Date.now},
//   // date: {type: String, required: true},
//   category: {type: String, required: true},
//   text: {type: String, required: false}
// })

// module.exports = mongoose.model('entry', entrySchema);

const { Pool } = require('pg');

const PG_URI = 'postgres://tefomubt:cHMyP7kQmk1R0jvqWiMGIUx6REHHeUwa@castor.db.elephantsql.com/tefomubt';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
