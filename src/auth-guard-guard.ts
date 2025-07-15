import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  let isAuthenticatedValue = false
  auth.isAuthenticated$.subscribe((isAuthenticated)=>{
     isAuthenticatedValue = isAuthenticated
    }
  )
  if(isAuthenticatedValue){
    return true;
  }
  else{
    router.navigate(['/'])
    return false;
  }
};
