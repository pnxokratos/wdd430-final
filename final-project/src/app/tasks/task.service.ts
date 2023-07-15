import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Task } from './task.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [];

  taskListChanged = new Subject<Task[]>()

  constructor(private httpClient: HttpClient) {
    this.taskListChanged.next([...this.tasks])
    this.fetchTasks().subscribe({
      next: (taskList) => {
        this.tasks = taskList;
        console.log(this.tasks);
        this.sortAndSend();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  // fetch the data from the databases
  fetchTasks() {
    return this.httpClient
      .get<{ message: string, tasks: Task[]}>(
        `http://localhost:3000/tasks`
      
      ).pipe(
        map((responseData) => {
          return responseData.tasks
        })
      )
  }

  sortAndSend(){
    this.tasks.sort();
    this.taskListChanged.next([...this.tasks])
  }

  getTask(id: string) {
    for (const task of this.tasks) {
      if (task.id == id) {
        return task
      }
    }
    return
  }

  getTasks() {
    return this.tasks
  }

  addTask(task: Task) {
    // this.tasks.push(task)
    // this.taskListChanged.next([...this.tasks])
    if(!task){
      return
    }

    task.id = '';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.post<{ message: string, task: Task }>('http://localhost:3000/tasks',
      task,
      { headers: headers })
      .subscribe(
        (responseData) => {
          this.tasks.push(responseData.task);
          this.sortAndSend();
        }
      );
  }

  updateTask(oldTask, newTask) {
    if(!oldTask || !newTask){
      return
    }
    const pos = this.tasks.indexOf(oldTask);
    if(pos<0){
      return;
    }
    newTask.id = oldTask.id;
    newTask._id = newTask._id;

    // this.tasks[pos] = newTask;
    // this.taskListChanged.next([...this.tasks])
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient.put('http://localhost:3000/tasks/' + oldTask.id,
    newTask, { headers: headers })
      .subscribe(
        () => {
          this.tasks[pos] = newTask;
          this.sortAndSend();
        }
      );
  }

  deleteTask(task: Task) {
    if (!document) {
      return;
    }
    const pos = this.tasks.indexOf(task);

    if (pos < 0) {
      return;
    }
    // this.tasks.splice(pos, 1);
    // this.tasks.sort();
    // this.taskListChanged.next([...this.tasks])

    this.httpClient.delete('http://localhost:3000/tasks/' + task.id)
      .subscribe(
        () => {
          this.tasks.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  editTask(task: Task) {
    this.tasks.push(task)
    this.taskListChanged.next([...this.tasks])
  }
}
