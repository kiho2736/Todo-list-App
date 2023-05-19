import { useState } from "react";

import Modal from "./Modal";

function TodoActions() {
  const [showCreate, setShowCreate] = useState(false);

  const handleToggleClick = () => {
    setShowCreate(!showCreate);
  };

  return (
    <div className="action-container">
      <Modal isShow={showCreate} onClose={handleToggleClick}/>
      <button
        className="button is-primary is-outlined"
        onClick={handleToggleClick}
      >
        ADD
      </button>
    </div>
  );
}

export default TodoActions;
