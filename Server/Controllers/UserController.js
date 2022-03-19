const db = require("./../Models/UsersModel.js");

const userController = {};

userController.findUser = (req, res, next) => {
  const text = 'SELECT username from users WHERE users.username = $1';
  const values = [req.body.username];
  db.query(text, values)
    .then(data => {
      if (data.rows.length !== 0) {
        return res.status(200).json('This username is taken. Use different username');
      }
      next();
    })
}

userController.createUser = (req, res, next) => {
  //find the user first
  const {username, password} = req.body;
  const text = `INSERT INTO users(username, password)
  VALUES ($1, $2) RETURNING *`;
  const values = [username, password];
  db.query(text, values)
    .then((data) => {

      console.log(data.rows[0].username);
      res.locals.data = data.rows[0].username;
      return next();
    })
    .catch((err) =>
      next({ log: `Error from userController.createUser: ${err}` })
    );
};

module.exports = userController;
