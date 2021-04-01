import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherGuard } from './guards/teacher.guard';
import { EditQuizComponent } from './pages/edit-quiz/edit-quiz.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'quiz/:id',
    component: QuizComponent
  },
  {
    path: 'edit-quiz/:id',
    component: EditQuizComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: 'edit-quiz',
    component: EditQuizComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: 'quiz-list',
    component: QuizListComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
