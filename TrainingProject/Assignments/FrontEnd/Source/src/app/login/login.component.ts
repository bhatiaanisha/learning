import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from 'src/Services/login.service';
import { Login } from 'src/Models/Login';
import { Token } from 'src/Models/Token';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginservice: LoginService,private router: Router,private userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.showhide = true;
  }

  LoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8), Validators.required]]
  });

  logindetails!: Login;

  onLogin() {
    this.logindetails = this.LoginForm.value
    this.loginservice.postLogin(this.logindetails).subscribe({
      next: (value: Token) => {
        console.log(value);
        if(value.role=="Admin")
        {
          this.router.navigateByUrl("/admin")
        }
        if(value.role=="User")
        {
          this.router.navigateByUrl("/questions")
        }
      },
      error: (err) => {
        if(err)
        {
          if(err.status==401)
          {
            alert("Invalid username or password");
          }
        }
        console.log(err);
      }
    });
  }

}
