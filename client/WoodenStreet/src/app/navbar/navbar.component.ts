import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login.service';
import { FurnitureItem } from 'src/Models/FurnitureItem';
import { FurnitureService } from 'src/Services/furniture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginservice:LoginService,private furnitureservice:FurnitureService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getAllFurnitureItems();
  }

  furnitureItems! : FurnitureItem[];

  getAllFurnitureItems(){
    this.furnitureservice.getFurnitureItems().subscribe({
      next:(value:FurnitureItem[]) => {
        this.furnitureItems = value;
      },
      error:(err) => {
        if(err)
        {
          this.toaster.error("Error");
        }
      }
    })
  }

}
