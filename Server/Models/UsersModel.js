const { Pool } = require("pg");
// const path = require("path");
// console.log(process.env);
// console.log(`Your port is ${process.env.PG_URI}`); // undefined
// console.log(__dirname);
// require("dotenv").config();
// // console.log(process.env);
// console.log(`Your port is ${process.env.PG_URI}`); // 8626


const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
