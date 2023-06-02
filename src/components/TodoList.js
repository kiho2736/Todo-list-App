import "./TodoList.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { useState, useContext } from "react";
import TodosContext from "../context/todos";

import TodoShow from "./TodoShow";

function TodoList() {
  const {
    todos,
    sortTodosByTitle,
    sortTodosByDueDate,
    sortTodosByUrgency,
    sortTodosByStatus,
  } = useContext(TodosContext);
  const [sortByTitle, setSortByTitle] = useState(true);
  const [sortByDueDate, setSortByDueDate] = useState(true);
  const [sortByUrgency, setSortByUrgency] = useState(true);
  const [sortByStatus, setSortByStatus] = useState(true);

  const handleSortTitle = () => {
    sortTodosByTitle(sortByTitle);
    setSortByTitle(!sortByTitle);
  };

  const handleSortDueDate = () => {
    sortTodosByDueDate(sortByDueDate);
    setSortByDueDate(!sortByDueDate);
  };

  const handleSortUrgency = () => {
    sortTodosByUrgency(sortByUrgency);
    setSortByUrgency(!sortByUrgency);
  };

  const handleSortStatus = () => {
    sortTodosByStatus(sortByStatus);
    setSortByStatus(!sortByStatus);
  };

  const renderedTodos = todos.map((todo) => {
    return <TodoShow key={todo.id} todo={todo} />;
  });

  let titleArrowIcon;
  let dueDateArrowIcon;
  let urgencyArrowIcon;
  let statusArrowIcon;
  if (sortByTitle) {
    titleArrowIcon = <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    titleArrowIcon = <FontAwesomeIcon icon={faArrowUp} />;
  }

  if (sortByDueDate) {
    dueDateArrowIcon = <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    dueDateArrowIcon = <FontAwesomeIcon icon={faArrowUp} />;
  }

  if (sortByUrgency) {
    urgencyArrowIcon = <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    urgencyArrowIcon = <FontAwesomeIcon icon={faArrowUp} />;
  }

  if (sortByStatus) {
    statusArrowIcon = <FontAwesomeIcon icon={faArrowDown} />;
  } else {
    statusArrowIcon = <FontAwesomeIcon icon={faArrowUp} />;
  }

  return (
    <table className="table todoList">
      <thead>
        <tr>
          <th></th>
          <th onClick={handleSortTitle}>
            <span className="column-title">Title</span>
            <span>{titleArrowIcon}</span>
          </th>
          <th onClick={handleSortDueDate}>
            <span className="column-title">Due Date</span>
            <span>{dueDateArrowIcon}</span>
          </th>
          <th onClick={handleSortUrgency}>
            <span className="column-title">Urgency</span>
            <span>{urgencyArrowIcon}</span>
          </th>
          <th onClick={handleSortStatus}>
            <span className="column-title">Status</span>
            <span>{statusArrowIcon}</span>
          </th>
        </tr>
      </thead>
      <tbody>{renderedTodos}</tbody>
    </table>
  );
}

export default TodoList;
