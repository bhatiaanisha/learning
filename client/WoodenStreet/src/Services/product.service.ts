import { Injectable } from '@angular/core';
import { ProductDTO,ProductDetailDTO } from 'src/Models/Product';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  appurl = environment.appurl;

  getProducts(){
    return this.http.get<ProductDTO[]>(`${this.appurl}/api/Product`);
  }

  getProductDetails(id:number){
    return this.http.get<ProductDetailDTO[]>(`${this.appurl}/api/Product/${id}`);
  }
}
