import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  donorList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.donorList = db.list('/donor');
  }

  getList() {
    return this.db.list('/donor').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({key: c.key, ...c.payload.val()}));
      } ));
  }
  addDonor(donor) {
    this.donorList.push(donor);
  }
  updateDonor(key, donor) {
    this.donorList.update(key, donor);
  }
}

export const bloodGroup = [
  {key: 1, name: 'O+'},
  {key: 2, name: 'B+'},
  {key: 3, name: 'A+'},
  {key: 4, name: 'O-'},
  {key: 5, name: 'AB+'},
];


