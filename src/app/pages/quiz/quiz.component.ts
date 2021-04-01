import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz?: Quiz;
  questionIndex: number = 0;
  answerSelected: boolean = false;
  isCorrect: boolean = false;
  correctAnswer: string = '';
  quizzinProgress: boolean = true;
  score: number = 0;
  maxScore: number = 0;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.quizService.
        get(id)
        .subscribe((data => {
          this.quiz = (data.payload.data() as Quiz);
        }));
    }
  }

  selectAnswer(index: number): void {
    console.log(index);
    this.answerSelected = true;
    this.isCorrect = this.quiz?.questions[this.questionIndex]
      .answers[index].isCorrect!;

      if (this.isCorrect) {
        this.score++;
      }

    const correct = this.quiz?.questions[this.questionIndex]
      .answers.find( answer => answer.isCorrect);

      if(correct) {
        this.correctAnswer = correct.text;
      }
  }

  nextQuestion() {
    this.answerSelected = false;
    if(this.questionIndex < this.quiz?.questions.length! - 1) {
      this.questionIndex++;
    } else {
      this.quizzinProgress = false;

      this.maxScore = this.quiz?.questions.length!;

    }
  }

}
