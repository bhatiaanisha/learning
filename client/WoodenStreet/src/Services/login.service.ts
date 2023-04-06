import { Injectable } from '@angular/core';
import { LoginByPassword } from 'src/Models/LoginByPassword';
import { Token } from 'src/Models/Token';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  public currentuser? : Token;

  postLoginByPassword(login:LoginByPassword){
    return this.http.post<Token>(`${this.appurl}/api/Login`,login).pipe(
      map((response:Token)=>{
        const token = response;
        if(token)
        {
          localStorage.setItem("token",JSON.stringify(token));
          this.currentuser = token;
          console.log(this.currentuser);
        }
        return token;
      })
    );
  }

  isLoggedIn() : boolean{
    return localStorage.getItem('token') != null;
  }

  setCurrentUser(token?:Token){
    this.currentuser = token;
  }

  logout(){
    localStorage.removeItem("token");
    this.currentuser = undefined;
  }
}
