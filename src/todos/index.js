import { useState } from "react";
import { useEffect } from "react";
import { AfegirTodo } from "./AfegirTodo";
import { TodoList } from "./TodoList";
import { getTodos } from "./todosApi";

const initialState = [];

function reduceTodos(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];
    case "UPDATE_TODO":
      return state.map((currentTodo) =>
        currentTodo.id === action.todo.id ? action.todo : currentTodo
      );
    default:
      return state;
  }
}
export function Todos() {
  const [todos, setTodos] = useState(initialState);

  useEffect(() => {
    loadTodos();
    const intervalID = setInterval(() => loadTodos, 6000);
    return () => clearInterval(intervalID);
  }, []);

  const loadTodos = () => getTodos().then((allTodos) => setTodos(allTodos));
  const onTodoAdded = (todo) =>
    setTodos(reduceTodos(todos, { type: "ADD_TODO", todo }));

  const onTodoUpdated = (updatedTodo) =>
    setTodos(reduceTodos(todos, { type: "UPDATE_TODO", todo: updatedTodo }));

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <button onClick={loadTodos}>Refresh</button>
      <TodoList todos={todos} onUpdated={onTodoUpdated} />
      <AfegirTodo OnTodoAdded={onTodoAdded} />
    </div>
  );
}
