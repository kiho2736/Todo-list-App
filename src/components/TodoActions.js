import { useContext } from "react";
import TodosContext from "../context/todos";

function TodoActions() {
  const { toggleModal, createMode, setCreateMode } = useContext(TodosContext);

  const handleNewClick = () => {
    setCreateMode(!createMode);
    toggleModal();
  };

  return (
    <div className="action-container">
      <button
        className="button is-primary is-outlined"
        onClick={handleNewClick}
      >
        NEW
      </button>
    </div>
  );
}

export default TodoActions;
