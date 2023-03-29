import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/Models/question';
import { environment } from 'src/environments/environment';
import { QuestionTags } from 'src/Models/QuestionTags';
import { Router } from '@angular/router';
import { QuestionDetails } from 'src/Models/QuestionDetails';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  appurl = environment.appurl;

  getQuestions() {
    return this.http.get<Question[]>(`${this.appurl}/api/Question`);
  }

  postQuestions(question: Question) {
    return this.http.post(`${this.appurl}/api/Question`, question);
  }

  putQuestions(id: number, question: Question) {
    return this.http.put(`${this.appurl}/api/Question/${id}`, question);
  }

  deleteQuestions(id: number) {
    return this.http.delete(`${this.appurl}/api/Question/${id}`);
  }

  getQuestionTags() {
    return this.http.get<QuestionTags[]>(`${this.appurl}/api/Question/questiontag`);
  }

  getQuestionDetails(id:number){
    return this.http.get<QuestionDetails[]>(`${this.appurl}/api/Question/${id}`);
  }

  getDetailsByTagName(tagname:string){
    return this.http.get<QuestionTags[]>(`${this.appurl}/api/Question/tagname?tagname=${tagname}`);
  }

  AskQuestionLoggedin() :boolean{
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      this.router.navigateByUrl("/Login");
      alert("Please login to ask question!");
      return false;
    }
  }
}
