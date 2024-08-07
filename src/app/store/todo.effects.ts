import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToDoService } from '../services/to-do.service';
import { catchError, filter, map, of, switchMap, take } from 'rxjs';
import { loadTodos, loadTodosFailure, loadTodosSuccess } from './todo.actions';
import { IToDo } from '../interfaces/todo-interface';
@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todoService: ToDoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoService.getTodoList().pipe(
          take(1),
          filter((todos) => !!todos.length),
          map((todos: IToDo[]) => {
            return loadTodosSuccess({ todos });
          }),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );
}
