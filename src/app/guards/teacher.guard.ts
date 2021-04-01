import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    if (this.authService.user$) {
      return this.authService.user$.pipe(
        take(1),
        map(user => user && user.role == 'teacher' ? true : false),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/']);
          }
        })
      );
    }
    else {
      return of(false);
    }
    

  }
  
}
