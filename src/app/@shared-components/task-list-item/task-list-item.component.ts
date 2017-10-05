import { Component, Input, OnInit } from '@angular/core';
import { Task } from './../../@core/classes/task';


@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {

  @Input()
  task: Task;
  constructor() { }

  ngOnInit() {
  }

}
