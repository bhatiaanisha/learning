import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/Models/Tag';
import { TagService } from 'src/Services/tag.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(private tagservice:TagService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getTags();
  }

  tags! : Tag[];
  showhide : boolean = false;
  updateformshow : boolean = false;
  tag! : Tag;
  tagid!: number;

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

  fillform(tag:Tag){
    this.TagForm.setValue(tag);
  }

  TagForm = this.fb.group({
    tagId : [null],
    tagName : ['',Validators.required],
    createdDate : [''],
    modifiedDate : ['']
  })

  getTags(){
    this.tagservice.getTags().subscribe({
      next:(value)=>this.tags=value,
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      }
    })
  }

  postTags(){
    this.tag = {tagName:this.TagForm.value.tagName};
    this.tagservice.postTags(this.tag).subscribe({
      next:(value)=>this.getTags(),
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      },
      complete:()=>{
        alert("Inserted Successfully!");
        this.reset();
      }
    })
  }

  putTags(){
    this.tagid = this.TagForm.value.tagId;
    this.tag = this.TagForm.value;
    this.tagservice.putTags(this.tagid,this.tag).subscribe({
      next:(value)=>this.getTags(),
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      },
      complete:()=>{
        alert("Updated successfully!");
        this.reset();
        this.Addhide();
      }
    })
  }

  deleteTags(id:number){
    this.tagservice.deleteTags(id).subscribe({
      next:()=>{
        this.getTags();
      },
      error:(err)=>{
        if(err)
        {
          alert("Something went wrong");
        }
      },
      complete:()=>{
        alert("Deleted Successfully!");
      }
    })
  }

  reset()
  {
    this.TagForm = this.fb.group({
      tagId : [null],
      tagName : ['',Validators.required],
      createdDate : [''],
      modifiedDate : ['']
    })
  }
}
