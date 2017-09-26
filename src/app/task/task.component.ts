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

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {

      this.taskId = params['taskId'];
      console.log(this.taskId);
      this.getTaskInfo();

    });
  }

  getTaskInfo() {
    this.tasks = this.db.list('/tasks', {
      query: {
        orderByChild: 'id',
        equalTo: this.taskId 
      }
    });
  }

}
