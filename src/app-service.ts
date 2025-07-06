import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from './prompt';
import { Response } from './app/userform/Modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl =
    'https://airesumebuilder-production-b352.up.railway.app/api/testAPI';
  constructor(private httpClient: HttpClient) {}

  testAPICall(UserData: UserData): Observable<Response> {
    return this.httpClient.put(this.apiUrl, UserData) as Observable<Response>;
  }
}
