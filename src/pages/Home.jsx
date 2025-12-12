import React from "react";
import { useTasks } from "../customHooks/useTasks";
import TaskList from "../components/TaskList";
import { Container, Typography } from "@mui/material";


const Home = () => {
 const { 
  tasks, 
  loading, 
  error,
    handleEdit, 
    handleDelete, 
    handleToggleStatus,
    handleUpdateTask,
    handleAddTask
   } = useTasks();

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error.message}</p>;


return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gestión de Tareas
      </Typography>

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onUpdateTask={handleUpdateTask}
        onAdd={handleAddTask}
      />
    </Container>
  );
};

export default Home;
