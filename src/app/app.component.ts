import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import Swal from 'sweetalert2';
import { PaginatorState } from './interfaces/page-state.interface';
import { IToDo } from './interfaces/todo-interface';
import { ToDoService } from './services/to-do.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TodoActions from './state/todo.actions';
import * as TodoSelectors from './state/todo.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public todos$!: Observable<IToDo[]>;
  public loading$!: Observable<boolean>;
  public error$!: Observable<string | undefined>;
  public title = 'learning-prime-ng';
  public task = '';
  public todos: IToDo[] = [];
  public first: number = 0;
  public rows: number = 5;
  @ViewChild('todoTask') todoTask!: NgModel;

  constructor(private todoService: ToDoService, private store: Store) {}

  ngOnInit(): void {
    this.getList();
    this.store.dispatch(TodoActions.loadTodos());
    this.todos$ = this.store.select(TodoSelectors.selectTodos);
    this.loading$ = this.store.select(TodoSelectors.selectLoading);
    this.error$ = this.store.select(TodoSelectors.selectError);
  }

  public getList(): void {
    this.todoService.getTodoList().subscribe({
      next: (res) => {
        this.todos = res;
      },
      error: (err) => {},
    });
  }

  public updateTodo(event: CheckboxChangeEvent, todo: IToDo): void {
    this.todoService
      .updateTodo({ ...todo, completed: event.checked })
      .subscribe({
        next: (res) => {},
        error: (err) => {},
      });
  }

  public deleteTodo(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoService.deleteTodo(id).subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.getList();
          },
          error: (err) => {},
        });
      }
    });
  }

  public addTodo(): void {
    this.todoService.addTodo({ task: this.task, completed: false }).subscribe({
      next: (res) => {
        this.task = '';
        this.todoTask.control.reset();
        this.getList();
      },
      error: (err) => {},
    });
  }

  public onPageChange(event: PaginatorState) {
    if (event.first) this.first = event.first;
    if (event.rows) this.rows = event.rows;
  }
}
