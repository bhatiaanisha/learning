import { Component, OnInit } from '@angular/core';
import { Token } from 'src/Models/Token';
import { LoginService } from 'src/Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'StackOverflow';

  constructor(private loginservice : LoginService) { }

  ngOnInit(): void {
    this.setcurrentUser();
  }

  setcurrentUser() {

    let data = localStorage.getItem('token')?.toString();
    if (data)
    {
      const token: Token = JSON.parse(data);
      this.loginservice.setcurrentUser(token);
      console.log(data);
    }
    else
    {
      this.loginservice.setcurrentUser();
    }
  }
}
