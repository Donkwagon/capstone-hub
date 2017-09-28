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
  display: Boolean;

  members: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.display = false;
  }

  ngOnInit() {
    this.newTask = new Task();
    this.tasks = this.db.list('/tasks');
    this.members = this.db.list('/members');
  }

  createNewTask() {
    this.newTask.id = this.guid();
    this.tasks.push(this.newTask);
    this.display = false;
  }

  addSubtask() {
    const subTask = new Task();
    this.newTask.subTasks.push(subTask);
  }

  addMember(member) {
    if (member.selected) {
      const index = this.newTask.members.indexOf(member);
      this.newTask.members.splice(index, 1);
      member.selected = false;
    } else {
      this.newTask.members.push(member);
      member.selected = true;
    }
  }

  displayForm() {
    this.display = true;
  }

  guid() {
    function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    return s4() + s4() + '-' + s4();
  }
}
