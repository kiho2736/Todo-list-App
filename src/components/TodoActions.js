import "react-datepicker/dist/react-datepicker.css";
import "./TodoActions.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import TodosContext from "../context/todos";
import DatePicker from "react-datepicker";

function TodoActions() {
  const [openFilterUrgency, setOpenFilterUrgency] = useState(false);
  const [openFilterStatus, setOpenFilterStatus] = useState(false);

  const {
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

  // Filter Urgency
  const handleFilterLowUrgency = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.urgency === "low";
    });

    setTodos(updatedTodos);
  };

  const handleFilterMediumUrgency = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.urgency === "medium";
    });

    setTodos(updatedTodos);
  };

  const handleFilterUrgentUrgency = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.urgency === "urgent";
    });

    setTodos(updatedTodos);
  };

  const handleOpenFilterStatus = () => {
    setOpenFilterStatus(!openFilterStatus);
  };

  // Filter status
  const handleFilterNotStartedStatus = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.status === "not-started";
    });

    setTodos(updatedTodos);
  };

  const handleFilterProgressingStatus = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.status === "progressing";
    });

    setTodos(updatedTodos);
  };

  const handleFilterDoneStatus = () => {
    const updatedTodos = currentTodos.filter((todo) => {
      return todo.status === "done";
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="actions-container">
      <div className="actions-left">
        <button
          className="button is-primary is-outlined add-btn"
          onClick={handleNewClick}
        >
          <FontAwesomeIcon icon={faPlus} className="fa-lg" />
        </button>
        <button
          className="button is-danger is-outlined delete-btn"
          onClick={deleteSelectedTodos}
        >
          <FontAwesomeIcon icon={faTrash} className="fa-lg" />
        </button>
      </div>

      <div className="filters-container">
        <div className="filter">
          <DatePicker
            id="newDueDate"
            selected={new Date()}
            className="datepicker"
          />
        </div>

        <div
          className={`dropdown filter ${openFilterUrgency ? "is-active" : ""}`}
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
              <div
                className="dropdown-item"
                onClick={handleFilterMediumUrgency}
              >
                MEDIUM
              </div>
              <div
                className="dropdown-item"
                onClick={handleFilterUrgentUrgency}
              >
                URGENT
              </div>
            </div>
          </div>
        </div>

        <div
          className={`dropdown filter ${openFilterStatus ? "is-active" : ""}`}
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
              <div
                className="dropdown-item"
                onClick={handleFilterNotStartedStatus}
              >
                NOT STARTED
              </div>
              <div
                className="dropdown-item"
                onClick={handleFilterProgressingStatus}
              >
                PROGRESSING
              </div>
              <div className="dropdown-item" onClick={handleFilterDoneStatus}>
                DONE
              </div>
            </div>
          </div>
        </div>

        <div
          className={`dropdown filter ${openFilterStatus ? "is-active" : ""}`}
          onClick={handleOpenFilterStatus}
        >
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>10</span>
              <span className="icon">
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item">10</div>
              <div className="dropdown-item">20</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoActions;
