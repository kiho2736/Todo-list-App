import { useEffect, useContext } from "react";
import TodosContext from "../context/todos";

function App() {
  const { todos, fetchTodos } = useContext(TodosContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  console.log(todos);

  return <div>Hi</div>;
}

export default App;
