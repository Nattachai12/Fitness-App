const { Pool } = require('pg');

const PG_URI =
  "postgres://tcqbdxxd:vK6TGZQupL5f0ZqfjvFIbJA2oIqBaxPH@kashin.db.elephantsql.com/tcqbdxxd";

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};