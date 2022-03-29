import { useEffect } from "react";
import { AfegirTodo } from "./AfegirTodo";
import { addTodo, updateTodo, requestTodos } from "./actions";
import { TodoList } from "./TodoList";
import { useDispatch, useSelector } from "react-redux";

function selectTodos(state) {
  return state.todos;
}

export function Todos() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalID = setInterval(() => loadTodos(), 60000);
    return () => clearInterval(intervalID);
  }, []);

  const loadTodos = () => dispatch(requestTodos());
  const onTodoAdded = (todo) => dispatch(addTodo(todo));

  const onTodoUpdated = (todo) => dispatch(updateTodo(todo));

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <button onClick={loadTodos}>Refresh</button>
      <TodoList todos={todos} onUpdated={onTodoUpdated} />
      <AfegirTodo OnTodoAdded={onTodoAdded} />
    </div>
  );
}
