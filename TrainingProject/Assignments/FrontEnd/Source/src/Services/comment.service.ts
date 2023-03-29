import { Injectable } from '@angular/core';
import { QuestionComment } from 'src/Models/QuestionComment';
import { AnswerComment } from 'src/Models/AnswerComment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PostQuestionComment } from 'src/Models/PostQuestionComment';
import { PostAnswerComment } from 'src/Models/PostAnswerComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  getQuestionComments(questionId : number){
    return this.http.get<QuestionComment[]>(`${this.appurl}/api/QuestionComment/${questionId}`);
  }

  getAnswerComments(answerId : number){
    return this.http.get<AnswerComment[]>(`${this.appurl}/api/AnswerComment/${answerId}`);
  }

  postQuestionComment(postComment : PostQuestionComment){
    return this.http.post(`${this.appurl}/api/QuestionComment`,postComment);
  }

  postAnswerComment(postComment : PostAnswerComment){
    return this.http.post(`${this.appurl}/api/AnswerComment`,postComment);
  }
}
