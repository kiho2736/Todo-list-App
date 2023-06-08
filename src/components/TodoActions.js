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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState("not-started");
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

  const handleOpenFilterStatus = () => {
    setOpenFilterStatus(!openFilterStatus);
  };

  const handleFilterClick = () => {
    let filterUrgency = currentTodos;
    if (urgency !== "none") {
      filterUrgency = currentTodos.filter((todo) => {
        return todo.urgency === urgency;
      });
    }

    let filterStatus = filterUrgency;
    if (status !== "none") {
      filterStatus = filterUrgency.filter((todo) => {
        return todo.status === status;
      });
    }

    setTodos(filterStatus);
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
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/dd/yyyy"
            className="datepicker"
          />
          <span className="datepicker-tilde">~</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MM/dd/yyyy"
            className="datepicker"
          ></DatePicker>
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
              <div className="dropdown-item" onClick={() => setUrgency("low")}>
                LOW
              </div>
              <div
                className="dropdown-item"
                onClick={() => setUrgency("medium")}
              >
                MEDIUM
              </div>
              <div
                className="dropdown-item"
                onClick={() => setUrgency("urgent")}
              >
                URGENT
              </div>
              <hr className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => setUrgency("none")}>
                NONE
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
                onClick={() => {
                  setStatus("not-started");
                }}
              >
                NOT STARTED
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("progressing");
                }}
              >
                PROGRESSING
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("done");
                }}
              >
                DONE
              </div>
              <hr className="dropdown-divider" />
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("none");
                }}
              >
                NONE
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
        <button className="button is-primary" onClick={handleFilterClick}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default TodoActions;
