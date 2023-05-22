import "./TodoShow.css";

import { useContext } from "react";
import TodosContext from "../context/todos";

function TodoShow({ todo }) {
  const { toggleModal, setCurrentTodo } = useContext(TodosContext);

  const openShowModal = () => {
    setCurrentTodo(todo);
    toggleModal();
  };

  return (
    <tr className="todo" onClick={openShowModal}>
      <td>{todo.title}</td>
      <td>{todo.dueDate}</td>
      <td>{todo.urgency}</td>
      <td>{todo.status}</td>
    </tr>
  );
}

export default TodoShow;
