import "./TodoShow.css";

import { useContext } from "react";
import TodosContext from "../context/todos";

function TodoShow({ todo }) {
  const { setShowModal, setCurrentTodo } = useContext(TodosContext);

  const openShowModal = () => {
    setCurrentTodo(todo);
    setShowModal(true);
  };

  return (
    <tr className="todo" onClick={openShowModal}>
      <td>{todo.title}</td>
      <td>{todo.dueDate.slice(0, 10)}</td>
      <td>{todo.urgency}</td>
      <td>{todo.status}</td>
    </tr>
  );
}

export default TodoShow;
