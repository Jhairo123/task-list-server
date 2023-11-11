const jwt = require("jsonwebtoken");
const { JWTValidation, authenticateUser } = require("./middleware/middle.js");
const listEditRouter = require("./routes/list-edit-router.js");
const tasks = require("../utils/tasks.json");

const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;

app.use("/tasks", listEditRouter);

const router = express.Router();

const users = [
  { id: 1, email: "correo@gmail.com", password: "contrasena1", rol: "user" },
  { id: 2, email: "correo1@gmail.com", password: "contrasena2", rol: "user" },
];

app.post("/login", authenticateUser, (req, res) => {
  const USER_EMAIL_BD = "correo@gmail.com";
  const USER_PASS_DB = "contrasena1";
  const dataUser = req.body;

  if (dataUser.email == USER_EMAIL_BD && dataUser.password == USER_PASS_DB) {
    const index = users.findIndex((user) => user.email === req.body.email);

    const payload = {
      email: users[index].email,
      password: users[index].password,
      rol: users[index].rol,
    };
    token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
  }
  return res.json({ token });
});

app.use("/", JWTValidation, (req, res, next) => {
  const method = req.method;

  if (
    method == "GET" ||
    method == "POST" ||
    method == "PUT" ||
    method == "DELETE"
  )
    next();
  else
    res.status(400).send({
      error: "The method HTTP is invalid for be send it",
    });
  if ("user" === req.rol) return next();
  else res.status(400).json({ error: "Access not allowed" });
  next();
});

app.use("/:endpoint", (req, res, next) => {
  const endpoint = req.params.endpoint;
  if (endpoint === "tasks" || endpoint === "login") {
    if (!tasks.length == 0) return next();
    return res.status(400).send({
      error: "There are no tasks found",
      message: "You must create at least one task to be able to display it",
    });
  } else
    res.status(400).send({
      error: "404 - Not found ",
      login: "http://localhost:3000/login",
    });
});

app.listen(port, () => {
  console.log(`Server on`);
  console.log(
    `Get task list: http://localhost:${port}/tasks` +
      "\n" +
      `Get task list completed: http://localhost:${port}/tasks` +
      "\n" +
      `Get task list completed: http://localhost:${port}/tasks?completed=false`
  );
});

//PUT http://localhost:3000/task/2 {  "title"="Task 1", "description"="Write a new task" }
//DELETE http://localhost:3000/task/2

module.exports = app;
