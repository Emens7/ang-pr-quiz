import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  role: string = 'student';
  registered: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onRegister(): void {
    this.registered = true;
    this.authService.register(this.email, this.password, this.role);
  }

}
