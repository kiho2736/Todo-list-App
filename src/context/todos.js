import { createContext, useState } from "react";
import axios from "axios";

const TodosContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);

  // Get all todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3001/todos");

    setTodos(res.data);
  };

  // Create a new todo
  const createTodo = async (newTodo) => {
    const res = await axios.post("http://localhost:3001/todos", newTodo);

    const updateTodos = [...todos, res.data];
    setTodos(updateTodos);
  };

  // Edit a todo

  // Delete a todo by ID

  const todoActions = {
    todos,
    fetchTodos,
    createTodo,
  };

  return (
    <TodosContext.Provider value={todoActions}>
      {children}
    </TodosContext.Provider>
  );
}

export { Provider };
export default TodosContext;
