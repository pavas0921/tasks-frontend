import { useState, useEffect } from "react";
import { getTasks, updateTask } from "../services/taskApi";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((response) => {
        setTasks(response.data); // Asegúrate que getTasks() devuelve { data: [...] }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleEdit = (task) => {
    console.log("Editar:", task);
    // Aquí podrías agregar lógica para editar la tarea (backend o local)
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (task) => {
    const newStatus = task.status === "Pendiente" ? "Completada" : "Pendiente";
    console.log(newStatus);
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
  };
}
