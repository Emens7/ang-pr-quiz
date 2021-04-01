import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  quizzes: Quiz[] = [];

  constructor(public quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.all().subscribe((data: any) => {
      this.quizzes = data.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Quiz;
      });
    });
  }

}
