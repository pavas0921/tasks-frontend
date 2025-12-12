import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Chip, Tooltip, Fab
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

import EditTaskModal from './EditTaskModal';

const TaskList = ({ tasks, onEdit, onToggleStatus, onDelete, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpenModal = (task = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
    if (task && onEdit) {
      onEdit(task);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSave = (task) => {
    if (taskToEdit) {
      // Editando tarea existente
      if (onEdit) onEdit(task);
    } else {
      // Nueva tarea
      if (onAdd) onAdd(task);
    }
    handleCloseModal();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell align="right"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>

                <TableCell>
                  <Chip
                    label={task.status === 'completed' ? 'Completada' : 'Pendiente'}
                    color={task.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleOpenModal(task)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={task.status === 'completed' ? 'Marcar como pendiente' : 'Marcar como completada'}>
                    <IconButton
                      color={task.status === 'completed' ? 'warning' : 'success'}
                      onClick={() => onToggleStatus(task)}
                    >
                      {task.status === 'completed'
                        ? <PendingIcon />
                        : <CheckCircleIcon />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => onDelete(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón flotante para agregar */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenModal()}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Modal para crear o editar */}
      <EditTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        task={taskToEdit}
        onSave={handleSave}
      />
    </>
  );
};

export default TaskList;
