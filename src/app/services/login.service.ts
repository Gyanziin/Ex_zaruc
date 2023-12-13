import { Injectable } from '@angular/core';
import { RequestLogin } from '../../app/resouces/models/RequestLogin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000'; // Atualize conforme sua configuração

  constructor(private httpClient: HttpClient) { }

  public doLogin(requestLogin: RequestLogin): Observable<RequestLogin> {
    return this.httpClient.post<RequestLogin>(`${this.apiUrl}/login`, requestLogin);
  }
}
