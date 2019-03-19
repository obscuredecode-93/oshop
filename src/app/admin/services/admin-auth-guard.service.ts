import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import 'rxjs/add/operator/map';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  canActivate(): Observable<boolean>{
    return this.auth.appUsers$
    .map(appUser => appUser.isAdmin);

  }

  constructor(private auth:AuthService, private userService: UserService) { }
}
