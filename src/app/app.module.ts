import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MainComponent } from './pages/main/main.component';
import { EditQuizComponent } from './pages/edit-quiz/edit-quiz.component';
import { QuizListComponent } from './pages/quiz-list/quiz-list.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    VerifyEmailComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavbarComponent,
    MainComponent,
    EditQuizComponent,
    QuizListComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
