import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router:Router,private userService:UserService){}

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    if(this.userService.isAuthenticated())
      return true;
    else
    {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

  
}
