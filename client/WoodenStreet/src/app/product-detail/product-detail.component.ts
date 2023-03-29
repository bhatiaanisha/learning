import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailDTO } from 'src/Models/Product';
import { ProductService } from 'src/Services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private productservice:ProductService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      this.id = +params.get('id')!;
    });
    this.getProductDetailsById();
  }

  id : any;
  productDetails! : ProductDetailDTO[];

  getProductDetailsById(){
    this.productservice.getProductDetails(this.id).subscribe({
      next:(value) => {
        console.log(value);
        this.productDetails = value;
      },
      error:(err) => {
        if(err)
        {
          this.toaster.error(err);
        }
      }
    })
  }
}
