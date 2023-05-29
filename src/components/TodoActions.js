import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import TodosContext from "../context/todos";

function TodoActions() {
  const [openFilterUrgency, setOpenFilterUrgency] = useState(false);

  const { setShowModal, setCreateMode, selectedTodos, deleteTodo } =
    useContext(TodosContext);

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
            <a href="#" className="dropdown-item">
              LOW
            </a>
            <a href="#" className="dropdown-item">
              MEDIUM
            </a>
            <a href="#" className="dropdown-item">
              URGENT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoActions;
