let tasks = require("./tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());

/**
 * HTTP POST method to create a new task and add it to the task list.
 *
 * @route POST /
 * @param {string} req.body.title - The title for the task.
 * @param {string} req.body.description - The description for the task.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.post("/", checkTask, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const index = tasks.length;
  const newTask = {
    id: index === 0 ? 1 : tasks.length,
    state: false,
    title: title,
    description: description,
  };
  // Add a new task into task list
  tasks = [...tasks, newTask];
  if (index >= 1) tasks[index].id = tasks[index - 1].id + 1;
  //sends a reply with the updated task list
  res.send({ tasks: tasks });
});

/**
 * HTTP DELETE method to delete a task by its id.
 *
 * @route DELETE /:id.
 * @param {number} req.params.id - The id is a unique identifier for each task.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.delete("/:id", checkId, (req, res) => {
  const id = req.params.id;
  //Filter and delete specific task by his id
  tasks = tasks.filter((task) => task.id != id);
  //sends a reply with the updated task list
  res.send({ tasks: tasks });
});

/**
 * HTTP PUT method to update a task by its id.
 *
 * @route PUT /.
 * @param {number} req.query.id - The id of the task.
 * @param {string} req.query.title - The new title for the task.
 * @param {string} req.query.description - The new description for the task.
 * @returns {JSON} -  An array of objects that contains all tasks.
 */
router.put("/", [checkId, checkTask], (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const description = req.query.description;
  tasks = tasks.map((task) => {
    //searchs the task
    if (task.id == id)
      // if the task exists, it is updated
      return { ...task, title: title, description: description };
    else return task;
  });
  //sends a reply with the updated task list
  res.send({ users: tasks });
});

/**
 * The function checks if both the title and description are provided in the request parameters or query
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param next - Callback function to pass control to the next middleware or route handler.
 * @returns a response with a message if the id is not
 * found in the tasks array.
 */
function checkTask(req, res, next) {
  const title =
    req.params.title == undefined ? req.query.title : req.params.title;
  const description =
    req.params.description == undefined
      ? req.query.description
      : req.params.description;
  if (title && description) next();
  else return res.status(400).send("The title and description are required");
}

/**
 * The function checks if a given id exists in a list of tasks and returns a response accordingly.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param next - Callback function to pass control to the next middleware or route handler.
 * @returns a response with a message if the id is not
 * found in the tasks array.
 */
function checkId(req, res, next) {
  const id = req.params.id == undefined ? req.query.id : req.params.id;

  if (tasks.find((task) => task.id == id)) next();
  else return res.status(400).send("Id don't exist");
}

module.exports = router;
