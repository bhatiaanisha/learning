import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { askQuestion, questionTags } from 'src/Models/askQuestion';
import { AskquestionService } from 'src/Services/askquestion.service';
import { Validators } from '@angular/forms';
import { Tag } from 'src/Models/Tag';
import { TagService } from 'src/Services/tag.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/Services/login.service';
import { UserService } from 'src/Services/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-askquestion',
  templateUrl: './askquestion.component.html',
  styleUrls: ['./askquestion.component.css']
})
export class AskquestionComponent implements OnInit {

  constructor(private fb: FormBuilder, private askquestionservice: AskquestionService, private tagservice: TagService, private router: Router, private loginservice: LoginService,public userservice:UserService) { }

  ngOnInit(): void {
    this.getTags();
    this.userservice.showhide = true;
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

  changeTags?: string;
  question!: askQuestion;
  tags!: Tag[];

  AskQuestionForm = this.fb.group({
    questionTitle: ['', Validators.required],
    questionBody: ['', Validators.required],
    userId: [],
    createdDate: [''],
    modifiedDate: [''],
    questionTags: this.fb.array([
      this.fb.group({
        tagId: [null,[Validators.required,Validators.maxLength(5)]]
      })
    ])
  })

  get getQuestionTags() {
    return this.AskQuestionForm.get('questionTags') as FormArray;
  }

  getTags() {
    this.tagservice.getTags().subscribe({
      next: (value) => this.tags = value,
      error: (err) => {
        if (err) {
          alert("Something went wrong");
        }
      }
    })
  }

  postAskQuestion() {
    let questionTagsArry: questionTags[] = this.AskQuestionForm.value.questionTags[0].tagId.map((val: any) => {
      let data: questionTags = {
        tagId: val
      }
      console.log(data);
      return data;
    });
    this.question = { questionTitle: this.AskQuestionForm.value.questionTitle, questionBody: this.AskQuestionForm.value.questionBody, userId: this.loginservice.currentuser?.userId!, questionTags: questionTagsArry };
    this.askquestionservice.postQuestions(this.question).subscribe({
      next: () => console.log(this.question),
      error: (err) => {
        if (err) {
          alert("Something went wrong");
        }
      },
      complete: () => {
        this.router.navigateByUrl("/questions");
      }
    })
  }

}
