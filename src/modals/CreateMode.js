import "react-datepicker/dist/react-datepicker.css";

import { useState, useContext, useEffect } from "react";
import TodosContext from "../context/todos";
import DatePicker from "react-datepicker";

function CreateMode() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState("not-started");

  const [showWarning, setShowWarning] = useState(false);

  const {
    currentTodo,
    createTodo,
    editTodo,
    editMode,
    deleteTodo,
    closeModal,
  } = useContext(TodosContext);

  let modalTitle = "Create Todo";
  let btnName = "Create";
  let deleteBtn = "";

  useEffect(() => {
    if (editMode) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
      setDueDate(new Date(currentTodo.dueDate));
      setUrgency(currentTodo.urgency);
      setStatus(currentTodo.status);
    }
  }, [editMode]);

  // Toggle the create modal
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setUrgency("low");
    setStatus("not-started");
    closeModal();
  };

  // Create a new todo
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setShowWarning(!showWarning);
    } else {
      const todoInfo = {
        title,
        description,
        dueDate,
        urgency,
        status,
      };

      if (editMode) {
        editTodo(currentTodo.id, todoInfo);
      } else {
        createTodo(todoInfo);
      }

      handleClose();
    }
  };

  // Delete the current todo
  const handleDeleteClick = () => {
    deleteTodo(currentTodo.id);
    closeModal();
  };

  // Tracking states of inputs
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDueDateSelect = (date) => {
    setDueDate(date);
  };

  const handleUrgentSelect = (e) => {
    setUrgency(e.target.value);
  };

  const handleStatusSelect = (e) => {
    setStatus(e.target.value);
  };

  if (editMode) {
    modalTitle = "Edit Todo";
    btnName = "Edit";
    deleteBtn = (
      <button className="button is-danger" onClick={handleDeleteClick}>
        Delete
      </button>
    );
  }

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{modalTitle}</p>
        <button
          className="delete"
          aria-label="close"
          onClick={handleClose}
        ></button>
      </header>
      <section className="modal-card-body">
        <form onSubmit={handleSubmit}>
          <label htmlFor="newTitle">Title</label>
          <input
            id="newTitle"
            className="input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          <p className={title ? "warning-msg-hide" : "warning-msg"}>
            Please fill out title.
          </p>

          <label htmlFor="newDescription">Description</label>
          <textarea
            id="newDescription"
            className="textarea"
            placeholder="10 lines of description"
            rows="10"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>

          <label htmlFor="newDueDate">Due Date</label>
          <DatePicker
            id="newDueDate"
            selected={dueDate}
            onSelect={handleDueDateSelect}
          />

          <label>Urgent</label>
          <div className="select">
            <select onChange={handleUrgentSelect} value={urgency}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <label>Status</label>
          <div className="select" value={status}>
            <select value={status} onChange={handleStatusSelect}>
              <option value="not-started">Not Started</option>
              <option value="progress">Progressing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </form>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={handleSubmit}>
          {btnName}
        </button>
        {deleteBtn}
        <button className="button" onClick={handleClose}>
          Cancel
        </button>
      </footer>
    </div>
  );
}

export default CreateMode;
