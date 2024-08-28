import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IToDo } from '../interfaces/todo-interface';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public getTodoList(): Observable<IToDo[]> {
    return this.httpClient.get<IToDo[]>(`${this.baseUrl}/todos`);
  }

  public addTodo(todo: IToDo): Observable<{}> {
    return this.httpClient.post(`${this.baseUrl}/todos`, todo);
  }

  public updateTodo(todo: IToDo): Observable<{}> {
    return this.httpClient.patch(`${this.baseUrl}/todos/${todo.id}`, todo);
  }

  public deleteTodo(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/todos/${id}`);
  }

  public switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
}
