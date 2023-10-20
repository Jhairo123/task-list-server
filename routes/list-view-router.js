let tasks = require("../utils/tasks.json");
const express = require("express");
const router = express.Router();

/**
 * Middleware for endpoint validation.
 *
 * This middleware checks the provided endpoint parameter to ensure it's a valid value.
 * It allows only 'completed' and 'incomplete' endpoints. Any other endpoint is considered invalid.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @returns {void} - No return value directly. It either continues to the next middleware for valid endpoints
 *                   or sends an error response for an invalid endpoint.
 */
router.use("/:endpoint", (req, res, next) => {
  const endpoint = req.params.endpoint;

  if (endpoint === "completed" || endpoint === "incomplete") return next();
  else {
    return res
      .status(400)
      .send({ error: "invalid endpoint " + "/" + endpoint });
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
