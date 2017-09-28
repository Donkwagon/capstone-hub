import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Task } from './../@core/classes/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  sub: any;
  taskId: String;
  tasks: FirebaseListObservable<any>;
  members: FirebaseListObservable<any>;

  displaySubTaskForm: Boolean;

  newTask: Task;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.newTask = new Task();
    this.displaySubTaskForm = false;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      this.taskId = params['taskId'];
      this.getTaskInfo();

    });
    this.members = this.db.list('/members');
  }

  getTaskInfo() {
    this.tasks = this.db.list('/tasks', {
      query: {
        orderByChild: 'id',
        equalTo: this.taskId
      }
    });
  }

  update(task) {
    task.subTasks.push(this.newTask);
    this.tasks.update(task.$key, task);
    this.newTask = new Task();
    this.displaySubTaskForm = false;
  }

  showSubtaskForm() {
    this.displaySubTaskForm = true;
  }

  // takes yyyy-mm-dd
  getNumDays(start, end) {
    const s  = new Date(start).getTime();
    const e  = new Date(end).getTime();
    const numDays = (e - s) / (3600 * 24 * 1000);
    return numDays;
  }
}
