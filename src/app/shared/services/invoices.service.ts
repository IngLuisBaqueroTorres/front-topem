import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InvoicesModel } from "src/app/models/invoices.interface";
import { baseUrl } from "src/environments/environment";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})

export class InvoicesService {
  constructor(private http: HttpClient,private authService:AuthService ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + this.authService.getToken()
    })
  };

  getAll(): Observable<InvoicesModel[]> {
    return this.http.get<InvoicesModel[]>(baseUrl+'/api/auth/index',this.httpOptions);
  }
}
