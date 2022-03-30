import { useEffect } from "react";
import { AfegirTodo } from "./AfegirTodo";
import { requestAddTodo, requestUpdateTodo, requestTodos } from "./actions";
import { TodoList } from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "./selectors";

export function Todos() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalID = setInterval(() => loadTodos(), 60000);
    return () => clearInterval(intervalID);
  }, []);

  const loadTodos = () => dispatch(requestTodos());
  const onAddTodo = (todo) => dispatch(requestAddTodo(todo));

  const onTodoUpdate = (todo) => dispatch(requestUpdateTodo(todo));

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <button onClick={loadTodos}>Refresh</button>
      <TodoList todos={todos} onTodoUpdate={onTodoUpdate} />
      <AfegirTodo onAddTodo={onAddTodo} />
    </div>
  );
}
