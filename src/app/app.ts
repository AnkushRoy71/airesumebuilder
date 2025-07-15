import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../app-service';
import { RouterOutlet } from '@angular/router';
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  providers:[AppService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'airesumebuilder';
  appService = inject(AppService);
  ngOnInit(): void {
    // this.appService.testAPICall().subscribe((response) => {
    //   console.log(response);
    // });
  }
}
