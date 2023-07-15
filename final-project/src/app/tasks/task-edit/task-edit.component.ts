import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task!: Task;
  originalTask!: Task;
  defaultStatus: string;
  buttonValue: string;

  editMode!: boolean;
  constructor(
      private taskService: TaskService, 
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // get the id of the selected task
        const taskId: string = params['id'];

        // depending on the id value, the editMode will be updated
        if (taskId == undefined || taskId == null) {
          this.editMode = false;
          this.buttonValue = "Save Task"
          return
        }

        this.originalTask = this.taskService.getTask(taskId)
        console.log(this.originalTask)
         if (this.originalTask == null || this.originalTask == undefined) {
          return
         }

         this.editMode = true;
         this.buttonValue = "Update Task"
         this.task = JSON.parse(JSON.stringify(this.originalTask));

         if (this.task.isChecked) {this.defaultStatus = 'yes';}
         else {this.defaultStatus = 'no'}

        //  console.log(this.editMode);
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const lastUpdated = new Date().toDateString()

    // check the response we get for the isChecked
    if (value.isChecked == "yes") {value.isChecked = true} 
    else {value.isChecked = false}

    // console.log(newTask);

    if (this.editMode == true) {
      const newTask = new Task(value.id, value.content, lastUpdated, value.isChecked);
      this.taskService.updateTask(this.originalTask, newTask)
    } 
    else {
      // if the edit mode is false. it means that the id value is undefined
      const newTask = new Task(value.id, value.content, lastUpdated, value.isChecked);
      this.taskService.addTask(newTask)
    }
    this.router.navigate(['./tasks']) 
  }

  onCancel() {
    this.router.navigate(['./tasks']) 
  }
}
