import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from 'src/Services/questionservice.service';
import { Question } from 'src/Models/question';
import { QuestionTags,QuestionTags1 } from 'src/Models/QuestionTags';
import { UserService } from 'src/Services/user.service';
import { AnswerService } from 'src/Services/answer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnswerCount } from 'src/Models/Answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(public questionservice : QuestionserviceService,public userservice:UserService,public answerservice:AnswerService,private route:ActivatedRoute) { }

  //questions?:Question[];
  totalitems! : number;
  p:number = 1;
  questionId!:number;
  questionTags! : QuestionTags1[];
  questionDetails! : QuestionTags1[];
  searchCriteria:any;

  ngOnInit(): void {
    document.getElementById('collapseExample')?.classList.remove('show');
    document.getElementById('productsCollapse')?.classList.remove('show');
    this.route.queryParamMap.subscribe({
      next:(params:ParamMap)=>{
        if(params.get('tagname'))
        {
          this.getDetailsByTagName(params.get('tagname')!);
        }
        else
        {
          this.getQuestionTags();
        }
      }
    })
    this.userservice.showhide = false;
  }

  search = this.userservice.searchtext;

  splitTags(tags:string){
    return tags.split(',');
  }

  getQuestionTags(){
    this.questionservice.getQuestionTags().subscribe({
      next:(value:QuestionTags[])=>
      {
        console.log(value);
        this.totalitems=value.length;
        console.log(this.totalitems)
        this.questionDetails = value.map(element=>{
          let tagsjson = JSON.parse(element.tags!);
          let details:QuestionTags1 = {
            questionId : element.questionId,
            questionBody : element.questionBody,
            questionTitle : element.questionTitle,
            totalAnswers : element.totalAnswers,
            questionVotes : element.questionVotes,
            tags : tagsjson
          }
          return details;
        });
        this.questionTags = this.questionDetails;
      },
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      }
    })
  }

  getDetailsByTagName(tagname:string){
    this.questionservice.getDetailsByTagName(tagname).subscribe({
      next:(value:QuestionTags[])=>{
        console.log(value);
        this.questionDetails=value.map(element=>{
          let tagjson = JSON.parse(element.tags!);
          let details:QuestionTags1 = {
            questionId : element.questionId,
            questionBody : element.questionBody,
            questionTitle : element.questionTitle,
            totalAnswers : element.totalAnswers,
            questionVotes : element.questionVotes,
            tags : tagjson
          }
          return details;
        })
        this.questionTags = this.questionDetails;
      },
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      }
    })
  }

  togglerShowHide(){
    this.userservice.showhide = false;
  }
}
