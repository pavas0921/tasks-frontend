import { useState, useEffect } from "react";
import {
  getTasks,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  createTask,
} from "../services/taskApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (task) => {
    console.log("Editar:", task);
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await createTask(newTask); // llamada API para crear
      const createdTask = response.data;
      if (response.data) {
        const copyTasks = [...tasks];
        copyTasks.push(createdTask);
        setTasks(copyTasks);
      }
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteTask(id);
    const deteledTask = response.data;
    const index = tasks.findIndex((t) => t.id === deteledTask.id);
    const taskCopy = [...tasks];
    if (index !== -1) {
      taskCopy.splice(index, 1);
      setTasks(taskCopy);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "pendiente" ? "completada" : "pendiente";
    const response = await toggleTaskStatus(task.id, newStatus);

    const updatedTask = response.data;
    const index = tasks.findIndex((t) => t.id === updatedTask.id);
    const taskCopy = [...tasks];
    if (index !== -1) {
      taskCopy[index] = updatedTask;
      setTasks(taskCopy);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask.id, updatedTask);
      const updatedTaskFromServer = response.data;
      const index = tasks.findIndex((t) => t.id === updatedTaskFromServer.id);
      const taskCopy = [...tasks];
      if (index !== -1) {
        taskCopy[index] = updatedTaskFromServer;
        setTasks(taskCopy);
      }
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  return {
    tasks,
    loading,
    error,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    handleUpdateTask,
    handleAddTask,
  };
}
