import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'tasksFilter',
})
export class TasksFilterPipe implements PipeTransform {

  transform(tasks: Task[], filterState: string): any{
    const filteredTasks: Task[] = []

    // translate status meaning
    if (filterState == "complete") {
        for (const task of tasks) {
          if (task.isChecked) {
            filteredTasks.push(task);
          }
        }
    }

    else if (filterState == "pending"){
        for (const task of tasks) {
          if (!task.isChecked) {
            filteredTasks.push(task);
          }
        }
    }

    else {return tasks}


    if (filteredTasks.length == 0) {
      return tasks;
    }
    else {
      return filteredTasks;
    }
  }

}
