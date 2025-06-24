import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app-service';
import { Response } from './Modal';

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
    this.appService.testAPICall(this.UserData.value).subscribe((response:any) => {
      this.downloadPDF(response.result.FileUrl, response.result.ResponseId)
      console.log('this',response);
    });
  }

  downloadPDF(url:string,ResponseID:string){
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume${ResponseID}.pdf`; // Suggest a filename for the download
    document.body.appendChild(a); // Append to body to make it clickable
    a.click(); // Programmatically click the anchor to trigger download
    a.remove(); // Remove the anchor after clicking
  }
}
