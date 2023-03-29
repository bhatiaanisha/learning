import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/Models/Product';
import { ProductService } from 'src/Services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productservice:ProductService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  products! : ProductDTO[];

  getAllProducts(){
    this.productservice.getProducts().subscribe({
      next:(value:ProductDTO[]) => {
        this.products = value;
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
