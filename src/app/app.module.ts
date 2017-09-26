import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }                       from '@angular/forms';


import { LocationStrategy }                  from '@angular/common';
import { HashLocationStrategy }              from '@angular/common';

import { environment }                       from '../environments/environment';

//////////////////////////////////////////////////////////////////////////////////
//external libraries
import { AngularFireModule }                 from 'angularfire2';
import { AngularFireDatabaseModule }         from 'angularfire2/database';
import { AngularFireAuthModule }             from 'angularfire2/auth';

import { AppRoutingModule }                            from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';
import { GanttComponent } from './gantt/gantt.component';
import { TaskFormComponent } from './@shared-components/task-form/task-form.component';
import { TaskListItemComponent } from './@shared-components/task-list-item/task-list-item.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    HomeComponent,
    GanttComponent,
    TaskFormComponent,
    TaskListItemComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
