import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:4200/api/testAPI';
  constructor(private httpClient: HttpClient) {}

  testAPICall() {
    return this.httpClient.get(this.apiUrl);
  }
}
