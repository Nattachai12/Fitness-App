const { Pool } = require("pg");
console.log(process.env);
console.log(`Your port is ${process.env.PG_URI}`); // undefined
require("dotenv").config();
// console.log(process.env);
console.log(`Your port is ${process.env.PG_URI}`); // 8626


const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
