const tasks = require("./tasks.json");
const express = require("express");
const router = express.Router();

// Ruta para obtener la lista de tareas en formato JSON

router.get("/completed", (req, res) => {
  const completedTask = tasks.filter((task) => task.state === true);
  res.send({ tasks: completedTask });
});

router.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => task.state === false);
  res.status(200).send({ tasks: incompleteTasks });
});
module.exports = router;
