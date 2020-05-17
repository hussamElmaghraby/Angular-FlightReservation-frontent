import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { API_URL } from 'src/app/config/app-config';
import { UserFull } from './user-full';
import { map } from 'rxjs/operators';
import { UserToken } from './userToken';
import { Authority } from './authority';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_URL = `${API_URL}/admin/users`;
  // auth client app
  private static AUTH_CLIENT_HEADER: string = 'Basic ZmxpZ2h0cmVzZXJ2YXRpb24tZnJvbnQtYXBwOnNlY3JldDEyMw==';
  private static STORAGE_TOKEN_KEY = 'USER_TOKEN';
  private currentUserToken: UserToken;
  private users: UserFull[];



  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<UserToken> {
    let headers = new HttpHeaders({
      'Authorization': UserService.AUTH_CLIENT_HEADER
    });
    let options = { headers: headers }
    const auth_url = `${API_URL}/oauth/token?grant_type=password&username=${email}&password=${password}`;

    return this.http.post(auth_url, null, options).pipe(map((res: UserToken) => {
      let token = res;
      token.login = email;
      this.saveUserToken(token);
      return token;
    }));

  }

  saveUserToken(token) {
    localStorage.setItem(UserService.STORAGE_TOKEN_KEY, JSON.stringify(token));
  }


  logout() {
    localStorage.removeItem(UserService.STORAGE_TOKEN_KEY);
    this.currentUserToken = null;
  }

  getCurrentUser(): UserToken {
    if (!this.currentUserToken) {
      this.currentUserToken = this.getUserFromStorage();
    }
    return this.currentUserToken;
  }

  getUserFromStorage(): UserToken {
    let token = localStorage.getItem(UserService.STORAGE_TOKEN_KEY);
    return JSON.parse(token);
  }

  isUserAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  userHasPermission(permisson: string): boolean {
    return this.isUserAuthenticated() && !!this.getCurrentUser().authorities.find((auth: Authority) => auth.authority === permisson);
  }


  register(user: User): Observable<any> {
    return this.http.post(`${API_URL}/users/register`, user);
  }

  getAllUsers(): Observable<UserFull[]> {
    return this.http.get<UserFull[]>(this.USER_URL);
  }


  updateUser(user: UserFull): Observable<UserFull> {
    return this.http.put<UserFull>(this.USER_URL, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.USER_URL + '/' + id);
  }

  activate(hash: string): Observable<any> {
    console.log(`${API_URL}/users/confirm?h=${hash}`);
    return this.http.get(`${API_URL}/users/confirm?h=${hash}`);
  }
  F
}