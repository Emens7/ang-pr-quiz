import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz, Question, Answer } from '../../models/quiz';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  quizId?: string;
  quizForm?: FormGroup;

  quiz: Quiz = {
    title: '',
    description: '',
    active: true,
    questions: []
  }

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      active: [true, Validators.required],
      description: ['', Validators.required],
      questions: new FormArray([])
    });

    const id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.quizId = id;
      this.quizService.
        get(this.quizId)
        .subscribe((data => {
          console.log(data.payload.data());
          this.quizForm?.reset();
          this.populateForm((data.payload.data() as Quiz));
          
        }));
    }
  }

  populateForm(data: Quiz): void {

    this.quizForm?.patchValue({
      title: data.title,
      active: data.active,
      description: data.description
    });

    this.quizForm?.setControl('questions', this.getQuestionsForQuiz(data));
    
  }

  getQuestionsForQuiz(data: Quiz): FormArray {
    const formArr = new FormArray([]);
    data.questions.forEach(q => {
      formArr.push(
        this.formBuilder.group({
          text: [q.text, Validators.required],
          answers: this.getAnswersForQuestion(q)
        })
      );
    });
    return formArr;
  }

  getAnswersForQuestion(question: Question): FormArray {
    const formArr = new FormArray([]);
    question.answers.forEach((a) => {
      formArr.push(
        this.formBuilder.group({
          text: [a.text, Validators.required],
          isCorrect: [a.isCorrect, Validators.required]
        })
      );
    });
    return formArr;
  }

  onSave(): void {
    console.log(this.quizForm?.value);
    if (this.quizId) {
      this.quizService.update(this.quizId, this.quizForm?.value).then((result: any) => {
        //console.log(result);
        alert('The quiz has been saved successfully!');
      });
    } else {
      this.quizService.create(this.quizForm?.value).then((result: any) => {
        this.quizId = result.id;
        alert('The quiz has been created successfully!');
      });
    }
    
  }

  addQuestion(): void {
    (this.quizForm?.controls.questions as FormArray).push(
      this.formBuilder.group({
        text: ['', Validators.required],
        answers: new FormArray([])
      })
    );
  }

  removeQuestion(index: number): void {
    (this.quizForm?.controls.questions as FormArray).removeAt(index);
  }
  
  addAnswer(index: number): void {
    const answers = <FormArray>(this.quizForm?.controls.questions as FormArray)
    .at(index)
    .get('answers');

    answers.push(
      this.formBuilder.group({
        text: ['', Validators.required],
        isCorrect: [false, Validators.required]
      })
    );
    
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answers = <FormArray>(this.quizForm?.controls.questions as FormArray)
    .at(questionIndex)
    .get('answers');

    answers.removeAt(answerIndex);
  }

}
