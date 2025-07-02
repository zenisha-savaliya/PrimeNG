import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { IToDo } from '../interfaces/todo-interface';
import { ToDoService } from '../services/to-do.service';
import { loadTodos, loadTodosFailure, loadTodosSuccess } from './todo.actions';
@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todoService: ToDoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoService.getTodoList().pipe(
          map((todos: IToDo[]) => {
            return loadTodosSuccess({ todos });
          }),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );
}
