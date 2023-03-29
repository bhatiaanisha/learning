import { Injectable } from '@angular/core';
import { CategoryCustom,Category } from 'src/Models/Category';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  getCategory(){
    return this.http.get<CategoryCustom[]>(`${this.appurl}/api/Category`);
  }

  postCategory(category:Category){
    return this.http.post(`${this.appurl}/api/Category`,category);
  }
}
