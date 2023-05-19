import { useContext } from "react";
import TodosContext from "../context/todos";

import TodoShow from "./TodoShow";

function TodoList() {
  const { todos } = useContext(TodosContext);

  const renderedTodos = todos.map((todo) => {
    return <TodoShow key={todo.id} todo={todo} />;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Urgency</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {renderedTodos}
      </tbody>
    </table>
  );
}

export default TodoList;
