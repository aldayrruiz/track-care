import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.paths';
import { CreateUser } from '@core/models/users/create.model';
import { EditPatchUser } from '@core/models/users/patch.model';
import { User } from '@core/models/users/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signUpUrl = `${environment.api}${API.auth}/signUp`;
  private userUrl = `${environment.api}${API.users}`;

  constructor(private http: HttpClient) {}

  /**
   * Get users info
   *
   * @param evenDisabled if true all users will be fetched, even disabled.
   * @returns users
   */
  getAll(): Observable<User[]> {
    const path = `${this.userUrl}/`;
    return this.http.get<User[]>(path);
  }

  /**
   * Get user info
   *
   * @param id
   * @returns user
   */
  get(id: string): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.get<User>(path);
  }

  /**
   * Register / Create user
   *
   * @param user user
   * @returns user created
   */
  create(user: CreateUser): Observable<CreateUser> {
    const path = `${this.signUpUrl}/`;
    return this.http.post<CreateUser>(path, user);
  }

  /**
   * Delete a user
   *
   * @param id user id
   * @returns
   */
  delete(id: string): Observable<void> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.delete<void>(path);
  }

  /**
   * Update user profile.
   *
   * @param id user id
   * @param user data updated of user.
   * @returns
   */
  update(id: string, user: EditPatchUser): Observable<User> {
    const path = `${this.userUrl}/${id}/`;
    return this.http.patch<User>(path, user);
  }
}
