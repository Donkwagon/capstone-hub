import { NgModule }                          from '@angular/core';
import { Routes, RouterModule }              from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GanttComponent } from './gantt/gantt.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'gantt', component: GanttComponent},
  { path: 'tasks', component: TaskListComponent},
  { path: 'task/:taskId', component: TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }