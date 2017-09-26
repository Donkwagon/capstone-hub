import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
    user: Observable<firebase.User>;
    members: FirebaseListObservable<any>;
    memberListObservable: FirebaseListObservable<any>;
    memberList: any[];
  
    constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
      this.memberList = [];
    }
  
    ngOnInit() {
      //this.getServers();
      this.members = this.db.list('/members');
      this.memberListObservable = this.db.list('/members', { preserveSnapshot: true })

      this.memberListObservable.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          this.memberList.push(snapshot.val());
        });
      })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var member ={
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid
          }
          
          var exist = false;
          setTimeout(() => {
            this.memberList.forEach(member => {
              if(member.uid === user.uid){
                exist = true;
              }
            })
            
            if(!exist){
              this.members.push(member);
            }
            
          }, 2000);
          
        } else {
          console.log("No user");
        }
      });

    }
  
    login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  
    logout() {
      this.afAuth.auth.signOut();
    }
}
