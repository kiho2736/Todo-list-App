import { useContext, useState } from "react";
import TodosContext from "../context/todos";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CreateModal({ isShow, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState("not-started");

  const { createTodo } = useContext(TodosContext);

  // Toggle the create modal
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setUrgency("low");
    setStatus("not-started");
    onClose();
  };

  // Create a new todo
  const handleSubmit = (e) => {
    e.preventDefault();

    let selectedDate =
      dueDate.getMonth() +
      1 +
      "/" +
      dueDate.getDate() +
      "/" +
      dueDate.getFullYear();

    createTodo({ title, description, dueDate: selectedDate, urgency, status });

    handleClose();
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

  return (
    <div className={`modal ${isShow ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Todo</p>
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
            Create
          </button>
          <button className="button" onClick={handleClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreateModal;
