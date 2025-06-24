import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from './prompt';
import { Response } from './app/userform/Modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:4200/api/testAPI';
  constructor(private httpClient: HttpClient) {}

  testAPICall(UserData: UserData): Observable<Response> {
    return this.httpClient.put(this.apiUrl, UserData) as Observable<Response>;
  }
}
