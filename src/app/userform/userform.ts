import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app-service';
import { MatButtonModule } from '@angular/material/button';
import { Response } from './Modal';

@Component({
  selector: 'app-userform',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './userform.html',
  styleUrl: './userform.scss',
  host: { ngSkipHydration: 'true' },
})
export class Userform implements OnInit {
  UserData!: FormGroup;
  appService = inject(AppService);
  IsDisabled = false;
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
    this.IsDisabled = true;
    this.appService.testAPICall(this.UserData.value).subscribe((response:any) => {
      this.downloadPDF(response.result.FileUrl, response.result.ResponseId);
      this.IsDisabled = false;
      console.log('this', this.IsDisabled);
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
