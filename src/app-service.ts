import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from './prompt';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:4200/api/testAPI';
  constructor(private httpClient: HttpClient) {}

  testAPICall(UserData: UserData) {
    return this.httpClient.put(this.apiUrl, UserData);
  }
}
