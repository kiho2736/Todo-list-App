import { useContext } from "react";
import TodosContext from "../context/todos";

function TodoContent({ currentTodo }) {
  const { toggleModal } = useContext(TodosContext);

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{currentTodo.title}</p>
        <button
          className="delete"
          aria-label="close"
          onClick={toggleModal}
        ></button>
      </header>
      <section className="modal-card-body">
        <div>
          <h1 className="title">Description</h1>
          <p>{currentTodo.description}</p>
          <h1 className="title">Due Date</h1>
          <p>{currentTodo.dueDate}</p>
          <h1 className="title">Urgency</h1>
          <p>{currentTodo.urgency}</p>
          <h1 className="title">Status</h1>
          <p>{currentTodo.status}</p>
        </div>
      </section>
      <footer className="modal-card-foot">
        <button className="button" onClick={toggleModal}>
          Cancel
        </button>
      </footer>
    </div>
  );
}

export default TodoContent;
