import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import Swal from 'sweetalert2';
import { PaginatorState } from './interfaces/page-event.interface';
import { IToDo } from './interfaces/todo-interface';
import { ToDoService } from './services/to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'learning-prime-ng';
  public task = '';
  public todos: IToDo[] = [];
  public first: number = 0;
  public rows: number = 5;
  @ViewChild('todoTask') todoTask!: NgModel;

  constructor(private todoService: ToDoService) {}

  ngOnInit(): void {
    this.getList();
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
