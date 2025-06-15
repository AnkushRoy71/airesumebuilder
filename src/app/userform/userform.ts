import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app-service';

@Component({
  selector: 'app-userform',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './userform.html',
  styleUrl: './userform.scss',
  host: { ngSkipHydration: 'true' },
})
export class Userform implements OnInit {
  UserData!: FormGroup;
  appService = inject(AppService);
  ngOnInit(): void {
    this.UserData = new FormGroup({
      FullName: new FormControl(),
      Role: new FormControl(),
      PhoneNumber: new FormControl(),
      AlternateNumber: new FormControl(),
      City: new FormControl(),
      State: new FormControl(),
      Country: new FormControl(),
      Education: new FormControl(),
      Experience: new FormControl(),
      Skills: new FormControl(),
    });
  }

  onSubmit() {
    console.log(this.UserData.value);
    this.appService.testAPICall(this.UserData.value).subscribe((response) => {
      console.log(response);
    });
  }
}
