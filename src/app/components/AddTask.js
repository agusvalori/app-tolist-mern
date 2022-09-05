import React, { useState } from "react";
import { Box, TextField, Paper, Button } from "@mui/material";

export const AddTask = ({
  setTarea,
  tarea,
  agregarTarea,
  editarTareaXId,
  limpiar,
}) => {
  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setTarea({ ...tarea, [name]: value });
  };

  const addTask = (event) => {
    event.preventDefault();
    if (tarea._id != "") {
      editarTareaXId(tarea);
    } else {
      agregarTarea(tarea);
    }
  };
  return (
    <form onSubmit={(event) => addTask(event)}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextField
            required
            name="title"
            label="Titulo"
            value={tarea.title}
            onChange={(event) => handleInputChange(event)}
          />
          <TextField
            sx={{ margin: "0px 5px" }}
            required
            name="description"
            label="Descripcion"
            value={tarea.description}
            onChange={(event) => handleInputChange(event)}
          />
          <TextField
            required
            name="fecha"
            type="datetime-local"
            value={tarea.fecha}
            onChange={(event) => handleInputChange(event)}
          />
        </Box>
        <Box sx={{ textAlign: "center", margin: "10px" }}>
          <Button type="submit" variant="outlined">
            Cargar
          </Button>
          {tarea._id != "" && (
            <Button
              sx={{ margin: "0px 10px" }}
              variant="outlined"
              color="success"
              onClick={() => limpiar()}
            >
              Limpiar
            </Button>
          )}
        </Box>
      </Paper>
    </form>
  );
};
