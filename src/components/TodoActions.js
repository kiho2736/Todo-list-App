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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [urgency, setUrgency] = useState("reset");
  const [urgencyDropdown, setUrgencyDropdown] = useState("Urgency");
  const [status, setStatus] = useState("reset");
  const [statusDropdown, setStatusDropdown] = useState("Status");

  useEffect(() => {
    if (urgency === "low") {
      setUrgencyDropdown("Low");
      handleFilterClick("low", status);
    } else if (urgency === "medium") {
      setUrgencyDropdown("Medium");
      handleFilterClick("medium", status);
    } else if (urgency === "urgent") {
      setUrgencyDropdown("Urgent");
      handleFilterClick("urgent", status);
    } else if (urgency === "reset") {
      setUrgencyDropdown("Urgency");
      handleFilterClick("reset", status);
    }
  }, [urgency]);

  useEffect(() => {
    if (status === "not-started") {
      setStatusDropdown("Not Started");
      handleFilterClick(urgency, "not-started");
    } else if (status === "progressing") {
      setStatusDropdown("Progressing");
      handleFilterClick(urgency, "progressing");
    } else if (status === "done") {
      setStatusDropdown("Done");
      handleFilterClick(urgency, "done");
    } else if (status === "reset") {
      setStatusDropdown("Status");
      handleFilterClick(urgency, "reset");
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

  const handleFilterClick = (selectedUrgency, selectedStatus) => {
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

    // const start =
    //   startDate.getFullYear() +
    //   "-" +
    //   (startDate.getMonth() + 1) +
    //   "-" +
    //   startDate.getDate();

    // const end =
    //   endDate.getFullYear() +
    //   "-" +
    //   (endDate.getMonth() + 1) +
    //   "-" +
    //   endDate.getDate();

    // const filterDueDate = [];
    // for (const todo of filterByStatus) {
    //   const [year, month, date] = todo.dueDate.split("-");
    //   if (year >= start.split("-")[0] && year <= end.split("-")[0]) {
    //     if (month >= start.split("-")[1] && month <= end.split("-")[1]) {
    //       if (date >= start.split("-")[2] && date <= end.split("-")[2])
    //         filterDueDate.push(todo);
    //     }
    //   }
    // }

    setTodos(filterByStatus);
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
          <span className="datepicker-label">Date: </span>
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
