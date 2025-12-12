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

const EditTaskModal = ({ open, onClose, task, onSave, onUpdateTask }) => {
  const [editedTask, setEditedTask] = useState(task || {});

  useEffect(() => {
    setEditedTask(task || {});
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar tarea</DialogTitle>
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
          <MenuItem value="completed">Completada</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
