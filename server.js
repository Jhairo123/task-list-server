const listViewRouter = require("./routes/list-view-router");
const listEditRouter = require("./routes/list-edit-router");
const tasks = require("./utils/tasks.json");

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

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
app.use("/", (req, res, next) => {
  const method = req.method;
  if (
    method == "GET" ||
    method == "POST" ||
    method == "PUT" ||
    method == "DELETE"
  )
    return next();
  else
    return res.status(400).send({
      error: "The method HTTP is invalid for be send it",
    });
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
app.get("/tasks", (req, res) => {
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

module.exports = app;
