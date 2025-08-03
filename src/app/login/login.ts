import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true
})
export class Login implements OnInit {
  constructor(public auth : AuthService) {}
  ngOnInit(){
    this.auth.isAuthenticated$
  }
}
