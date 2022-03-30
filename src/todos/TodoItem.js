export function TodoItem({ todo, onTodoUpdate }) {
  return (
    <li
      className={todo.completed ? "completed" : "pending"}
      onClick={() => onTodoUpdate({ ...todo, completed: !todo.completed })}
    >
      {todo.title}
    </li>
  );
}
