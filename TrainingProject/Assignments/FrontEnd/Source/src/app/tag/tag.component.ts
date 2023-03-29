import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/Models/Tag';
import { TagService } from 'src/Services/tag.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(private tagservice:TagService,public userservice:UserService) { }

  ngOnInit(): void {
    document.getElementById('collapseExample')?.classList.remove('show');
    this.getTags();
    this.userservice.showhide = false;
  }

  tags!:Tag[];

  searchText:any;
  getTags(){
    this.tagservice.getTags().subscribe({
      next:(value)=>this.tags = value,
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      }
    })
  }
}
