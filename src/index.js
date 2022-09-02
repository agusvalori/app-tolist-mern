const express = require("express");
const morgan = require("morgan");
const path = require('path')

const {mongoose} = require('./database')

const app = express();


//######## Settings
app.set("port", process.env.PORT || 3000); //process.env.PORT  este valor es para servidores en la nube

//######## Middlewares
app.use(morgan("dev"));
app.use(express.json());

//######## Routes
app.use('/api/task',require('./routes/task.routes'))


//######## Static files
app.use(express.static(path.join(__dirname,'public')))
//path no permite unir rutas independientemente si es un servidor en linux o windows

//Starting the server

app.listen(app.get("port"), () => {
  console.log(`Servidor inciado en el puerto: ${app.get("port")}`);
});
