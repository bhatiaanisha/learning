import React, { useState, useEffect } from "react";
import { getSubCategory, getSubCategoryById, postSubCategory, putSubCategory, deleteSubCategory } from "../../../services/SubCategoryService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getCategory } from "../../../services/CategoryService";
import { NavLink } from "react-router-dom";
import { Pagination } from "@mui/material";
import usePagination from "../../Paging";

export default function SubCategory() {

    useEffect(() => {
        getSubCategories();
        getCategories();
    }, [])

    const { reset, handleSubmit, register, formState: { errors } } = useForm();
    const [page, setPage] = useState(1);

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Fetch category data to fill the select box with category names in add sub-category form
    const [category, setCategory] = useState();
    function getCategories() {
        getCategory().then((response) => {
            const data = response.data;
            setCategory(data);
        }).catch((error) => {
            toast.error('Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            });
            console.log(error);
        })
    }

    // Fetch all sub-categories
    const [subCategoryList, setSubCategoryList] = useState([]);
    function getSubCategories() {
        getSubCategory().then((response) => {
            const data = response.data;
            setSubCategoryList(data);
        }).catch((error) => {
            console.log(error);
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Fetch the data of subcategory by id to fill the edit form on click of each subcategory item
    const [subCategoryItem, setSubCategoryItem] = useState({
        Id : 0,
        CategoryId : 0,
        Name : '',
        CreatedDate : ''
    })
    function getASubCategory(id) {
        getSubCategoryById(id).then((response) => {
            const data = response.data;
            console.log("SubCategory",data);
            setSubCategoryItem({
                Id : data.subCategoryId,
                CategoryId : data.categoryId,
                Name : data.subCategoryName,
                CreatedDate : data.createdDate
            })
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Add subcategory
    const [categoryId, setCategoryId] = useState();
    const [subCategoryName, setSubCategoryName] = useState();
    const onAddFormSubmit = (data) => {
        let AddSubCategoryForm = {
            categoryId: categoryId,
            subCategoryName: subCategoryName
        }
        addSubCategory(AddSubCategoryForm);
        reset(data.values);
    }

    function addSubCategory(data) {
        postSubCategory(data).then(() => {
            toast.success('Added SubCategory Successfully', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            getSubCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    //Update subcategory
    function updateSubCategory(e){
        e.preventDefault();
        let UpdateSubCategoryForm = {
            subCategoryId : subCategoryItem.Id,
            categoryId : subCategoryItem.CategoryId,
            subCategoryName : subCategoryItem.Name,
            createdDate : subCategoryItem.CreatedDate
        }
        putSubCategory(UpdateSubCategoryForm.subCategoryId,UpdateSubCategoryForm).then(() => {
            toast.success('Updated SubCategory Successfully',{
                position:"bottom-right",
                autoClose:1000,
                style:{fontSize:"14px"}
            })
            getSubCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    //Delete subcategory
    function deleteSubCategoryById(id){
        deleteSubCategory(id).then(() => {
            toast.success('Deleted SubCategory Successfully',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            getSubCategories();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    //Pagination code
    const per_page = 8;
    const count = Math.ceil(subCategoryList.length / per_page);
    const _Data = usePagination(subCategoryList,per_page);

    const handlePageChange = (e,p) => {
        setPage(p);
        _Data.jump(p);
    }

    return (
        <div>
            {/* GetSubCategory */}
            <div className="container-fluid mt-3">
                <div className="card shadow">
                    <div className="card-header">
                        <div className="card-title bg-light fs-5 fw-bold">SubCategory</div>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-bordered border-1">
                            <caption></caption>
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">SubCategoryId</th>
                                    <th scope="col">CategoryName</th>
                                    <th scope="col">SubCategoryName</th>
                                    <th scope="col">CreatedDate</th>
                                    <th scope="col">ModifiedDate</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {_Data.currentData().map((subcategory, i) =>
                                    <tr key={i}>
                                        <td>{subcategory.subCategoryId}</td>
                                        <td>{subcategory.categoryName}</td>
                                        <td>{subcategory.subCategoryName}</td>
                                        <td>{longEnUSFormatter.format(new Date(subcategory.createdDate))}</td>
                                        <td>{longEnUSFormatter.format(new Date(subcategory.modifiedDate))}</td>

                                        {/* eslint-disable-next-line */}
                                        <td><NavLink type="button" onClick={() => getASubCategory(subcategory.subCategoryId)} data-bs-toggle="modal" data-bs-target="#EditModal"><em className="fa-solid fa-pen text-primary"></em></NavLink></td>

                                        {/* eslint-disable-next-line */}
                                        <td><NavLink type="button" onClick={() => deleteSubCategoryById(subcategory.subCategoryId)}><em className="fa-solid fa-trash-can text-primary"></em></NavLink></td>
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
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddModal"><em className="fa-solid fa-plus text-white me-1"></em>Add SubCategory</button>
                    </div>
                </div>
            </div>

            {/* AddSubCategory Modal */}
            <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="AddModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AddModal">Add SubCategory</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(onAddFormSubmit)}>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="categoryId">CategoryId</label>
                                    <div>
                                        <select
                                            name="items"
                                            id="categoryId"
                                            {...register
                                                ('categoryId',
                                                    {
                                                        pattern: { value: /^[0-9+-]+$/, message: "Field is required" },
                                                        onChange: (e) => setCategoryId(e.target.value)
                                                    }
                                                )
                                            }
                                        >
                                            <option>Select</option>
                                            {category?.map((item, i) =>
                                                <option key={i} value={item.categoryId}>{item.categoryName}</option>
                                            )}
                                        </select>
                                        {errors.categoryId && <p className="text-danger small-font">{errors.categoryId.message}</p>}
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="subCategoryName">SubCategoryName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subCategoryName"
                                        {...register
                                            ('subCategoryName',
                                                {
                                                    required: { value: true, message: "Field is required" },
                                                    onChange: (e) => setSubCategoryName(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.subCategoryName && <p className="text-danger small-font">{errors.subCategoryName.message}</p>}
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
                            <h1 className="modal-title fs-5" id="EditModal">Edit SubCategory</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="Id">SubCategoryId</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        id="Id"
                                        value={subCategoryItem.Id}
                                        {...register
                                            ('Id',
                                                {
                                                    onChange: (e) => setSubCategoryItem({ ...subCategoryItem, Id: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ItemId">CategoryId</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        id="CategoryId"
                                        value={subCategoryItem.CategoryId}
                                        {...register
                                            ('CategoryId',
                                                {
                                                    onChange: (e) => setSubCategoryItem({ ...subCategoryItem, CategoryId: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Name">SubCategoryName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Name"
                                        value={subCategoryItem.Name}
                                        {...register
                                            ('Name',
                                                {
                                                    onChange: (e) => setSubCategoryItem({ ...subCategoryItem, Name: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateSubCategory}>Update</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}