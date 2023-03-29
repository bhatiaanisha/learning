import { Injectable } from '@angular/core';
import { Login } from 'src/Models/Login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/Models/Token';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  public currentuser? : Token;

  postLogin(login: Login){
    return this.http.post<Token>(`${this.appurl}/api/Login`,login).pipe(
      map((response:Token)=>{
        const token = response;
        if(token)
        {
          localStorage.setItem("token",JSON.stringify(token));
          this.currentuser = token;
        }
        return token;
      })
    );
  }

  isLoggedIn() : boolean{
    return localStorage.getItem('token')!=null;
  }

  setcurrentUser(token?:Token){
    this.currentuser = token;
  }

  logout()
  {
    localStorage.removeItem("token");
    this.currentuser = undefined;
  }

}
