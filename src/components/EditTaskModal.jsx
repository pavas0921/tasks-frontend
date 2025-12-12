import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";

const EditTaskModal = ({ open, onClose, task, onAdd, onUpdateTask, formMode }) => {
  const [editedTask, setEditedTask] = useState(task || {});

  useEffect(() => {
    formMode === "edit" ? setEditedTask(task || {}) : setEditedTask({
      title: "",
      description: "",
      status: "pendiente",
    });
  }, [task, formMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdateTask(editedTask);
    onClose();
  };

 const handleAdd = () => {
  const taskToSend = {
    ...editedTask,
    status: editedTask.status || "pendiente", // respaldo por si acaso
  };
  console.log("Datos que se enviarán:", taskToSend);
  onAdd(taskToSend);
  onClose();
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{formMode === "edit" ? "Editar Tarea" : "Agregar Tarea"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Título"
          name="title"
          fullWidth
          value={editedTask.title || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Descripción"
          name="description"
          fullWidth
          multiline
          rows={4}
          value={editedTask.description || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Estado"
          name="status"
          select
          fullWidth
          value={editedTask.status || "pendiente"}
          onChange={handleChange}
        >
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="completada">Completada</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={formMode === "edit" ? handleUpdate : handleAdd}>
          {formMode === "edit" ? "Guardar Cambios" : "Agregar Tarea"}
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
