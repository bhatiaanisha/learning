import { Injectable } from '@angular/core';
import { Register } from 'src/Models/Register';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  postRegister(register:Register){
    return this.http.post(`${this.appurl}/api/User`,register);
  }
}
