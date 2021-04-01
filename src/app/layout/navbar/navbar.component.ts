import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isTeacher: boolean = false;

  constructor(public auth: AngularFireAuth, private authService: AuthService) { }

  ngOnInit(): void {
    
    if (this.authService.user$) {
      this.authService.user$.subscribe((user: any) => {
        this.isTeacher = (user != null && user.role == 'teacher');
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

}
