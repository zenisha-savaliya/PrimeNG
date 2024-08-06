import { createAction, props } from '@ngrx/store';
import { IToDo } from '../interfaces/todo-interface';

export const loadTodos = createAction('[Todos] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todos] Load Todos Success',
  props<{
    todos: IToDo[];
  }>()
);

export const loadTodosFailure = createAction(
  '[Todos] Load Todos Failure',
  props<{ error: string }>()
);

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: IToDo }>()
);

export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: IToDo }>()
);

export const addTodoFailure = createAction(
  '[Todos] Add Todo Failure',
  props<{ error: string }>()
);

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ todo: IToDo }>()
);

export const updateTodoSuccess = createAction('[Todos] Update Todo Success');

export const updateTodoFailure = createAction(
  '[Todos] Update Todo Failure',
  props<{ error: string }>()
);

export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction('[Todos] Delete Todo Success');

export const deleteTodoFailure = createAction(
  '[Todos] Delete Todo Failure',
  props<{ error: string }>()
);
