import "react-datepicker/dist/react-datepicker.css";
import "./TodoActions.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import TodosContext from "../context/todos";
import DatePicker from "react-datepicker";

function TodoActions() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [urgency, setUrgency] = useState("reset");
  const [urgencyDropdown, setUrgencyDropdown] = useState("Urgency");
  const [status, setStatus] = useState("reset");
  const [statusDropdown, setStatusDropdown] = useState("Status");

  useEffect(() => {
    handleFilterClick(urgency, status, startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    if (urgency === "low") {
      setUrgencyDropdown("Low");
      handleFilterClick("low", status, startDate, endDate);
    } else if (urgency === "medium") {
      setUrgencyDropdown("Medium");
      handleFilterClick("medium", status, startDate, endDate);
    } else if (urgency === "urgent") {
      setUrgencyDropdown("Urgent");
      handleFilterClick("urgent", status, startDate, endDate);
    } else if (urgency === "reset") {
      setUrgencyDropdown("Urgency");
      handleFilterClick("reset", status, startDate, endDate);
    }
  }, [urgency]);

  useEffect(() => {
    if (status === "not-started") {
      setStatusDropdown("Not Started");
      handleFilterClick(urgency, "not-started", startDate, endDate);
    } else if (status === "progressing") {
      setStatusDropdown("Progressing");
      handleFilterClick(urgency, "progressing", startDate, endDate);
    } else if (status === "done") {
      setStatusDropdown("Done");
      handleFilterClick(urgency, "done", startDate, endDate);
    } else if (status === "reset") {
      setStatusDropdown("Status");
      handleFilterClick(urgency, "reset", startDate, endDate);
    }
  }, [status]);

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

  const handleFilterClick = (
    selectedUrgency,
    selectedStatus,
    selectedStart,
    selectedEnd
  ) => {
    let filterByUrgency = currentTodos;
    if (selectedUrgency !== "reset") {
      filterByUrgency = currentTodos.filter((todo) => {
        return todo.urgency === selectedUrgency;
      });
    }

    let filterByStatus = filterByUrgency;
    if (selectedStatus !== "reset") {
      filterByStatus = filterByUrgency.filter((todo) => {
        return todo.status === selectedStatus;
      });
    }

    const filterDueDate = [];

    if (!selectedStart && !selectedEnd) {
      for (const todo of filterByStatus) {
        filterDueDate.push(todo);
      }
    }

    if (selectedStart) {
      for (const todo of filterByStatus) {
        if (+selectedStart <= new Date(todo.dueDate).getTime()) {
          filterDueDate.push(todo);
        }
      }
    }

    if (selectedEnd) {
      const result = filterDueDate.filter((todo) => {
        return new Date(todo.dueDate).getTime() <= +selectedEnd;
      });
      setTodos(result);
    } else {
      setTodos(filterDueDate);
    }
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
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            isClearable={true}
            className="datepicker"
            placeholderText="Date Range"
          />
        </div>

        <div className="dropdown filter is-hoverable">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{urgencyDropdown}</span>
              <span className="icon">
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item" onClick={() => setUrgency("low")}>
                Low
              </div>
              <div
                className="dropdown-item"
                onClick={() => setUrgency("medium")}
              >
                Medium
              </div>
              <div
                className="dropdown-item"
                onClick={() => setUrgency("urgent")}
              >
                Urgent
              </div>
              <hr className="dropdown-divider" />
              <div
                className="dropdown-item"
                onClick={() => setUrgency("reset")}
              >
                Reset
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown filter is-hoverable">
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{statusDropdown}</span>
              <span className="icon">
                <FontAwesomeIcon icon={faAngleDown} />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu2" role="menu">
            <div className="dropdown-content">
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("not-started");
                }}
              >
                Not Started
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("progressing");
                }}
              >
                Progressing
              </div>
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("done");
                }}
              >
                Done
              </div>
              <hr className="dropdown-divider" />
              <div
                className="dropdown-item"
                onClick={() => {
                  setStatus("reset");
                }}
              >
                Reset
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown filter is-hoverable">
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
          <div className="dropdown-menu" id="dropdown-menu3" role="menu">
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
