import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Userform } from "./userform/userform";
import { AppService } from '../app-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Userform],
  providers:[AppService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'airesumebuilder';
  appService = inject(AppService);
  ngOnInit(): void {
    this.appService.testAPICall().subscribe((response) => {
      console.log(response);
    });
  }
}
