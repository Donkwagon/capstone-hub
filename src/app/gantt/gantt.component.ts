import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Task } from './../@core/classes/task';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})

export class GanttComponent implements OnInit {

  cols: any[];
  rows: any[];
  days: any[];

  w: number; //width of the chart in days

  start: any;
  end: any;
  current: any;

  tasksObservable: FirebaseListObservable<any>;
  tasks: any[];
  members: FirebaseListObservable<any>;
  newTask: Task;

  constructor(private db: AngularFireDatabase) {
    this.cols = [];
    this.tasks = [];
    this.days = ['M',"T","W","T","F","S","S"];
  }

  ngOnInit() {
    this.initGantt();
    this.getTasks();
  }

  getTasks() {
    var tasks = [];
    
    this.tasksObservable = this.db.list('/tasks', { preserveSnapshot: true });
    this.tasksObservable.subscribe(snapshots => {
      snapshots.forEach(task => {
        tasks.push(task.val());
      });

      var start = 1000000000000000;
      var end = 0;

      //get start and end anchors
      tasks.forEach(task => {

        var s  = new Date(task.created_at).getTime();
        var e  = new Date(task.due_at).getTime();

        var startTimestamp = new Date(start).getTime();
        var endTimestamp = new Date(end).getTime();

        if(s < start){start = task.created_at;}
        if(e > endTimestamp){end = task.due_at};
        console.log("end");
        console.log(task.due_at);
        console.log(end);
      });

      this.start = start;
      this.end = end;
        
      tasks.forEach(task => {
        task.duration = this.getNumDays(task.created_at,task.due_at);
        task.offsetStart = this.getNumDays(this.start,task.created_at);
        task.offsetEnd = this.getNumDays(task.due_at,this.end);
      });

      this.tasks = tasks;
    })
  }

  initGantt() {

    var len = 90;
    var i = 0;
    
    while(i < len){
      var date = new Date();
      date.setDate(date.getDate() + i);
      var day = this.days[date.getDay()];
      var d = {date: date,num: i,day: day};
      this.cols.push(d);
      i++;
    }

    this.w = this.cols.length;

  }

  //takes yyyy-mm-dd
  getNumDays(start,end) {
    var s  = new Date(start).getTime();
    var e  = new Date(end).getTime();
    var numDays = (e - s)/(3600*24*1000);
    console.log("num days");
    console.log(start + "|" + end);
    console.log(numDays);
    return numDays;
  }

}
