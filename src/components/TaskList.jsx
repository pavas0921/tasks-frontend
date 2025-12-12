import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Chip, Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EditTaskModal from './EditTaskModal';
import AddTaskButton from './AddTaskButton';


const TaskList = ({ tasks, onEdit, onToggleStatus, onDelete, onAdd, onUpdateTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [formMode, setFormMode] = useState(null);

  const handleOpenModal = (task, mode) => {
    setFormMode(mode);
    setTaskToEdit(task);
    setIsModalOpen(true);
    if (onEdit) onEdit(task);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSave = (updatedTask) => {
    if (onAdd) onAdd(updatedTask);
    handleCloseModal();
  };

  const handleUpdateTask = (updatedTask) => {
    if (onUpdateTask) onUpdateTask(updatedTask);
  }

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
                    label={task.status}
                    color={task.status === 'completada' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleOpenModal(task, "edit")}>
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

      <AddTaskButton onClick={() => handleOpenModal(tasks, "add")}/>

      {/* Modal separado */}
      <EditTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        task={taskToEdit}
        onAdd={handleSave}
        onUpdateTask={handleUpdateTask}
        formMode={formMode}
      />
    </>
  );
};

export default TaskList;
