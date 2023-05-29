import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import TodosContext from "../context/todos";

function TodoActions() {
  const [openFilterUrgency, setOpenFilterUrgency] = useState(false);
  const [openFilterStatus, setOpenFilterStatus] = useState(false);

  const {
    todos,
    setTodos,
    currentTodos,
    setShowModal,
    setCreateMode,
    selectedTodos,
    deleteTodo,
  } = useContext(TodosContext);

  const handleNewClick = () => {
    setCreateMode(true);
    setShowModal(true);
  };

  const deleteSelectedTodos = () => {
    for (let i = 0; i < selectedTodos.length; i++) {
      deleteTodo(selectedTodos[i]);
    }
  };

  const handleOpenFilterUrgency = () => {
    setOpenFilterUrgency(!openFilterUrgency);
  };

  const handleFilterLowUrgency = () => {
    setTodos(currentTodos);
    const updatedTodos = todos.filter((todo) => {
      return todo.urgency === "low";
    });

    setTodos(updatedTodos);
  };

  const handleFilterMediumUrgency = () => {
    setTodos(currentTodos);

    const updatedTodos = todos.filter((todo) => {
      return todo.urgency === "medium";
    });

    setTodos(updatedTodos);
  };

  const handleFilterUrgentUrgency = () => {
    setTodos(currentTodos);

    const updatedTodos = todos.filter((todo) => {
      return todo.urgency === "urgent";
    });

    setTodos(updatedTodos);
  };

  const handleOpenFilterStatus = () => {
    setOpenFilterStatus(!openFilterStatus);
  };

  return (
    <div className="action-container">
      <button
        className="button is-primary is-outlined"
        onClick={handleNewClick}
      >
        NEW
      </button>
      <button
        className="button is-danger is-outlined"
        onClick={deleteSelectedTodos}
      >
        DELETE
      </button>
      <div
        className={`dropdown ${openFilterUrgency ? "is-active" : ""}`}
        onClick={handleOpenFilterUrgency}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Urgency</span>
            <span className="icon">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item" onClick={handleFilterLowUrgency}>
              LOW
            </div>
            <div className="dropdown-item" onClick={handleFilterMediumUrgency}>
              MEDIUM
            </div>
            <div className="dropdown-item" onClick={handleFilterUrgentUrgency}>
              URGENT
            </div>
          </div>
        </div>
      </div>
      <div
        className={`dropdown ${openFilterStatus ? "is-active" : ""}`}
        onClick={handleOpenFilterStatus}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Status</span>
            <span className="icon">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">NOT STARTED</div>
            <div className="dropdown-item">PROGRESSING</div>
            <div className="dropdown-item">DONE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoActions;
