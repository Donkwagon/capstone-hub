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

    this.newTask.startTimestamp = new Date(this.newTask.created_at).getTime();
    this.newTask.dueTimestamp = new Date(this.newTask.due_at).getTime();
    console.log(this.newTask);
    this.tasks.push(this.newTask);
    this.display = false;
  }

  addSubtask() {
    const subTask = new Task();
    this.newTask.subTasks.push(subTask);
    console.log(this.newTask.subTasks);
  }

  addMember(task, member) {
    if (member.selected) {
      task[member.$key] = false;
      const index = task.members.indexOf(member);
      task.members.splice(index, 1);
      member.selected = false;
    } else {
      task[member.$key] = true;
      task.members.push(member);
      member.selected = true;
    }
  }

  displayForm() {
    this.display ? this.display = false : this.display = true;
  }

  save() {
  }

  guid() {
    function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    return s4() + s4() + '-' + s4();
  }
}
