import React from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 mt-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Listado de Tareas</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas registradas.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Título</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Estado</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.description}</td>

                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      task.status === "completada"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="p-2 flex gap-2 justify-center">
                  <button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded"
                    onClick={() => onEdit(task)}
                  >
                    Editar
                  </button>

                  <button
                    className={`px-3 py-1 text-sm rounded ${
                      task.status === "pendiente"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                    onClick={() => onToggleStatus(task)}
                  >
                    {task.status === "pendiente"
                      ? "Marcar completada"
                      : "Marcar pendiente"}
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                    onClick={() => onDelete(task.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
