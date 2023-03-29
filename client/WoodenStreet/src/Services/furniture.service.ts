import { Injectable } from '@angular/core';
import { FurnitureItem } from 'src/Models/FurnitureItem';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  getFurnitureItems(){
    return this.http.get<FurnitureItem[]>(`${this.appurl}/api/Furniture`);
  }
}
