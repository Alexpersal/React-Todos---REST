import { useState } from "react";
import { useEffect } from "react";
import { AfegirTodo } from "./AfegirTodo";
import { replaceTodos, addTodo, updateTodo } from "./actions";
import { TodoList } from "./TodoList";
import { getTodos } from "./todosApi";
import { reduceTodos, initialState } from "./reducers";

export function Todos() {
  const [todos, setTodos] = useState(initialState);

  useEffect(() => {
    loadTodos();
    const intervalID = setInterval(() => loadTodos(), 6000);
    return () => clearInterval(intervalID);
  }, []);

  const loadTodos = () =>
    getTodos().then((allTodos) =>
      setTodos(reduceTodos(todos, replaceTodos(allTodos)))
    );
  const onTodoAdded = (todo) => setTodos(reduceTodos(todos, addTodo(todo)));

  const onTodoUpdated = (updatedTodo) =>
    setTodos(reduceTodos(todos, updateTodo(updatedTodo)));

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <button onClick={loadTodos}>Refresh</button>
      <TodoList todos={todos} onUpdated={onTodoUpdated} />
      <AfegirTodo OnTodoAdded={onTodoAdded} />
    </div>
  );
}
