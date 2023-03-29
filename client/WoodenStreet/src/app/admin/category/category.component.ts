import { Component, OnInit } from '@angular/core';
import { Category, CategoryCustom } from 'src/Models/Category';
import { CategoryService } from 'src/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryservice:CategoryService,private toaster:ToastrService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  categories! : CategoryCustom[];
  p:number = 1;
  totalItems! : number;
  category! : Category;

  AddCategory = this.fb.group({
    furnitureItemId: [null,[Validators.required]],
    categoryName: ['',Validators.required],
    imageUrl: [''],
    createdDate: [''],
    modifiedDate: ['']
  })

  getAllCategories(){
    this.categoryservice.getCategory().subscribe({
      next:(value) => {
        this.categories = value;
        this.totalItems = value.length;
      },
      error:(err) => {
        if(err)
        {
          this.toaster.error(err);
        }
      }
    })
  }

  postCategories(){
    this.category = {furnitureItemId:this.AddCategory.value.furnitureItemId,categoryName:this.AddCategory.value.categoryName,imageUrl:this.AddCategory.value.imageUrl};
    this.categoryservice.postCategory(this.category).subscribe({
      next:() => this.getAllCategories(),
      error:(err) => {
        if(err)
        {
          this.toaster.error(err);
        }
      },
      complete:() => {
        this.toaster.success("Category Added Successfully");
      }
    })
  }

}
