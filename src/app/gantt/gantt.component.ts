import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Task } from './../@core/classes/task';
import { Event } from './../@core/classes/event';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})

export class GanttComponent implements OnInit {

  cols: any[];
  rows: any[];
  days: any[];
  weeks: any[];
  months: any[];

  w: number; // width of the chart in days

  start: any;
  end: any;
  span: any;
  current: any;

  tasksObservable: FirebaseListObservable<any>;
  tasks: any[];
  members: FirebaseListObservable<any>;
  newTask: Task;

  events: Event[];

  constructor(private db: AngularFireDatabase) {
    this.cols = [];
    this.tasks = [];
    this.days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    this.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    this.events = [];
  }

  ngOnInit() {
    this.getTasks();
  }

  getToday() {
    const date = new Date();
    const today = new Event(date);
    this.events.push(today);
    console.log(this.events);
  }

  getTasks() {

    const tasks = [];

    this.tasksObservable = this.db.list('/tasks', { preserveSnapshot: true });

    this.tasksObservable.subscribe(snapshots => {

      snapshots.forEach(task => { tasks.push(task.val()); });

      let start = 1000000000000000, end = 0;

      tasks.forEach(t => { // get start and end anchors
        if (t.startTimestamp < start) {start = t.startTimestamp; }
        if (t.dueTimestamp > end) {end = t.dueTimestamp; }
      });

      const offsetBefore = 10, offsetAfter = 10;

      this.start = start - offsetBefore * 3600 * 24 * 1000;
      this.end = end + offsetAfter * 3600 * 24 * 1000;
      this.span = this.end - this.start;

      tasks.forEach(t => {
        t.duration = this.getNumDays(t.created_at, t.due_at);
        t.offsetStart = this.getNumDays(this.start, t.created_at);
        t.offsetEnd = this.getNumDays(t.due_at, this.end);
      });

      this.tasks = tasks;

      this.initGantt(start, end);
      this.getToday();

    });
  }

  initGantt(start, end) {
    // takes start and end from get tasks
    const len = (end - start) / 3600 / 24 / 1000;
    let curMonth = '', m = { month: '', days: [] };
    const startDate = new Date(start);

    for (let i = 0; i < len; i++) {

      const d = new Date();
      d.setDate(startDate.getDate() + i);

      const day = this.days[d.getDay()];
      const date = d.getDate();
      const month = this.months[d.getMonth()];
      const el = {
        fullDate: d,
        num: i,
        month: month,
        day: day,
        date: date
      };

      if (curMonth === month) {
        m.days.push(el);
      } else {
        if (m.month) { this.cols.push(m); }
        curMonth = month;
        m = {month: curMonth, days: []};
      }


    }
    this.cols.push(m);

    this.w = this.cols.length;

  }

  // takes yyyy-mm-dd
  getNumDays(start, end) {
    const s  = new Date(start).getTime();
    const e  = new Date(end).getTime();
    const numDays = (e - s) / (3600 * 24 * 1000);
    return numDays;
  }

}
