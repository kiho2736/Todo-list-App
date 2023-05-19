import { useEffect, useContext } from "react";
import TodosContext from "../context/todos";

import TodoList from "./TodoList";

function App() {
  const { todos, fetchTodos } = useContext(TodosContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);

  return <div><TodoList /></div>;
}

export default App;
