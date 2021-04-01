# Ngquiz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.

## Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{user} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth.uid == resource.data.uid;
    }
    match /quizzes/{quiz} {
    	
      function isTeacher() {
      	return request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
      }
    
      allow read: if true;
      allow create, update, delete: if isTeacher();
    }
  }
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
