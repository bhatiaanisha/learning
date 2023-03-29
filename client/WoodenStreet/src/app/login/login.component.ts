import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { LoginByPassword } from 'src/Models/LoginByPassword';
import { Token } from 'src/Models/Token';
import { LoginService } from 'src/Services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private loginservice:LoginService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  loginByOtp : boolean = false
  logindata! : LoginByPassword;

  LoginByPasswordForm = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',Validators.required]
  })

  LoginByOtpForm = this.fb.group({
    mobileNumber : [null,Validators.required]
  })

  onPasswordLogin() {
    this.logindata = this.LoginByPasswordForm.value
    this.loginservice.postLoginByPassword(this.logindata).subscribe({
      next: (response:Token) => {
        if(response)
        {
          this.toaster.success("Successfully logged in!");
          if(response.role == "Admin")
          {
            this.router.navigateByUrl("/admin");
          }
          if(response.role == "User")
          {
            this.router.navigateByUrl("/");
          }
        }
      },
      error:(err) => {
        if(err)
        {
          if(err.status == 401)
          {
            this.toaster.error("Incorrect Credentials!");
          }
        }
      }
    });
  }

  showPasswordOrOtp(){
    this.loginByOtp = !this.loginByOtp;
  }

}
