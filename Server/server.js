const express = require("express");
const app = express();
const path = require("path");
const userController = require("./Controllers/UserController.js");
const routineController = require("./Controllers/RoutineController.js");

//parse incoming request to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
if username and password match with database
  render home page
  send the url for home page
*/
app.post(
  "/api/users",
  userController.findUser,
  userController.createUser,
  (req, res) => {
    return res.status(200).json(true);
  }
);

app.post("/api/getUser", userController.getUser, (req, res) => {
  console.log(res.locals.user);
  return res.status(200).json(res.locals.user);
});

app.post("/api/saveExercise", routineController.createRoutine);

if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
}

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
