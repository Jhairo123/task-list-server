let tasks = require("./tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());
//Body
//{"title": "Tasks 1","description": "Read a book"}
//localhost:3000/task
router.post("/task", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const index = tasks.length;
  const newTask = {
    id: index === 0 ? 1 : tasks.length,
    state: false,
    title: title,
    description: description,
  };
  tasks = [...tasks, newTask]; // Ahora puedes asignar un nuevo valor a users
  if (index >= 1) tasks[index].id = tasks[index - 1].id + 1;

  res.send({ tasks: tasks });
});

//http://localhost:3000/task/1
router.delete("/task/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id != id);
  res.send({ tasks: tasks });
});
//http://localhost:3000/task?id=1&title=Example_task&description=this_is_an_example
router.put("/task", (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const description = req.query.description;
  const updateTask = tasks.map((task) => {
    if (task.id == id)
      return { ...task, title: title, description: description };
    else return task;
  });
  res.send({ users: updateTask });
});

module.exports = router;
