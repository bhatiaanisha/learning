import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login.service';
import { UserService } from 'src/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  reloadCurrentPage()
  {
    window.location.reload();
  }

  constructor(public loginservice:LoginService,public userservice:UserService,private route:Router) { }

  searchCriteria:any;

  searchData(){
    
  }

  ngOnInit(): void {
    this.userservice.showhide = true;
    this.searchData();
  }

  togglerShowHide()
  {
    this.userservice.showhide = true;
  }

}
