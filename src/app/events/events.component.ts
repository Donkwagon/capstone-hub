import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Task } from './../@core/classes/task';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    this.events = this.db.list('/events');

  }

}
