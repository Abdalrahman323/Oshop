import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<any> {
    return this.db.list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges() as Observable<any>;
  }

  // Use snapshotChanges() instead of valueChanges() 
  //since valueChanges() only returns the data within a document (not the metadata) whereas 
  //snapshotChanges() returns the document metadata as well as the data within the document.
  // i.e the key of a document is not returned if you use valueChanges()
  // <option *ngFor = "let category of categories$ | async" 
  // [value] = "category.key">
  //        {‌{ category.payload.val().name }}
  // </option> 
}
