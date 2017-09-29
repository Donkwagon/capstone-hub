import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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
  memberListObservable: FirebaseListObservable<any>;
  memberListHome: any[];
  newTask: Task;

  constructor(private db: AngularFireDatabase) {
    this.newTask = new Task();
    this.memberListHome = [];
  }

  ngOnInit() {
    this.tasks = this.db.list('/tasks');
    this.members = this.db.list('/members');
    this.memberListObservable = this.db.list('/members', { preserveSnapshot: true });
    this.tasks = this.db.list('/tasks', {
      query: {
        orderByChild: '-KupldHh2bPA_67cyA0F',
        equalTo: true
      }
    });

    this.memberListObservable.subscribe(snapshots => {
      snapshots.forEach(member => {
        const key = member.key;
        member = member.val();
        member.key = key;
        member.tasks =  this.db.list('/tasks', {
          query: {
            orderByChild: key,
            equalTo: true
          }
        });
        console.log(member);
        this.memberListHome.push(member);
      });
    });
  }

}
