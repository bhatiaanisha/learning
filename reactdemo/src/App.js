import React, { useEffect,useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import Admin from './components/admin/Admin';
import Category from './components/admin/category/Category';
import SubCategory from './components/admin/subcategory/SubCategory';
import Products from './components/admin/products/Products';
import EditProfile from './components/profile/editprofile/EditProfile';
import PageNotFound from './components/PageNotFound';
import { dataService } from './shared/RxJsState';
import Profile from './components/profile/Profile';
import Wishlist from './components/profile/wishlist/Wishlist';

export default function App() {

  const [userData, setUserData] = useState();
  useEffect(() => {
    dataService.getData().subscribe({
      next : (value) => {
        setUserData(value);
      }
    })
  },[]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  if(!isLoaded){
    let data = localStorage.getItem("token");
    if(data)
    {
      const Token = JSON.parse(data);
      dataService.setData(Token);
      setUserData(Token);
    }
    setIsLoaded(true);
  }

  const UserPrivate = ({Component}) => {
    return (userData?.role === "User" || userData?.role === "Admin") === true ? <Component /> : <Navigate to="/login" />
  }

  const AdminPrivate = ({Component}) => {
    return (userData?.role === "Admin") === true ? <Component /> : <Navigate to="/" />
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route 
          path="/products" 
          element={
            <UserPrivate Component={Product} />
          }
        >
        </Route>
        <Route path="/products/:productId" element={<ProductDetail />}></Route>
        <Route
          path="/profile"
          element={
            <UserPrivate Component={Profile} />
          }
        >
          <Route path="edit-profile" element={<EditProfile />}></Route>
          <Route path="wishlist" element={<Wishlist />}></Route>
        </Route>
        <Route 
          path="/admin" 
          element={ 
            <AdminPrivate Component={Admin} />
          }
        >
          <Route path="category" element={<Category />}></Route>
          <Route path="sub-category" element={<SubCategory />}></Route>
          <Route path="admin-products" element={<Products />}></Route>
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}
