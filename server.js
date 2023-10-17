const listViewRouter = require("./routes/list-view-router");
const listEditRouter = require("./routes/list-edit-router");
const tasks = require("./tasks.json");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

/*
 *
 * Middleware to validate permitted HTTP methods(GET, POST, PUT o DELETE).
 *
 *
 * @param {object} req - The object of the Express request.
 * @param {object} res - The object of the response Express..
 * @param {function} next - The function to go to the next middleware.
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
    next();
  else
    return res.status(400).send({
      error: "The method HTTP is invalid for be send it",
    });
});

app.use("/:endpoint", (req, res, next) => {
  const endpoint = req.params.endpoint;
  if (endpoint == "tasks") {
    console.log(endpoint);
    if (!tasks.length == 0) return next();
    return res.status(400).send({
      error: "There are no tasks found",
      require: "Must add a new task to be able to see it.",
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

//PUT http://localhost:3000/task?id=&title=Task_1&description=Write_a_new_task
//DELETE http://localhost:3000/task/2

module.exports = app;
