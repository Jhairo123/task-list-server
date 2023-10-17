const tasks = require("../tasks.json");
const express = require("express");
const router = express.Router();

router.use("/:endpoint", (req, res, next) => {
  const endpoint = req.params.endpoint;

  if (endpoint === "completed" || endpoint === "incomplete") next();
  else {
    res.status(400).send({ error: "invalid endpoint " + "/" + endpoint });
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
