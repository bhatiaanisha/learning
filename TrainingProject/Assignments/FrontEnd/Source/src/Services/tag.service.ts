import { Injectable } from '@angular/core';
import { Tag } from 'src/Models/Tag';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  getTags(){
    return this.http.get<Tag[]>(`${this.appurl}/api/Tag`);
  }

  postTags(tag:Tag){
    return this.http.post(`${this.appurl}/api/Tag`,tag);
  }

  putTags(id:number,tag:Tag){
    return this.http.put(`${this.appurl}/api/Tag/${id}`,tag);
  }

  deleteTags(id:number){
    return this.http.delete(`${this.appurl}/api/Tag/${id}`);
  }

  getTagByQuestionId(id:number){
    return this.http.get(`${this.appurl}/api/Tag/${id}`);
  }
}
