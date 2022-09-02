const { Router } = require("express");
const task = require("../models/task");
const router = Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const result = await Task.find();  
  res.json({ status: "API Works!", task: result });
});

router.get("/:id", async (req, res) => {  
  const result = await Task.findById(req.params.id)
  res.json({ status: "tarea encontrada",result });
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json({ status: "tarea guardada" });
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask)
  res.json({ status: "tarea editada" });
});


router.delete("/:id", async (req, res) => {  
  const result = await Task.findByIdAndRemove(req.params.id)
  res.json({ status: "tarea eliminada",result });
});

module.exports = router;
