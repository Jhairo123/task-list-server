let tasks = require("../tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());

/**
 * HTTP POST method to create a new task and add it to the task list.
 *
 * @route POST /task
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
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
  return res.send({ tasks: tasks });
});

/**
 * HTTP DELETE method to delete a task by its id.
 *
 * @route DELETE /task/:id.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.delete("/:id", checkId, (req, res) => {
  const id = req.params.id;
  //Filter and delete specific task by his id
  tasks = tasks.filter((task) => task.id != id);
  //sends a reply with the updated task list
  return res.send({ tasks: tasks });
});

/**
 * HTTP PUT method to update a task by its id.
 *
 * @route PUT /task/:id
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {JSON} -  An array of objects that contains all tasks.
 */
router.put("/:id", [checkId, checkTask], (req, res) => {
  const id = req.params.id;
  const title = req.query.title;
  const description = req.query.description;

  const index = tasks.findIndex((task) => task.id == id);
  tasks[index].title = title;
  tasks[index].description = description;
  //sends a reply with the updated task list
  return res.send({ users: tasks });
});

/**
 * Middleware to validate the presence of 'title' and 'description' in the request body or query.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns a response with a message if the title and description is not
 *          found.
 */
function checkTask(req, res, next) {
  const method = req.method;
  let title = "";
  let description = "";
  if (method == "POST") {
    if (req.body.title && req.body.description) {
      title = req.body.title;
      description = req.body.description;
      return next();
    } else
      return res
        .status(400)
        .send("The title and description are required in the body");
  } else if (method == "PUT") {
    if (req.query.title && req.query.description) {
      title = req.query.title;
      description = req.query.description;
      return next();
    } else
      return res
        .status(400)
        .send("The title and description are required in the query");
  }
}

/**
 * Middleware to verify the validity of an ID in the request parameters
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {function} next - The next middleware function.
 * @returns a response with a message if the id is not
 *          found in the tasks array.
 */
function checkId(req, res, next) {
  let id = req.params.id;
  if (isNaN(id))
    return res.status(400).send("The id is require a number in the params");
  else if (id && tasks.find((task) => task.id == id)) return next();
  else return res.status(400).send("The id does not exist");
}

module.exports = router;
