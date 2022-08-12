import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {baseUrl} from '../environments/environment';
import { UserCredentials } from './models/user-credentials';
import { InvoicesModel } from './models/invoices.interface';

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
    return this.httpClient.post<JwtResponseI>(`${baseUrl}/api/auth/login`,
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            this.token = res.token;
            localStorage.setItem("ACCESS_TOKEN", res.token);
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
      this.token = localStorage.getItem("ACCESS_TOKEN") ?? '';
    }
    return this.token;
  }

  createInvoice(invoice: InvoicesModel): Observable<JwtResponseI> {
    this.token = localStorage.getItem("ACCESS_TOKEN") ?? '';
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.post<any>(baseUrl + '/api/auth/store', invoice,{ headers });
  }

  showInvoice(id:string): Observable<JwtResponseI> {
    this.token = localStorage.getItem("ACCESS_TOKEN") ?? '';
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.get<any>(baseUrl + `/api/auth/show/${id}`,{ headers });
  }

  updateInvoice(id:string, invoice:any): Observable<JwtResponseI> {
    this.token = localStorage.getItem("ACCESS_TOKEN") ?? '';
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.put<any>(baseUrl + `/api/auth/update/${id}`,invoice, { headers });
  }

}


export interface JwtResponseI {
  dataUser: {
    id: number,
    name: string,
    email: string,
  },
  invoice: {
    created_at: Date,
    emitterName: string,
    emitterNit: string,
    id: string,
    invoiceNumber: string,
    items: string,
    receptorName: string,
    receptorNit: string,
    totalValue: string,
    updated_at: string,
    valueNoneVat: string,
    vat: string,

  },
  token:string;
}
