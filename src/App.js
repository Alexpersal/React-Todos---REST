//import "./App.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

function AfegirTodo() {
  const titleRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        console.log(title);
      }}
    >
      <input ref={titleRef} />
      <input type="submit" value="Afegir" />
    </form>
  );
}

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://tc-todo-2022.herokuapp.com/todos")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  return (
    <div className="App">
      <h1>Llista de TODOS</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <AfegirTodo />
    </div>
  );
}
