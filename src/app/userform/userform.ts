import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-userform',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './userform.html',
  styleUrl: './userform.scss',
  host: { ngSkipHydration: 'true' },
})
export class Userform {}
