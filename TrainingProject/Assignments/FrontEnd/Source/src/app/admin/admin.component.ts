import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from 'src/Services/questionservice.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public questionservice : QuestionserviceService,private userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.showhide = true;
  }
}
