import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {baseUrl} from '../../../environments/environment';
import { UserCredentials } from '../../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = '';
  authSubject = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient) { }

  register(user: UserCredentials): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${baseUrl}/api/register`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(res.token);
          }
        })
      );
  }

  login(user: UserCredentials): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${baseUrl}/api/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.saveToken(res.token);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
  }

  private saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")??'';
    }
    return this.token;
  }

}


export interface JwtResponseI {
  dataUser: {
    id: number,
    name: string,
    email: string,
  },
  token:string;
}
