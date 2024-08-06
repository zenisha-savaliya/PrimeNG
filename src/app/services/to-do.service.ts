import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IToDo } from '../interfaces/todo-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

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
}
