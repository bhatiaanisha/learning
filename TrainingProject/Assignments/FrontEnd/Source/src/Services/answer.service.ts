import { Injectable } from '@angular/core';
import { Answer } from 'src/Models/Answer';
import { AnswerDetails } from 'src/Models/AnswerDetails';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  postAnswers(answer:Answer){
    return this.http.post(`${this.appurl}/api/Answer`,answer);
  }

  getAnswerDetails(id:number){
    return this.http.get<AnswerDetails[]>(`${this.appurl}/api/Answer/${id}`);
  }
}
