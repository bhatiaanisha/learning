import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from 'src/Models/Register';
import { RegisterService } from 'src/Services/register.service';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder,private registerservice:RegisterService,private router:Router,private userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.showhide = true;
  }

  register! : Register;

  SignUpform = this.fb.group({
    displayName : ['',Validators.required],
    email : ['',[Validators.email,Validators.required]],
    password : ['',[Validators.minLength(8),Validators.required]]
  });

  Registration(){
    this.register = this.SignUpform.value;
    this.registerservice.postRegister(this.register).subscribe({
      next:(value)=>console.log(value),
      error:(err)=>{
        if(err)
        {
          alert("Email is already taken");
        }
      },
      complete:()=>{
        this.router.navigateByUrl("/Login")
      }
    })
  }

  onSubmit() {
    console.log(this.SignUpform.value);
  }

}
