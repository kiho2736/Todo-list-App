function TodoShow({ todo }) {
  return (
    <tr>
      <td>{todo.title}</td>
      <td>{todo.dueDate}</td>
      <td>{todo.urgency}</td>
      <td>{todo.status}</td>
    </tr>
  );
}

export default TodoShow;
