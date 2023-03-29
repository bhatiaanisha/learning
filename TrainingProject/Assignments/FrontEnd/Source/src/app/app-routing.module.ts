import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { TagsComponent } from './admin/tags/tags.component';
import { AskquestionComponent } from './askquestion/askquestion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { SignupComponent } from './signup/signup.component';
import { TagComponent } from './tag/tag.component';
import { GuardService } from 'src/Services/guard.service';
import { QuestionanswerComponent } from './questionanswer/questionanswer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "SignUp", component: SignupComponent },
  { path: "Login", component: LoginComponent },
  { path: "questions", component: QuestionComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate : [GuardService],
    children:[
      {
        path:"questions",component:QuestionsComponent
      },
      {
        path:"tags",component:TagsComponent
      }
    ]
  },
  {path:"tags",component:TagComponent},
  {path:"question/ask",component:AskquestionComponent},
  {path:"questions/:id",component:QuestionanswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
