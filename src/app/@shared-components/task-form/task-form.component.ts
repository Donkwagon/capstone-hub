import { Component, OnInit } from '@angular/core';

import { Task } from './../../@core/classes/task';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  newTask: Task;
  tasks: FirebaseListObservable<any>;
  
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.newTask = new Task();
    this.tasks = this.db.list('/tasks');
  }


  createNewTask() {
    this.tasks.push(this.newTask);
  }

  addMember(member) {
    this.newTask.members.push(member);
  }

}
