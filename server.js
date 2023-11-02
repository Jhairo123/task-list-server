const jwt = require("jsonwebtoken");
const listViewRouter = require("./routes/list-view-router");
const listEditRouter = require("./routes/list-edit-router");
const tasks = require("./utils/tasks.json");

const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const port = process.env.PORT;

const users = [
  { id: 1, email: "correo@gmail.com", password: "contrasena1", rol: "user" },
  { id: 2, email: "correo1@gmail.com", password: "contrasena2", rol: "user" },
];

/**
 *
 * Middleware to validate permitted HTTP methods(GET, POST, PUT o DELETE).
 *
 * @param {number} req - The object of the Express request.
 * @param {object} res - The object of the response Express.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - It does not return any value directly. If the method is valid, it is passed to the next middleware.
 *                   If the method is invalid, an error is returned and no progress is made to the next middleware.
 */

app.post("/login", authenticateUser, (req, res) => {
  const USER_EMAIL_BD = "correo@gmail.com";
  const USER_PASS_DB = "unodostres";
  const dataUser = req.body;

  if (dataUser.email == USER_EMAIL_BD && dataUser.password == USER_PASS_DB) {
    const index = users.findIndex((user) => user.email === req.body.email);
    const payload = {
      email: users[index].email,
      password: users[index].password,
      rol: users[index].rol,
    };
    console.log(jwt.sign(payload, process.env.SECRET_KEY));
    token = jwt.sign(payload, process.env.SECRET_KEY);
  }
  return res.json({ token });
});

function authenticateUser(req, res, next) {
  const dataUser = req.body;
  if (-1 === users.findIndex((user) => user.email === req.body.email))
    return res.status(401).send({ error: "Invalid user name or password" });
  else return next();
}

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY, {
      expiresIn: "30s",
    });
    req.rol = decodeToken.rol;
    console.log(req.rol);
  } catch (error) {
    return res.json({ error: "Token inválido o expirado" });
  }
  return next();
}

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

/**
 * Middleware for handling endpoint validation.
 *
 * This middleware checks the provided endpoint parameter and enforces specific rules for certain endpoints.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - No return value directly. It either continues to the next middleware or sends a response.
 */
app.use("/:endpoint", (req, res, next) => {
  const endpoint = req.params.endpoint;
  if (endpoint === "tasks" || endpoint === "task") {
    if (!tasks.length == 0) return next();
    return res.status(400).send({
      error: "There are no tasks found",
      message: "You must create at least one task to be able to display it",
    });
  } else res.status(400).send({ error: "invalid endpoint " + "/" + endpoint });
});

/**
 * HTTP GET method to get a tasks list.
 *
 * @route GET /tasks
 * @returns {JSON} - An object containing the list of tasks.
 */
app.get("/tasks", JWTValidation, (req, res) => {
  return res.status(200).send({ tasks: tasks });
});

app.use("/tasks", listViewRouter);
app.use("/task", listEditRouter);

/**
 * Starts the server to listen for incoming requests.
 *
 * @param {number} port - The port on which the server will run.
 */
app.listen(port, () => {
  console.log(`Server on`);
  console.log(
    `Get task list: http://localhost:${port}/tasks` +
      "\n" +
      `Get task list completed: http://localhost:${port}/tasks/completed` +
      "\n" +
      `Get task list completed: http://localhost:${port}/tasks/incomplete`
  );
});

//PUT http://localhost:3000/task/2 {  "title"="Task 1", "description"="Write a new task" }
//DELETE http://localhost:3000/task/2

module.exports = JWTValidation;
