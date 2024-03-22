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

  if(!(inject(AuthService).isLoggedIn())){
    if(path.includes("profile") || path.includes("createRecipe") || path.includes("profile/recipes"))
      return inject(Router).createUrlTree(['/login']);
  }

  return true;
};
