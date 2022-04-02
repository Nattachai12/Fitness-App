const db = require("./../Models/UsersModel.js");

const routineController = {};

routineController.createRoutine = (req, res, next) => {
  console.log(req.body);
  const text =
    "SELECT user_id, username, email, birthday from users WHERE users.email = $1 AND users.password = $2";
};

module.exports = routineController;
