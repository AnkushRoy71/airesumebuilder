import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  auth = inject(AuthService)
  router = inject(Router)
  ngOnInit(): void {   
    this.auth.isAuthenticated$.subscribe((isAuthenticated)=>{
        if(isAuthenticated){
          this.router.navigate(['/resume']);
        }
      }
    )
  }
}
