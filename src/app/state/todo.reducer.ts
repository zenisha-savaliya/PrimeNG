import { createReducer, on } from '@ngrx/store';
import { initialState } from './todo.state';
import {
  addTodo,
  addTodoFailure,
  addTodoSuccess,
  deleteTodo,
  deleteTodoFailure,
  deleteTodoSuccess,
  loadTodos,
  loadTodosFailure,
  loadTodosSuccess,
  updateTodo,
  updateTodoFailure,
  updateTodoSuccess,
} from './todo.actions';

const todoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => ({ ...state, loading: true })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    todos,
  })),
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addTodo, (state) => ({ ...state, loading: true })),
  on(addTodoSuccess, (state, { todo }) => ({
    ...state,
    loading: false,
    todos: [...state.todos, todo],
  })),
  on(addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateTodo, (state, { todo }) => {
    const updatedTodos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    return { ...state, todos: updatedTodos };
  }),
  on(updateTodoSuccess, (state) => state),
  on(updateTodoFailure, (state, { error }) => ({ ...state, error })),

  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  })),
  on(deleteTodoSuccess, (state) => state),
  on(deleteTodoFailure, (state, { error }) => ({ ...state, error }))
);

export default todoReducer;
