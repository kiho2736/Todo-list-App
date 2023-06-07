import { createContext, useState } from "react";
import axios from "axios";

const TodosContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTodos, setSelectedTodos] = useState([]);

  // Sort todos by title in ascending or descending orders
  const sortTodosByTitle = (des) => {
    let sortedTodos;
    if (des) {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    } else {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      });
    }

    setTodos(sortedTodos);
  };

  // Sort due date by title in ascending or descending orders
  const sortTodosByDueDate = (des) => {
    let sortedTodos;
    if (des) {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.dueDate < b.dueDate) return -1;
        if (a.dueDate > b.dueDate) return 1;
        return 0;
      });
    } else {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.dueDate < b.dueDate) return 1;
        if (a.dueDate > b.dueDate) return -1;
        return 0;
      });
    }

    setTodos(sortedTodos);
  };

  // Sort todos by urgency in ascending or descending orders
  const sortTodosByUrgency = (des) => {
    let sortedTodos;
    if (des) {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.urgency < b.urgency) return -1;
        if (a.urgency > b.urgency) return 1;
        return 0;
      });
    } else {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.urgency < b.urgency) return 1;
        if (a.urgency > b.urgency) return -1;
        return 0;
      });
    }

    setTodos(sortedTodos);
  };

  // Sort todos by status in ascending or descending orders
  const sortTodosByStatus = (des) => {
    let sortedTodos;
    if (des) {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
      });
    } else {
      sortedTodos = todos.slice().sort((a, b) => {
        if (a.status < b.status) return 1;
        if (a.status > b.status) return -1;
        return 0;
      });
    }

    setTodos(sortedTodos);
  };

  // Get all todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3001/todos");

    setTodos(res.data);
    setCurrentTodos(res.data);
  };

  // Create a new todo
  const createTodo = async (newTodo) => {
    const res = await axios.post("http://localhost:3001/todos", newTodo);

    const updateTodos = [...todos, res.data];
    setTodos(updateTodos);
  };

  // Edit a todo
  const editTodo = async (id, todo) => {
    const res = await axios.put("http://localhost:3001/todos/" + id, todo);

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...res.data };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // Delete a todo by ID
  const deleteTodo = async (id) => {
    const res = await axios.delete("http://localhost:3001/todos/" + id);

    await fetchTodos();
  };

  // Toggle the modal
  const closeModal = () => {
    setShowModal(false);
    setCreateMode(false);
    setEditMode(false);
  };

  const changeSelectedTodos = (id) => {
    if (selectedTodos.indexOf(id) == -1) {
      setSelectedTodos([...selectedTodos, id]);
    } else {
      const updatedTodos = selectedTodos.filter((todo) => {
        return id !== todo;
      });
      setSelectedTodos(updatedTodos);
    }
  };

  const todoActions = {
    todos,
    setTodos,
    currentTodos,
    sortTodosByTitle,
    sortTodosByDueDate,
    sortTodosByUrgency,
    sortTodosByStatus,
    currentTodo,
    setCurrentTodo,
    showModal,
    setShowModal,
    createMode,
    setCreateMode,
    editMode,
    setEditMode,
    fetchTodos,
    createTodo,
    editTodo,
    deleteTodo,
    closeModal,
    selectedTodos,
    changeSelectedTodos,
  };

  return (
    <TodosContext.Provider value={todoActions}>
      {children}
    </TodosContext.Provider>
  );
}

export { Provider };
export default TodosContext;
