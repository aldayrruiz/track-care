import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '@core/models/users/user.model';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User[]> {
    return this.userService.getAll();
  }
}
