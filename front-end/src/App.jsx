import React, { useState, useEffect } from 'react';
import { createTodo, getTodos, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  const handleCreateTodo = async () => {
    if (!newTodo) return;
    await createTodo(newTodo);
    setNewTodo('');
    fetchTodos();
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    await updateTodo(id, updatedFields);
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className=" w-1/2 mx-auto mt-10 bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-8">Crud Application</h1>

      <div className="w-full">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Task"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateTodo}
          className="mt-4 w-1/4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white p-4 mb-3 rounded-md shadow-md"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  handleUpdateTodo(todo._id, { completed: e.target.checked })
                }
                className="h-5 w-5 text-blue-600"
              />
              <input
                type="text"
                value={todo.title}
                onChange={(e) =>
                  handleUpdateTodo(todo._id, { title: e.target.value })
                }
                className="w-full border-none bg-transparent text-lg focus:ring-0"
              />
            </div>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
