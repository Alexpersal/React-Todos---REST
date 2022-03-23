import "./App.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ENDPOINT = "https://tc-todo-2022.herokuapp.com/todos";

function AfegirTodo({ OnTodoAdded }) {
  const titleRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        titleRef.current.value = "";
        fetch(ENDPOINT, {
          method: "POST",
          body: JSON.stringify({
            title,
          }),
        })
          .then((response) => response.json())
          .then((json) => OnTodoAdded(json));
      }}
    >
      <input ref={titleRef} />
      <input type="submit" value="Afegir" />
    </form>
  );
}

function TodoItem({ todo, onUpdated }) {
  return (
    <li
      className={todo.completed ? "completed" : "pending"}
      onClick={() => {
        fetch(`${ENDPOINT}/${todo.id}`, {
          method: "POST",
          body: JSON.stringify({ completed: !todo.completed }),
        })
          .then((response) => response.json())
          .then((json) => onUpdated(json));
      }}
    >
      {todo.title}
    </li>
  );
}

export function getTodos() {
  return fetch(ENDPOINT).then((response) => response.json());
}

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);

    const intervalID = setInterval(() => {
      getTodos().then(setTodos);
    }, 1000);
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
