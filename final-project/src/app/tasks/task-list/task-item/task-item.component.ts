import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Input() index!: number;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onDelete(id: string) {
    const taskSelected = this.taskService.getTask(id);
    this.taskService.deleteTask(taskSelected)
  }

  onEdit() {
    // console.log("i am editing")
  }

  onCheck() {
    const oldTask = this.task;
    const lastUpdated = new Date().toDateString()
    let status: boolean = false;

    if (oldTask.isChecked == undefined || oldTask.isChecked == null) {
      status = true
    }
    else if (oldTask.isChecked == true) {
      status = false
    }
    else {
      status = true
    }

    const newTask = new Task(oldTask.id, oldTask.content, lastUpdated, status)
    this.taskService.updateTask(oldTask, newTask)
  }
}
