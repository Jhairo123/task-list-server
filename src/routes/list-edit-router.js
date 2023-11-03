const { JWTValidation } = require("../middleware/middle.js");
let tasks = require("../../utils/tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());

/**
 * Middleware for adding a new task.
 *
 * This middleware is used to add a new task to the task list. It checks if the request body contains
 * valid data for a task, including a 'title' and 'description'. If the data is valid, it proceeds to the
 * next middleware; otherwise, it responds with an error.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - No return value directly. It either continues to the next middleware for valid data,
 *                   or sends an error response for invalid data.
 */
router.post("/", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;

  // Check if the request body is empty or if 'title' and 'description' are missing.
  if (Object.keys(req.body).length === 0 || !(title && description)) {
    return res.status(400).send({
      error: "The task is invalid for be sent",
      require: "Title and description in the body",
    });
  }
  return next();
});

/**
 * Middleware for updating a task by its ID.
 *
 * This middleware is used to update an existing task in the task list by its ID. It performs the following validations:
 * 1. Checks if the request body contains valid data for the task update, including a valid 'title' and 'description'.
 *
 * If all validations pass, the middleware proceeds to the next middleware. If any validation fails, it responds with
 * an error indicating the specific issue.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - No return value directly. It either continues to the next middleware for valid data,
 *                   or sends an error response for invalid data.
 */
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const body = req.body;

  if (Object.keys(body).length == 0 || !(title && description))
    return res.status(400).send({
      error: "The task is invalid for be send it",
    });
  return next();
});

/**
 * Middleware for validating task 'id' in the URL and checking the HTTP method.
 *
 * This middleware checks if the 'id' parameter in the URL is a valid number and also
 * verifies the HTTP method. It specifically checks for 'DELETE' and 'PUT' methods
 * and ensures that the 'id' exists in the list of tasks for these methods.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - No return value directly. It either continues to the next middleware
 *                   if the 'id' and method are valid or sends an error response for invalid cases.
 */
router.use("/:id", (req, res, next) => {
  const id = req.params.id;
  const method = req.method;
  if (method == "DELETE" || method == "PUT") {
    if (isNaN(id)) {
      return res.status(400).send({
        error: "The id isn't a number",
      });
    } else if (!tasks.find((task) => task.id == id))
      return res.status(400).send({
        error: "The task is not found",
      });
  }
  return next();
});

/**
 * HTTP POST method to create a new task and add it to the task list.
 *
 * @route POST task/
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.post("/", JWTValidation, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const index = tasks.length;
  const body = req.body;

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
  const arrayMessage = [{ message: "Task saved", countTask: tasks.length }];
  return res.send({
    information: arrayMessage,
    tasks: tasks,
  });
});

/**
 * HTTP DELETE method to delete a task by its id.
 *
 * @route DELETE /:id.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.delete("/:id", JWTValidation, (req, res) => {
  const id = req.params.id;
  //Filter and delete specific task by his id
  tasks = tasks.filter((task) => task.id != id);
  //sends a reply with the updated task list
  return res.send({ tasks: tasks });
});

/**
 * HTTP PUT method to update a task by its id.
 *
 * @route PUT task/:id
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @returns {JSON} -  An array of objects that contains all tasks.
 */
router.put("/:id", JWTValidation, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const state = req.body.state;

  const index = tasks.findIndex((task) => task.id == id);
  tasks[index].title = title;
  tasks[index].description = description;
  if (state) tasks[index].state = state;

  //sends a reply with the updated task list
  return res.send({ users: tasks });
});

module.exports = router;
