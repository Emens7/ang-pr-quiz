import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private fireStore: AngularFirestore) { }

  all() {
    return this.fireStore
      .collection("quizzes")
      .snapshotChanges();
  }

  get(id: string) {
    return this.fireStore
      .collection("quizzes")
      .doc(id)
      .snapshotChanges();
  }

  create(data: Quiz): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireStore
          .collection("quizzes")
          .add(data)
          .then(res => resolve(res), err => reject(err));
    });
  }

  update(id: string, data: Quiz) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore
          .collection("quizzes")
          .doc(id)
          .update(data)
          .then(res => resolve(res), err => reject(err));
    });
  }

  delete(id: string) {
    return this.fireStore
      .collection("quizzes")
      .doc(id)
      .delete();
  }

}
