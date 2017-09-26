import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Task } from './../@core/classes/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: FirebaseListObservable<any>;
  members: FirebaseListObservable<any>;
  newTask: Task;

  constructor(private db: AngularFireDatabase) {
    this.newTask = new Task();
  }

  ngOnInit() {
    this.tasks = this.db.list('/tasks');
    this.members = this.db.list('/members');
  }

}
