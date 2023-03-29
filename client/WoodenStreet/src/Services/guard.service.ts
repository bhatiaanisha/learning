import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private loginservice:LoginService,private router:Router,private toaster:ToastrService) { }

  canActivate():boolean{
    if(this.loginservice.isLoggedIn() && this.loginservice.currentuser?.role == "Admin")
    {
      return true;
    }
    if(!this.loginservice.isLoggedIn())
    {
      this.toaster.error("Unauthenticated");
    }
    if(this.loginservice.currentuser?.role != "Admin")
    {
      this.toaster.error("Unauthorized");
    }
    this.router.navigateByUrl("");
    return false;
  }
}
