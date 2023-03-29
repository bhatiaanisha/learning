import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayArray!:string[];

  reloadCurrentPage() {
    window.location.reload();
  }

  constructor(public userservice: UserService) {
    this.displayArray = new Array('system admin', 'developer', 'data scientist','game developer','mobile developer');

    setInterval(() => this.changeHeading(),1000);
  }

  ngOnInit(): void {
    document.getElementById('collapseExample')?.classList.remove('show');
    this.userservice.showhide = true;
  }


  changeHeading() {
    let data = document.getElementById('rotatorValue');
    let arrayIndex = this.displayArray.findIndex(element => element === data!.innerText);
    arrayIndex++;
    if (arrayIndex == this.displayArray.length) {
      arrayIndex = 0;
    }
    data!.innerText = this.displayArray[arrayIndex];
  }


}
