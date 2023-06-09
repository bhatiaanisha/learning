import React, { useEffect, useState } from "react";
import { getCategory, postCategory, deleteCategory, getCategoryById, putCategory } from "../../../services/CategoryService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getFurnitureItems } from "../../../services/FurnitureItemsService";
import { NavLink } from "react-router-dom";
import { Pagination } from "@mui/material";
import usePagination from "../../Paging";

export default function Category(){
    
    useEffect(() => {
        getCategories();
        getAllItems();
    },[])
    
    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    
    const { reset, handleSubmit, register, formState:{errors} } = useForm();
    const [page, setPage] = useState(1);
    
    // Fetch all categories
    const [categoryList, setCategoryList] = useState([]);
    function getCategories(){
        getCategory().then((response) => {
            const data = response.data;
            setCategoryList(data);
        }).catch((error) => {
            toast.error('Server Error',{
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            console.log(error);
        })
    }
    
    // Fetch category by id to fill the edit form
    const [categoryItem, setCategoryItem] = useState({
        Id : 0,
        Name : '',
        ItemId : 0,
        CreatedDate : ''
    });
    function getById(categoryId){
        getCategoryById(categoryId).then((response) => {
            const data = response.data;
            setCategoryItem({
                Id : data.categoryId,
                Name : data.categoryName,
                ItemId : data.furnitureItemId,
                CreatedDate : data.createdDate
            });
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }
    
    // Add category
    const [furnitureItemId, setFurnitureItemId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const onsubmit = (data) => {
        let AddCategoryForm = {
            furnitureItemId : furnitureItemId,
            categoryName : categoryName
        }
        addCategory(AddCategoryForm);
        reset(data.values);
    }
    
    function addCategory(data){
        postCategory(data).then(() => {
            toast.success('Added Category Successfully',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            getCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }
    
    // Update Category
    function updateCategory(e){
        e.preventDefault();
        let UpdateCategoryForm = {
            categoryId : categoryItem.Id,
            furnitureItemId : categoryItem.ItemId,
            categoryName : categoryItem.Name,
            createdDate : categoryItem.CreatedDate
        }
        putCategory(UpdateCategoryForm.categoryId,UpdateCategoryForm).then(() => {
            toast.success('Updated Category Successfully',{
                position:"bottom-right",
                autoClose:1000,
                style:{fontSize:"14px"}
            })
            getCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }
    
    // Delete Category
    function categoryDelete(categoryId){  
        deleteCategory(categoryId).then(() => {
            toast.success('Deleted Category Successfully',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            getCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }
    
    // Fetch furniture items to fill option values in select tag for add category form
    const [items, setItems] = useState();
    function getAllItems(){
        getFurnitureItems().then((response) => {
            const data = response.data;
            setItems(data);
        }).catch((error) => {
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            });
            console.log(error);
        })
    }
    
    //Pagination code
    const per_page = 8;
    const count = Math.ceil(categoryList.length / per_page);
    const _Data = usePagination(categoryList,per_page);

    const handlePageChange = (e,p) => {
        setPage(p);
        _Data.jump(p);
    }
    
    return(
        <div>

            {/* GetCategory */}
            <div className="container-fluid mt-3">
                <div className="card shadow">
                    <div className="card-header">
                        <div className="card-title bg-light fs-5 fw-bold">Category</div>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-bordered border-1">
                            <caption></caption>
                            <thead className="text-center">
                            <tr>
                                <th scope="col">CategoryId</th>
                                <th scope="col">FurnitureItemName</th>
                                <th scope="col">CategoryName</th>
                                <th scope="col">CreatedDate</th>
                                <th scope="col">ModifiedDate</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                                {_Data.currentData().map((category,i) =>
                                    <tr key={i}>
                                        <td>{category.categoryId}</td>
                                        <td>{category.furnitureItemName}</td>
                                        <td>{category.categoryName}</td>
                                        <td>{longEnUSFormatter.format(new Date(category.createdDate))}</td>
                                        <td>{longEnUSFormatter.format(new Date(category.modifiedDate))}</td>
                                        
                                        {/* eslint-disable-next-line */}        
                                        <td><NavLink type="button" onClick={() => getById(category.categoryId)} data-bs-toggle="modal" data-bs-target="#EditModal"><em className="fa-solid fa-pen text-primary"></em></NavLink></td>
                                        
                                        {/* eslint-disable-next-line */}
                                        <td><NavLink type="button" onClick={() => categoryDelete(category.categoryId)}><em className="fa-solid fa-trash-can text-primary"></em></NavLink></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            count={count}
                            page={page}
                            variant="outlined"
                            color="primary"
                            onChange={handlePageChange}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddModal"><em className="fa-solid fa-plus text-white me-1"></em>Add Category</button>
                    </div>
                </div>
            </div>

            {/* AddCategory Modal */}
            <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="AddModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AddModal">Add Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="furnitureItemId">FurnitureItemId</label>
                                    <div>
                                        <select 
                                            name="items" 
                                            id="furnitureItemId" 
                                            {...register
                                                ('furnitureItemId',
                                                    {   
                                                        pattern:{value:/^[0-9+-]+$/,message:"Field is required"},
                                                        onChange:(e) => setFurnitureItemId(e.target.value)
                                                    }
                                                )
                                            }
                                        >
                                            <option>Select</option>
                                            {items?.map((item,i) => 
                                                <option key={i} value={item.furnitureItemId}>{item.furnitureItemName}</option>
                                            )}
                                        </select>
                                        {errors.furnitureItemId && <p className="text-danger small-font">{errors.furnitureItemId.message}</p>}
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="categoryName">CategoryName</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="categoryName" 
                                        {...register
                                            ('categoryName',
                                                {
                                                    required:{value:true,message:"Field is required"},
                                                    onChange:(e) => setCategoryName(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.categoryName && <p className="text-danger small-font">{errors.categoryName.message}</p>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* EditCategory Modal */}
            <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="EditModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="EditModal">Edit Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="Id">CategoryId</label>
                                    <input 
                                        readOnly 
                                        className="form-control" 
                                        id="Id" 
                                        value={categoryItem.Id}
                                        {...register
                                            ('Id',
                                                {
                                                    onChange:(e) => setCategoryItem({...categoryItem,Id: e.target.value})
                                                }
                                            )
                                        } 
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ItemId">FurnitureItemId</label>
                                    <input 
                                        readOnly 
                                        className="form-control" 
                                        id="ItemId" 
                                        value={categoryItem.ItemId}
                                        {...register
                                            ('ItemId',
                                                {
                                                    onChange:(e) => setCategoryItem({...categoryItem,ItemId: e.target.value})
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Name">CategoryName</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="Name" 
                                        value={categoryItem.Name}
                                        {...register
                                            ('Name',
                                                {
                                                    onChange:(e) => setCategoryItem({...categoryItem,Name: e.target.value})
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateCategory}>Update</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}