import { useContext, useState } from "react";
import TodosContext from "../context/todos";

function Modal({ isShow, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState("not-started");

  const { createTodo } = useContext(TodosContext);

  // Toggle the create modal
  const handleClose = () => {
    onClose();
  };

  // Create a new todo
  const handleSubmit = (e) => {
    e.preventDefault();

    createTodo({ title, description, dueDate: "", urgency, status });
    setTitle("");
    setDescription("");
    setUrgency("low");
    setStatus("not-started");
    onClose();
  };

  // Tracking states of inputs
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
          <p className="modal-card-title">Create a new todo</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              className="textarea"
              placeholder="10 lines of description"
              rows="10"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            {/* Date Picker */}
            <div className="select" value={urgency}>
              <select onChange={handleUrgentSelect}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="select" value={status}>
              <select onChange={handleStatusSelect}>
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

export default Modal;
