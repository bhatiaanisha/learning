import { Component } from '@angular/core';
import { Token } from 'src/Models/Token';
import { LoginService } from 'src/Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WoodenStreet';

  constructor(private loginservice:LoginService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    let data = localStorage.getItem('token')?.toString();
    if(data)
    {
      const token: Token = JSON.parse(data);
      this.loginservice.setCurrentUser(token);
    }
    else
    {
      this.loginservice.setCurrentUser();
    }
  }
}
