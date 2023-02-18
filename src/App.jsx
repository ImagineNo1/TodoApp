import React, { useState } from "react";
import {
  AiOutlineDelete,
  AiFillEdit,
  AiOutlineCheckCircle,
  AiFillCheckCircle,
} from "react-icons/ai";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [editmodeName, setEditmodeName] = useState("");
  const [finished, setFinished] = useState(0);
  const [unfinished, setUnfinished] = useState(0);

  const handleAddTodo = () => {
    const check = todos.filter((todo) => todo.name == todoName)[0];

    if (!check) {
      const newTodo = {
        name: todoName,
        status: "unfinished",
      };
      const allTodos = [newTodo, ...todos];
      setTodos(allTodos);
      setTodoName("");
      setUnfinished(unfinished + 1);
    } else {
      alert("you Cant have Todos With Same Name");
    }
  };
  const handleEdit = () => {
    const check = todos.filter((todo) => todo.name == todoName)[0];
    if (!check) {
      let newTodos = [];
      todos.map((todo) => {
        if (todo.name == editmodeName) {
          todo.name = todoName;

          newTodos.push(todo);
        } else {
          newTodos.push(todo);
        }
      });
      setTodoName("");
      setEditmodeName("");
      setEditmode(false);
      setTodos(newTodos);
    } else {
      alert("New name cant be the same with other todos");
    }
  };
  const handleDeleteTodo = (name) => {
    const thistodo = todos.filter((todo) => todo.name == name)[0];

    if (thistodo.status == "unfinished") {
      setUnfinished(unfinished - 1);
    } else {
      setFinished(finished - 1);
    }
    const alltodos = todos.filter((todo) => todo.name !== name);
    setTodos(alltodos);
  };

  const handleTodoStatus = (name) => {
    let newTodos = [];
    todos.map((todo) => {
      if (todo.name == name) {
        if (todo.status == "unfinished") {
          todo.status = "finished";
          setFinished(finished + 1);
          setUnfinished(unfinished - 1);
        } else {
          todo.status = "unfinished";
          setFinished(finished - 1);
          setUnfinished(unfinished + 1);
        }
        newTodos.push(todo);
      } else {
        newTodos.push(todo);
      }
    });
    setTodos(newTodos);
  };

  return (
    <div className="bg-gradient-to-b from-black to-slate-700 via-gray-600 min-h-screen text-white font-sans">
      <div className="w-[80%] mx-auto h-full pt-[30px] ">
        <div className="md:flex justify-between items-center h-full">
          <h1 className="text-4xl">Todo App</h1>
          <p className="md:text-xl text-sm mt-[10px] md:mt-0">
            <span className="font-bold">{todos.length} </span> Todos |
            <span className="font-bold"> {finished} </span>
            <span className="text-green-500">Finished</span> todos |
            <span className="font-bold"> {unfinished} </span>
            <span className="text-red-500">Unfinished</span> todos
          </p>
        </div>

        {/* Add Todos Section  */}

        <div className="flex py-[20px] justify-between items-center gap-[10px] border-b-[1px] border-white">
          <input
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder={
              editmode ? `New todo name for ${editmodeName}` : "New Todo ..."
            }
            className="py-2 px-3 rounded-lg w-full text-black text-xl"
          />
          <button
            disabled={todoName ? false : true}
            onClick={editmode ? () => handleEdit() : () => handleAddTodo()}
            className={` ${
              editmode
                ? "border-yellow-500 bg-yellow-500"
                : "border-blue-500 bg-blue-500"
            } px-5 py-2 border-[1px]  text-xl rounded-lg`}
          >
            {editmode ? "Edit" : "Add"}
          </button>
        </div>

        {/* Todos Are Displaying Here  */}

        {todos && (
          <div className="">
            {todos.map((todo, index) => (
              <div
                className={`${
                  todo.status === "unfinished"
                    ? "opacity-100"
                    : "opacity-30 line-through"
                } px-5 py-4 my-[20px] rounded-lg shadow-md shadow-white flex justify-between items-center`}
                key={todo.index}
              >
                <p className="text-2xl">{todo.name}</p>
                <div className="flex gap-[10px]">
                  {todo.status === "unfinished" ? (
                    <AiOutlineCheckCircle
                      size={29}
                      color={"green"}
                      className="cursor-pointer"
                      onClick={() => handleTodoStatus(todo.name)}
                    />
                  ) : (
                    <AiFillCheckCircle
                      size={29}
                      color={"green"}
                      className="cursor-pointer"
                      onClick={() => handleTodoStatus(todo.name)}
                    />
                  )}

                  <AiFillEdit
                    size={29}
                    color={"yellow"}
                    className="cursor-pointer"
                    onClick={
                      editmode
                        ? () => {
                            setTodoName("");
                            setEditmodeName("");
                            setEditmode(false);
                          }
                        : () => {
                            setEditmodeName(todo.name);
                            setEditmode(true);
                          }
                    }
                  />
                  <AiOutlineDelete
                    size={29}
                    color={"red"}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTodo(todo.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
