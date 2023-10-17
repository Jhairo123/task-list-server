let tasks = require("../tasks.json");
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
router.post("/", (req, res) => {
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

router.post("/", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const index = tasks.length;
  const body = req.body;
  if (Object.keys(body).length == 0 || !(title && description))
    return res.status(400).send({
      error: "The task is invalid for be send it",
      require: "Title and description in the body",
    });
  next();
});

/**
 * HTTP DELETE method to delete a task by its id.
 *
 * @route DELETE /:id.
 * @param {number} req.params.id - The id is a unique identifier for each task.
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  //Filter and delete specific task by his id
  tasks = tasks.filter((task) => task.id != id);
  //sends a reply with the updated task list
  res.send({ tasks: tasks });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const body = req.body;

  if (Object.keys(body).length == 0 || !(title && description))
    return res.status(400).send({
      error: "The task is invalid for be send it",
    });
  else if (isNaN(id)) {
    return res.status(400).send({
      error: "The id isn't a number",
    });
  } else if (!tasks.find((task) => task.id == id))
    return res.status(400).send({
      error: "The task is not found",
    });

  next();
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
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
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

module.exports = router;
