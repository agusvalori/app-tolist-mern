import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { HighlightOffOutlined, EditOutlined } from "@mui/icons-material";

export const ShowTask = ({ taskList, eliminarTareaXId, preEditarTareaXId }) => {
  return (
    <Paper
      sx={{
        padding: "10px",
        margin: "10px",
        height: "60vh",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "4px",
          display: "none" /* Ocultar scroll */,
        },
      }}
    >
      {Array.isArray(taskList) && taskList.length != 0 ? (
        taskList.map((tareas) => {
          let date = new Date(tareas.fecha);
         

          return (
            <Paper
              sx={{
                margin: "5px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={tareas._id}
            >
              <Box sx={{ width: "90%", textAlign: "center" }}>
                <Typography variant='h6' color='primary' >{tareas.title}</Typography>
                <Typography>{tareas.description}</Typography>
                <Typography fontSize={'small'} color='error' >
                  {date!="Invalid Date"&&date.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton onClick={() => eliminarTareaXId(tareas._id)}>
                  <HighlightOffOutlined color="warning" />
                </IconButton>
                <IconButton onClick={() => preEditarTareaXId(tareas._id)}>
                  <EditOutlined color="info" />
                </IconButton>
              </Box>
            </Paper>
          );
        })
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography>No hay tareas</Typography>
        </Box>
      )}
    </Paper>
  );
};
