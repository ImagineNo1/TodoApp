import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineCheckCircle,
} from "react-icons/ai";

function ChatGPT() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue) {
      if (editIndex !== -1) {
        const newTodos = [...todos];
        newTodos[editIndex] = {
          title: inputValue,
          completed: newTodos[editIndex].completed,
        };
        setTodos(newTodos);
        setEditIndex(-1);
      } else {
        setTodos([...todos, { title: inputValue, completed: false }]);
      }
      setInputValue("");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setInputValue(todos[index].title);
  };

  const handleCheckTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };
  const numTodos = todos.length;
  const numFinishedTodos = todos.filter((todo) => todo.completed).length;
  const numUnfinishedTodos = numTodos - numFinishedTodos;
  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white mb-4">Todo App</h1>
      <div className="flex border rounded-md p-2 mb-4">
        <input
          type="text"
          className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-md"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo"
        />
        <button
          className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          onClick={handleAddTodo}
        >
          {editIndex === -1 ? "Add" : "Save"}
        </button>
      </div>
      <p className="">
        {numTodos} todos, {numFinishedTodos} finished, {numUnfinishedTodos}{" "}
        unfinished
      </p>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="bg-gray-800 shadow-md rounded-md p-4">
            <div className="flex items-center justify-between">
              {editIndex === index ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-md"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                    onClick={handleAddTodo}
                  >
                    <AiOutlineCheck size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center w-full">
                  <button
                    className={`text-gray-400 hover:text-white ${
                      todo.completed ? "text-green-500" : ""
                    }`}
                    onClick={() => handleCheckTodo(index)}
                  >
                    {todo.completed ? (
                      <AiOutlineCheckCircle size={24} color="#48BB78" />
                    ) : (
                      <AiOutlineCheck size={24} color="#CBD5E0" />
                    )}
                  </button>

                  <div
                    className={`text-lg font-medium text-white ml-2 ${
                      todo.completed ? "line-through opacity-50" : ""
                    }`}
                  >
                    {todo.title}
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleEditTodo(index)}
                >
                  <AiOutlineEdit size={24} color="#F6E05E" />
                </button>

                <button
                  className="text-red-400 hover:text-white ml-4"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <AiOutlineDelete size={24} color="#F56565" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatGPT;
