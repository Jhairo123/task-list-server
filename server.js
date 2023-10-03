const listViewRouter = require("./list-view-router");
const tasks = require("./tasks.json");
const express = require("express");
const app = express();
const port = 3000;

app.get("/tasks", (req, res) => {
  res.status(200).send({ tasks: tasks });
});

// Importar el enrutador

// Usar el enrutador en la ruta deseada
app.use("/list", listViewRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}/tasks`);
});
module.exports = app;
