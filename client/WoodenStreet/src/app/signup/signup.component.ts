import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from 'src/Models/Register';
import { RegisterService } from 'src/Services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private registerservice:RegisterService,private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  registerData! : Register;
  username : string = '';

  SignUpForm = this.fb.group({
    userName : ['',Validators.required],
    mobileNumber : [null,Validators.required],
    pinCode : [null,Validators.required],
    email : ['',[Validators.required,Validators.email]],
    password : ['',Validators.required]
  })

  Registration(){
    this.registerData = this.SignUpForm.value;
    this.registerservice.postRegister(this.registerData).subscribe({
      next:(value)=>value,
      error:(err)=>{
        if(err)
        {
          this.toaster.error("Error");
        }
      },
      complete:()=>{
        this.toaster.success("Registered Successfully!");
        this.router.navigateByUrl('/login');
      }
    })
  }

  checkUsername(name:any){
    //alert(name);
    let exp = /^[A-Za-z]+$/;
    if(!exp.test(name))
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  // checkUserName(){
  //   var exp = '/^[A-Za-z]+$/';
  //   this.username = this.SignUpForm.get('userName')?.value;
  //   // if(exp.match(this.username))
  //   // {
  //   //   return this.username;
  //   // }
  //   // else
  //   // {
  //   //   return false;
  //   // }
  //   alert(this.username);
  // }

}
