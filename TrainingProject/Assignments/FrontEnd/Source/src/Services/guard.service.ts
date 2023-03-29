import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private loginservice:LoginService,private router:Router) { }

  canActivate():boolean{
    if(this.loginservice.isLoggedIn() && this.loginservice.currentuser?.role=="Admin"){
      return true;
    }
    this.router.navigateByUrl("");
    return false;
  }
}
