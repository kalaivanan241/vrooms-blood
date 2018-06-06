
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  recipientList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.recipientList = db.list('/recipient');
  }

  getList() {
    return this.db.list('/recipient').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({key: c.key, ...c.payload.val()}));
      } ));
  }
  addRecipient(recipient) {
    this.recipientList.push(recipient);
  }
  updateRecipient(key, recipient) {
    this.recipientList.update(key, recipient);
  }
}




