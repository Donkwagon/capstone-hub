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

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    HomeComponent,
    GanttComponent
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
