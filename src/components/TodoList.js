import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import TodosContext from "../context/todos";

import TodoShow from "./TodoShow";

function TodoList() {
  const { todos } = useContext(TodosContext);

  const renderedTodos = todos.map((todo) => {
    return <TodoShow key={todo.id} todo={todo} />;
  });

  return (
    <table className="table todoList">
      <thead>
        <tr>
          <th></th>
          <th>
            <span>Title</span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </th>
          <th>
            <span>Due Date</span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </th>
          <th>
            <span>Urgency</span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </th>
          <th>
            <span>Status</span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>{renderedTodos}</tbody>
    </table>
  );
}

export default TodoList;
