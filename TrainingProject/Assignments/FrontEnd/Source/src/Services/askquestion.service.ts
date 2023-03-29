import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { askQuestion } from 'src/Models/askQuestion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AskquestionService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  postQuestions(question:askQuestion){
    return this.http.post(`${this.appurl}/api/Question`,question);
  }
}
