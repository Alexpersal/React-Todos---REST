import { useRef } from "react";

export function AfegirTodo({ onAddTodo }) {
  const titleRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        titleRef.current.value = "";
        onAddTodo({ title });
      }}
    >
      <input ref={titleRef} />
      <input type="submit" value="Afegir" />
    </form>
  );
}
