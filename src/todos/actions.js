export const REQUEST_TODOS = "todos/REQUEST_TODOS";
export function requestTodos() {
  return { type: REQUEST_TODOS };
}

export const REPLACE_TODOS = "todos/REPLACE_TODOS";
export function replaceTodos(todos) {
  return { type: REPLACE_TODOS, todos };
}

export const ADD_TODO = "todos/ADD_TODO";
export function addTodo(todo) {
  return { type: ADD_TODO, todo };
}

export const UPDATE_TODO = "todos/UPDATE_TODO";
export function updateTodo(updatedTodo) {
  return { type: UPDATE_TODO, todo: updatedTodo };
}
