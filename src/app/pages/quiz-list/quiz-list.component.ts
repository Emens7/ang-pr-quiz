import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) { }

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

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete the quiz?')) {
      this.quizService.delete(id).then((result) => {
        
      });
    }
    
  }

}
