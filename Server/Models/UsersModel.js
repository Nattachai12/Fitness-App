const { Pool } = require('pg');
console.log(`Your port is ${process.env.PG_URI}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PG_URI}`); // 8626
// const PG_URI =
//   "postgres://tcqbdxxd:vK6TGZQupL5f0ZqfjvFIbJA2oIqBaxPH@kashin.db.elephantsql.com/tcqbdxxd";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};