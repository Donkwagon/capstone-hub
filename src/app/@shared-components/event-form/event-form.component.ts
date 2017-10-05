import { Component, OnInit } from '@angular/core';

import { Event } from './../../@core/classes/event';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})

export class EventFormComponent implements OnInit {
  event: Event;
  events: FirebaseListObservable<any>;
  display: Boolean;

  members: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.display = false;
  }

  ngOnInit() {
    this.event = new Event(null);
    this.events = this.db.list('/events');
  }


  createEvent() {
    this.event.id = this.guid();

    this.event.dateTimestamp = new Date(this.event.date).getTime();
    console.log(this.event);
    this.events.push(this.event);
    this.display = false;
  }


  displayForm() {
    this.display ? this.display = false : this.display = true;
  }
  guid() {
    function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); }
    return s4() + s4() + '-' + s4();
  }

}
