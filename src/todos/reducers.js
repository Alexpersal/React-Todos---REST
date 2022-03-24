import { REPLACE_TODOS, ADD_TODO, UPDATE_TODO } from "./actions";

export const initialState = [];
export function reduceTodos(state = initialState, action) {
  switch (action.type) {
    case REPLACE_TODOS:
      return action.todos;
    case ADD_TODO:
      return [...state, action.todo];
    case UPDATE_TODO:
      return state.map((currentTodo) =>
        currentTodo.id === action.todo.id ? action.todo : currentTodo
      );
    default:
      return state;
  }
}
