import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

export const authGuardService:  CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {

  let path = route.toString();

  if((path.includes("login") || path.includes("register")) && inject(AuthService).isLoggedIn())
    return inject(Router).createUrlTree(['/home']);

  if(route.toString().includes("profile") && !(inject(AuthService).isLoggedIn()))
    return inject(Router).createUrlTree(['/login']);

  return true;

};
