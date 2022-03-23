const db = require("./../Models/UsersModel.js");

const userController = {};

userController.getUser = (req, res, next) => {
  const text = "SELECT user_id, username, email, birthday from users WHERE users.email = $1 AND users.password = $2";
  const values = [req.body.email, req.body.password];
  db.query(text, values)
    .then((data) => {
      if (data.rows.length === 0) {
        return res
          .status(200)
          .json("Wrong username or password");
      }
      res.locals.user = {};
      //the database set each value to have 50 char, so we have to trim extra whitespaces.
      for (const key in data.rows[0]) {
        if (typeof data.rows[0][key] === 'number') {
          console.log(key)
          res.locals.user[key] = data.rows[0][key];
          continue;
        }
        res.locals.user[key] = data.rows[0][key].trim();
      }
      next();
    })
    .catch((err) =>
      next({
        log: `Error from userController.getUser: ${err}`,
        message: { err: `Error from userController.getUser: ${err}` },
      })
    );
};


userController.findUser = (req, res, next) => {
  const text = "SELECT email from users WHERE users.email = $1";
  const values = [req.body.email];
  db.query(text, values)
    .then((data) => {
      if (data.rows.length !== 0) {
        return res
          .status(200)
          .json("An account with this email is already exist");
      }
      res.locals.user = data.rows[0];
      next();
    })
    .catch((err) =>
      next({
        log: `Error from userController.findUser: ${err}`,
        message: { err: `Error from userController.findUser: ${err}` },
      })
    );
};

userController.createUser = (req, res, next) => {
  //find the user first
  const { username, password, birthday, email } = req.body;
  const text = `INSERT INTO users(username, email, birthday, password) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [username, email, birthday, password];
  db.query(text, values)
    .then((data) => {
      console.log(data.rows[0].username);
      return next();
    })
    .catch((err) =>
      next({ log: `Error from userController.createUser: ${err}` })
    );
};

module.exports = userController;
