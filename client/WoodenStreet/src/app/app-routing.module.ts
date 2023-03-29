import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from 'src/Services/guard.service';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductsComponent } from './admin/products/products.component';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [GuardService],
    children:[
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'subcategory', component: SubcategoryComponent
      },
      {
        path: 'products', component: ProductsComponent
      }
    ]
  },
  {path: 'products', component: ProductComponent},
  {path: 'products/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
