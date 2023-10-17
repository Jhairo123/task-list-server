const tasks = require("../tasks.json");
const express = require("express");
const router = express.Router();

router.use("/:endPoint", (req, res, next) => {
  const endPoint = req.params.endPoint;

  if (endPoint === "completed" || endPoint === "incomplete") {
    // Si el parámetro es válido, continúa con la solicitud
    next();
  } else {
    // Si el parámetro no es válido, responde con un error 400 (Solicitud incorrecta)
    res.status(400).send("Parámetro 'filtro' no válido " + endPoint);
  }
});

/**
 * HTTP GET method to get a list of the completed tasks.
 *
 * @route GET /completed
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.get("/completed", (req, res) => {
  const completedTask = tasks.filter((task) => task.state === true);
  return res.send({ tasks: completedTask });
});

/**gi
 * HTTP GET method to get a list of the incomplete tasks.
 *
 * @route GET /incomplete
 * @returns {JSON} - An array of objects that contains all tasks.
 */
router.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => task.state === false);
  return res.status(200).send({ tasks: incompleteTasks });
});

module.exports = router;
