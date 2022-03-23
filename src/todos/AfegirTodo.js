import { useRef } from "react";
import { PostNewTodo } from "./todosApi";

export function AfegirTodo({ OnTodoAdded }) {
  const titleRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        titleRef.current.value = "";
        PostNewTodo(title).then((json) => OnTodoAdded(json));
      }}
    >
      <input ref={titleRef} />
      <input type="submit" value="Afegir" />
    </form>
  );
}
