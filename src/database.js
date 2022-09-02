const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/mern-tasks";
mongoose
  .connect(URI)
  .then((db) => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error al conectar la base de datos:\n", error);
  });

module.exports = mongoose;
