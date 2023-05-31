import "./App.css";
import { useEffect, useContext } from "react";
import TodosContext from "../context/todos";

import TodoList from "./TodoList";
import TodoActions from "./TodoActions";
import TodoModal from "../modals/TodoModal";

function App() {
  const { fetchTodos } = useContext(TodosContext);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <TodoModal />
      <TodoActions />
      <TodoList />
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        {/* <a className="pagination-previous">Previous</a>
        <a className="pagination-next">Next page</a> */}
        <ul className="pagination-list">
          <li>
            <a className="pagination-link" aria-label="Goto page 1">
              1
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 45">
              45
            </a>
          </li>
          <li>
            <a
              className="pagination-link is-current"
              aria-label="Page 46"
              aria-current="page"
            >
              46
            </a>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 47">
              47
            </a>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a className="pagination-link" aria-label="Goto page 86">
              86
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
