import { useState } from "react";
import { useEffect } from "react";
import { AfegirTodo } from "./AfegirTodo";
import { TodoItem } from "./TodoItem";
import { getTodos } from "./todosApi";

export function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);

    const intervalID = setInterval(() => {
      getTodos().then(setTodos);
    }, 6000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <button onClick={() => getTodos().then(setTodos)}>Refresh</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdated={(updatedTodo) =>
              setTodos(
                todos.map((currentTodo) =>
                  currentTodo.id === updatedTodo.id ? updatedTodo : currentTodo
                )
              )
            }
          />
        ))}
      </ul>
      <AfegirTodo OnTodoAdded={(todo) => setTodos([...todos, todo])} />
    </div>
  );
}
