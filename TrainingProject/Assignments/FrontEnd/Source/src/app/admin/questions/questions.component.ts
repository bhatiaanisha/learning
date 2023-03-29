import { Component, OnInit } from '@angular/core';
import { Question } from 'src/Models/question';
import { QuestionserviceService } from 'src/Services/questionservice.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Token } from 'src/Models/Token';
import { LoginService } from 'src/Services/login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private questionservice:QuestionserviceService,private fb:FormBuilder, private loginService:LoginService) { }

  ngOnInit(): void {
    this.getQuestions();
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

  qid! : number;
  questionId! : number;
  idvalue! : Token ;
  question! : Question;
  showhide : boolean = false;
  updateformshow : boolean = false;
  questions!:Question[];
  totalItems! : number;
  p:number = 1;

  AddQuestionForm = this.fb.group({
    questionId : [null],
    questionTitle : ['',Validators.required],
    questionBody : ['',Validators.required],
    userId : [null],
    createdDate : [''],
    modifiedDate : ['']
  })

  UpdateQuestionForm = this.fb.group({
    questionId : [],
    questionTitle : ['',Validators.required],
    questionBody : ['',Validators.required],
    userId : [],
    createdDate : [''],
    modifiedDate : ['']
  })


  fillform(question:Question){
    this.UpdateQuestionForm.patchValue(question);
  }

  getId(question:Question){
    this.qid = question.questionId!;
  }

  Addshow(){
    this.showhide = true;
  }

  Addhide(){
    this.showhide = false;
  }

  UpdateShow(){
    this.updateformshow = true;
  }

  UpdateHide(){
    this.updateformshow = false;
  }

  getQuestions(){
    this.questionservice.getQuestions().subscribe({
      next:(value:Question[])=>{this.questions = value;this.totalItems=value.length},
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
        console.log(err)
      }
    })
  }

  postQuestions(){
    console.log(this.AddQuestionForm.value);
    this.question = {questionTitle:this.AddQuestionForm.value.questionTitle,questionBody:this.AddQuestionForm.value.questionBody,userId : this.loginService.currentuser?.userId!}
    this.questionservice.postQuestions(this.question).subscribe({
      next:()=>this.getQuestions(),
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
        console.log(err);
      },
      complete:()=>{
        alert("Question successfully inserted!");
        this.Addhide();
      }
    })
  }

putQuestions(){
  this.questionId = this.UpdateQuestionForm.value.questionId,
  this.question = this.UpdateQuestionForm.value
  this.questionservice.putQuestions(this.questionId,this.question).subscribe({
    next:()=>this.getQuestions(),
    error:(err)=>{
      if(err)
      {
        alert("Something went wrong");
      }
      console.log(err);
    },
    complete:()=>{
      alert("Question successfully updated!");
      this.UpdateHide();
    }
  })
}

deleteQuestions(id:number){
  this.questionservice.deleteQuestions(id).subscribe({
    next:()=>this.getQuestions(),
    error:(err)=>{
      if(err)
      {
        alert("Something went wrong");
      }
      console.log(err);
    },
    complete:()=>{
      alert("Question successfully deleted!");
    }
  })
}

}
