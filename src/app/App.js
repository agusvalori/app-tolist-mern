import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Alert, Snackbar } from "@mui/material";
import { ShowTask } from "./components/ShowTask";
import { AddTask } from "./components/AddTask";

export const App = () => {
  const [mensaje, setMensaje] = useState({ status: "", mensaje: "" });

  const currentDate = new Date();

  const initialValues = {
    _id: "",
    title: "",
    description: "",
    fecha:
      currentDate.getFullYear() +
      (currentDate.getMonth() < 10 ? "-0" : "-") +
      (currentDate.getMonth() + 1) +
      (currentDate.getDate() < 10 ? "-0" : "-") +
      currentDate.getDate() +
      (currentDate.getHours() < 10 ? "T0" : "T") +
      currentDate.getHours() +
      (currentDate.getMinutes() < 10 ? ":0" : ":") +
      currentDate.getMinutes(),
  };
  const [tarea, setTarea] = useState(initialValues);
  const [taskList, setTaskList] = useState([]);
  const agregarTarea = (values) => {
    fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMensaje({ status: "success", mensaje: data.status });
        obtenerTareas();
        setTarea(initialValues);
      })
      .catch((err) => {
        setMensaje({ status: "error", mensaje: err });
      });
  };

  const obtenerTareas = () => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((err) => {
        setMensaje({ status: "error", mensaje: err });
      });
  };

  const obtenerTareaXId = (id) => {
    console.log("obtenerTareaXId: ", id);
    fetch(`/api/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTarea({
          _id: data.result._id ? data.result._id : "",
          title: data.result.title ? data.result.title : "",
          description: data.result.description ? data.result.description : "",
          fecha: data.result.fecha ? data.result.fecha : "",
        });
      })
      .catch((err) => {
        setMensaje({ status: "error", mensaje: err });
      });
  };

  const preEditarTareaXId = (id) => {
    obtenerTareaXId(id);
  };

  const editarTareaXId = (data) => {
    console.log("editarTareaXId: ", data);
    fetch(`/api/task/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMensaje({ status: "success", mensaje: data.status });
        obtenerTareas();
        setTarea(initialValues);
      })
      .catch((err) => {
        setMensaje({ status: "error", mensaje: err });
      });
  };

  const eliminarTareaXId = (id) => {
    console.log("eliminarTareaXId: ", id);

    if (confirm("Esta seguro de querer eliminar la tarea")) {
      fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMensaje({ status: "warning", mensaje: data.status });
          obtenerTareas();
        })
        .catch((err) => setMensaje({ status: "error", mensaje: data.status }));
    }
  };

  const limpiar = () => {
    setTarea(initialValues);
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <Box sx={{ position: "absolute", top: "0%", left: "0%", width: "100%" }}>
      <Box
        sx={{ backgroundColor: "orange", textAlign: "center", color: "white" }}
      >
        <Typography>Lista de Tareas: {taskList?.task?.length}</Typography>
      </Box>
      <AddTask
        tarea={tarea}
        setTarea={setTarea}
        agregarTarea={agregarTarea}
        editarTareaXId={editarTareaXId}
        limpiar={limpiar}
      />
      <Box>
        <ShowTask
          preEditarTareaXId={preEditarTareaXId}
          eliminarTareaXId={eliminarTareaXId}
          taskList={taskList.task}
        />
      </Box>
      <Stack>
        <Snackbar
          open={mensaje.status != ""}
          autoHideDuration={1500}
          onClose={() => setMensaje({ status: "", mensaje: "" })}
        >
          <Alert
            severity={mensaje?.status == "" ? "info" : mensaje.status}
            onClose={() => setMensaje({ status: "", mensaje: "" })}
          >
            {mensaje?.mensaje}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};
