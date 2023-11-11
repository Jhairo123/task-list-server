const { JWTValidation } = require("../middleware/middle.js");
let tasks = require("../../utils/tasks.json");
const express = require("express");
const router = express.Router();
router.use(express.json());

const STATUS_204 = { status: "204 - No Content", message: "No Content" };

router.get("/", JWTValidation, (req, res) => {
  const state = req.query.completed;

  if (state === "true" || state === "false") {
    const filterList = tasks.filter(
      (task) => task.state === (state === "true")
    );
    if (filterList.length > 0) {
      return res.send({ tasks: filterList });
    } else {
      console.log(STATUS_204);
      return res.status(204).send(); // 204 - No Content
    }
  } else {
    if (tasks.length > 0) {
      return res.send({ tasks: tasks }); //200 - OK
    } else {
      console.log(STATUS_204);
      return res.status(204).send(); // 204 - No Content
    }
  }
});

router.get("/:id", JWTValidation, (req, res) => {
  const taskId = parseInt(req.params["id"]);
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    return res.send({ task: task });
  } else {
    return res
      .status(404)
      .send({ status: "404 - Not Found", error: "Not Found" }); // 404 - Not Found
  }
});

router.post("/", JWTValidation, (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;

  // Check if the request body is empty or if 'title' and 'description' are missing.
  if (Object.keys(req.body).length === 0 || !(title && description)) {
    return res.status(400).send({
      status: "400 -  Bad Request",
      error: "The task is invalid for be sent it",
      require: "Title and description in the body",
    });
  }
  return next();
});

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
  const arrayMessage = [
    { status: "201 Created", message: "Task saved", countTask: tasks.length },
  ];
  return res.status(201).send({
    information: arrayMessage,
    tasks: tasks,
  });
});

router.use("/:id", JWTValidation, (req, res, next) => {
  const id = req.params.id;
  const method = req.method;
  if (method == "GET" || method == "DELETE" || method == "PUT") {
    if (isNaN(id)) {
      return res
        .status(400)
        .send({ status: "400 - Bad Request", error: "The id isn't a number" });
    } else if (!tasks.find((task) => task.id == id))
      return res
        .status(404)
        .send({ status: "404 - Not Found", error: "The task is not found" });
  }
  return next();
});

router.put("/:id", JWTValidation, (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const body = req.body;

  if (Object.keys(body).length == 0 || !(title && description))
    return res.status(400).send({
      status: "400 -  Bad Request",
      error: "The task is invalid for be sent it",
      require: "Title and description in the body",
    });
  return next();
});

router.delete("/:id", JWTValidation, (req, res) => {
  const id = req.params.id;
  //Filter and delete specific task by his id
  const taskDeleted = tasks.filter((task) => task.id == id);
  tasks = tasks.filter((task) => task.id != id);
  //sends a reply with the updated task list
  console.log(STATUS_204, { task: taskDeleted });
  return res.status(204).send();
});

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
