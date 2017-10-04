import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Task } from './../@core/classes/task';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})

export class MemberComponent implements OnInit {

  sub: any;
  memberId: String;
  members: any;
  memberListObservable: FirebaseListObservable<any>;
  tasks: FirebaseListObservable<any>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase) {

    this.sub = this.route.params.subscribe(params => {

      this.memberId = params['uid'];

      this.members = this.db.list('/members', {
        query: {
          orderByChild: 'uid',
          equalTo: this.memberId
        },
        preserveSnapshot: true
      });

      this.memberListObservable = this.db.list('/members', {
        query: {
          orderByChild: 'uid',
          equalTo: this.memberId
        }
      });
      this.members.subscribe(snapshots => {
        snapshots.forEach(member => {
          const key = member.key;
          member = member.val();
          member.key = key;
          this.tasks =  this.db.list('/tasks', {
            query: {
              orderByChild: key,
              equalTo: true
            }
          });
        });
      });
    });
  }

  ngOnInit() {
  }

}
