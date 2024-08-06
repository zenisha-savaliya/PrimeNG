import { IToDo } from '../interfaces/todo-interface';

export interface TodoState {
  todos: IToDo[];
  error?: string;
  loading: boolean;
}

export const initialState: TodoState = {
  todos: [],
  error: '',
  loading: false,
};
