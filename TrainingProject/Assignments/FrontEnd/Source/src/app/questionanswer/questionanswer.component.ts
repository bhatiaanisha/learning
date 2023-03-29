import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionTags } from 'src/Models/QuestionTags';
import { Answer } from 'src/Models/Answer';
import { AnswerService } from 'src/Services/answer.service';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/Services/login.service';
import { QuestionserviceService } from 'src/Services/questionservice.service';
import { QuestionDetails,QuestionDetails1 } from 'src/Models/QuestionDetails';
import { AnswerDetails, AnswerDetails1 } from 'src/Models/AnswerDetails';
import { UserService } from 'src/Services/user.service';
import { QuestionComment } from 'src/Models/QuestionComment';
import { CommentService } from 'src/Services/comment.service';
import { Validators } from '@angular/forms';
import { PostQuestionComment } from 'src/Models/PostQuestionComment';
import { PostAnswerComment } from 'src/Models/PostAnswerComment';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.css']
})
export class QuestionanswerComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private router: Router, private answerservice: AnswerService, private fb: FormBuilder, private loginservice: LoginService, public questionservice: QuestionserviceService, public userservice: UserService, private comment: CommentService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = +params.get('id')!;
    })
    this.getQuestionDetails();
    this.getQuestionComments();
    this.getAnswerDetails();
    this.userservice.showhide = false;
  }

  config: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
        {class: 'bahnschrift-semibold', name:'Bahnschrift SemiBold'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      //['bold', 'italic'],
      //['fontSize']
    ]
  };

  questionComments!: QuestionComment[];
  answerDetails1!: AnswerDetails1[];
  answerDetails!: AnswerDetails1[];
  questions!: QuestionTags[];
  questionDetails1!: QuestionDetails1[];
  questionDetails!: QuestionDetails1[];
  id: any;
  count : number = 0;
  answer!: Answer;
  QuestionCommentToggle: boolean = false;
  AnswerCommentToggle: boolean = false;
  questionComment!: PostQuestionComment;
  answerComment!: PostAnswerComment;
  answerCount : number = 0;

  PostAnswerForm = this.fb.group({
    answerId: [null],
    answerBody: ['', Validators.required],
    questionId: [null],
    userId: [null],
    createdDate: [''],
    modifiedDate: ['']
  })

  PostQuestionComment = this.fb.group({
    questionCommentId: [null],
    questionCommentBody: ['', Validators.required],
    questionId: [null],
    userId: [null],
    createdDate: [''],
    modifiedDate: ['']
  })

  PostAnswerComment = this.fb.group({
    answerCommentId: [null],
    answerCommentBody: ['', Validators.required],
    answerId: [null],
    userId: [null],
    createdDate: [''],
    modifiedDate: ['']
  })

  getQuestionDetails() {
    this.questionservice.getQuestionDetails(this.id).subscribe({
      next: (value: QuestionDetails[]) =>
      {
        console.log(value);
        this.questionDetails1 = value.map(element=>{
          let tagjson = JSON.parse(element.tags!);
          let details : QuestionDetails1 = {
            questionId : element.questionId,
            questionTitle : element.questionTitle,
            questionBody : element.questionBody,
            displayName : element.displayName,
            createdDate : element.createdDate,
            questionVotes : element.questionVotes,
            tags : tagjson
          }
          return details;
        });
        this.questionDetails = this.questionDetails1;
      },
      error: (err) => {
        if (err) {
          alert("Something went wrong");
        }
      }
    })
  }

  getAnswerDetails() {
    this.answerservice.getAnswerDetails(this.id).subscribe({
      next: (value: AnswerDetails[]) => {
        this.count = value.length;
        this.answerDetails1 = value.map(element => {
          let commentJson = JSON.parse(element.comments!);
          let answerDetails2: AnswerDetails1 = {
            answerBody: element.answerBody,
            answerId: element.answerId,
            createdDate: element.createdDate,
            displayName: element.displayName,
            questionId: element.questionId,
            answerVotes: element.answerVotes,
            comments: commentJson
          }
          return answerDetails2
        });

        console.log(this.answerDetails1);
        console.log(value);
        this.answerDetails = this.answerDetails1;
      },
      error: (err) => {
        if (err) {
          alert("Something went wrong");
        }
      }
    })
  }

  postAnswers() {
    if (localStorage.getItem('token')) {
      this.answer = { answerBody: this.PostAnswerForm.value.answerBody, questionId: this.id, userId: this.loginservice.currentuser?.userId };
      console.log(this.answer);

      this.answerservice.postAnswers(this.answer).subscribe({
        next: (value) => { console.log(value); },
        error: (err) => {
          if (err) {
            alert("Something went wrong");
          }
        },
        complete: () => {
          window.location.reload();
          this.reset();
        }
      })
    }
    else {
      alert("Please login to post answer");
      this.router.navigateByUrl("/Login");
    }
  }

  getQuestionComments() {
    this.comment.getQuestionComments(this.id).subscribe({
      next: (value: QuestionComment[]) => { this.questionComments = value; console.log(value) },
      error: (err) => {
        if (err) {
          alert("Something went wrong");
        }
      }
    })
  }

  postQuestionComments() {
    if(localStorage.getItem('token'))
    {
      this.questionComment = { questionCommentBody: this.PostQuestionComment.value.questionCommentBody, questionId: this.id, userId: this.loginservice.currentuser?.userId };
      this.comment.postQuestionComment(this.questionComment).subscribe({
        next: (value) => console.log(value),
        error: (err) => {
          if (err) {
            alert("Something went wrong");
          }
        },
        complete: () => {
          window.location.reload();
        }
      })
    }
    else
    {
      alert("Please login to post comment");
      this.router.navigateByUrl("/Login");
    }
  }

  postAnswerComments(answerId: number) {
    if(localStorage.getItem('token'))
    {
      this.answerComment = { answerCommentBody: this.PostAnswerComment.value.answerCommentBody, answerId: answerId, userId: this.loginservice.currentuser?.userId };
      this.comment.postAnswerComment(this.answerComment).subscribe({
        next: (value) => console.log(value),
        error: (err) => {
          if (err) {
            alert("Something went wrong");
          }
        },
        complete: () => {
          window.location.reload();
        }
      })
    }
    else
    {
      alert("Please login to post comment");
      this.router.navigateByUrl("/Login");
    }
  }

  showHideQuestionComment() {
    this.QuestionCommentToggle = !this.QuestionCommentToggle;
  }

  showHideAnswerComment() {
    this.AnswerCommentToggle = !this.AnswerCommentToggle;
  }

  reset() {
    this.PostAnswerForm = this.fb.group({
      answerId: [null],
      answerBody: [''],
      questionId: [null],
      userId: [null],
      createdDate: [''],
      modifiedDate: ['']
    })
  }

  editor(data:string){
    document.getElementById('Container')!.innerHTML = data;
  }

  answerDisplay(data:string){
    document.getElementById('answerContainer')!.innerHTML = data;
  }

  increment(vote:number){
    vote+=1;
  }

  decrement(vote:number){
    vote-=1;
  }

}
