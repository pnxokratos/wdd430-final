import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterState: string = "all";

  constructor(private taskService: TaskService) {
   }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks()
    this.taskService.taskListChanged.subscribe(
      (taskList: Task[]) => {
        this.tasks = taskList;
      }
    )
    // console.log(this.tasks);
    // console.log(this.tasks[-1]);
  }

  onSubmit(form: NgForm) {
    console.log(form.value.userInput);
    const content = form.value.userInput;
    const id = '' ;
    const date = new Date().toDateString();

    const newTask = new Task(id, content, date, false);
    this.taskService.addTask(newTask);
  }

  updateFilter(value: string) {
    this.filterState = value;
    const parentElement = document.parentElement; // Get the parent element
    if (parentElement && parentElement.classList) {
      parentElement.classList.toggle("active"); // Toggle the "active" class
    }
  }
  

}
