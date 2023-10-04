let tasks = require("./tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());
//Body
//{"title": "Tasks 1","description": "Read a book"}
//localhost:3000/task

/**
 * Creates a new task and adds it to the task list, uses the HTTP POST method.
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
  const newTask = {
    id: index === 0 ? 1 : tasks.length,
    state: false,
    title: title,
    description: description,
  };
  // Agrega la nueva tarea a la lista de tareas
  tasks = [...tasks, newTask];
  if (index >= 1) tasks[index].id = tasks[index - 1].id + 1;
  // Envía una respuesta con la lista de tareas actualizada
  res.send({ tasks: tasks });
});

//http://localhost:3000/task/1

/**
 * Delete a task for his id, uses the HTTP DELETE method.
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

//http://localhost:3000/task?id=1&title=Example_task&description=this_is_an_example
/**
 * Updates a task by his id, uses the HTTP PUT method.
 *
 * @route PUT /.
 * @param {number} req.query.id - The id of the task.
 * @param {string} req.query.title - The new title for the task.
 * @param {string} req.query.description - The new description for the task.
 * @returns {JSON} -  An array of objects that contains all tasks.
 */
router.put("/", (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const description = req.query.description;
  const updateTask = tasks.map((task) => {
    //searchs the task
    if (task.id == id)
      // if the task exists, it is updated
      return { ...task, title: title, description: description };
    else return task;
  });
  //sends a reply with the updated task list
  res.send({ users: updateTask });
});

module.exports = router;
