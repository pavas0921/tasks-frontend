const API_URL = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};

// Obtener todas las tareas
export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return await res.json();
};

// Obtener una tarea específica
export const getTaskById = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`);
  return await res.json();
};

// Crear tarea
export const createTask = async (taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers,
    body: JSON.stringify(taskData),
  });
  return await res.json();
};

// Editar tarea
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
    }),
  });
  return await res.json();
};

// Cambiar estado
export const toggleTaskStatus = async (id, newStatus) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status: newStatus }),
  });
  return await res.json();
};

// Eliminar tarea
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
