const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const tasks = require("./tasks.json");
const express = require("express");
const app = express();
const port = 3000;

/**
 * HTTP GET method to get a tasks list.
 *
 * @route GET /tasks
 * @returns {JSON} - An object containing the list of tasks.
 */
app.get("/tasks", (req, res) => {
  res.status(200).send({ tasks: tasks });
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
module.exports = app;
