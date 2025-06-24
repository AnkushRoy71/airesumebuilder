import { Component, inject, OnInit } from '@angular/core';
import { Userform } from "./userform/userform";
import { AppService } from '../app-service';

@Component({
  selector: 'app-root',
  imports: [Userform],
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
