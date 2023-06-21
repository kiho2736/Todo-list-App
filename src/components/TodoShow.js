import "./TodoShow.css";

import { useContext } from "react";
import TodosContext from "../context/todos";

function TodoShow({ todo }) {
  const { setShowModal, setCurrentTodo, changeSelectedTodos } =
    useContext(TodosContext);

  const openShowModal = () => {
    setCurrentTodo(todo);
    setShowModal(true);
  };

  const selectTodo = () => {
    changeSelectedTodos(todo.id);
  };

  return (
    <tr className="todo">
      <td>
        <label className="checkbox">
          <input type="checkbox" onClick={selectTodo} />
        </label>
      </td>
      <td onClick={openShowModal}>{todo.title}</td>
      <td onClick={openShowModal}>{todo.dueDate}</td>
      <td onClick={openShowModal}>{todo.urgency}</td>
      <td onClick={openShowModal}>{todo.status}</td>
    </tr>
  );
}

export default TodoShow;
