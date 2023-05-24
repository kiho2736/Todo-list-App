import "./App.css";
import { useEffect, useContext } from "react";
import TodosContext from "../context/todos";

import TodoList from "./TodoList";
import TodoActions from "./TodoActions";
import TodoModal from "../modals/TodoModal";

function App() {
  const { fetchTodos } = useContext(TodosContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <TodoModal />
      <TodoActions />
      <TodoList />
    </div>
  );
}

export default App;
