import { createContext, useState } from "react";
import axios from "axios";

const TodosContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);

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

  // Toggle the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const todoActions = {
    todos,
    currentTodo,
    setCurrentTodo,
    showModal,
    createMode,
    setCreateMode,
    fetchTodos,
    createTodo,
    toggleModal,
  };

  return (
    <TodosContext.Provider value={todoActions}>
      {children}
    </TodosContext.Provider>
  );
}

export { Provider };
export default TodosContext;
