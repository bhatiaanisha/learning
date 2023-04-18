import React, { useEffect, useState, useMemo } from "react";
import { getAllProducts, getProductById, postProduct, putProduct, deleteProduct } from "../../../services/ProductService";
import Pagination from "../../Pagination";
import { toast } from "react-toastify";

export default function Products() {

    useEffect(() => {
        getProducts();
    })

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    const [productsList, setProductsList] = useState([]);
    async function getProducts(){
        return await getAllProducts().then((response) => {
            const data = response.data;
            setProductsList(data);
        }).catch((error) => {
            console.log(error);
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000
            })
        })
    }

    const PageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return productsList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, PageSize, productsList]);

    return (
        <div>

            {/* GetProducts */}
            <div className="container-fluid mt-3">
                <div className="card shadow">
                    <div className="card-header">
                        <div className="card-title bg-light fs-5 fw-bold">Products</div>
                    </div>
                    <div className="card-body">
                        <table className="table table-striped table-bordered border-1">
                            <caption></caption>
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">ProductId</th>
                                    <th scope="col">ProductName</th>
                                    <th scope="col">SubCategoryName</th>
                                    <th scope="col">CompanyName</th>
                                    <th scope="col">IsRated</th>
                                    <th scope="col">Ratings</th>
                                    <th scope="col">DiscountedPrice</th>
                                    <th scope="col">OriginalPrice</th>
                                    <th scope="col">ProductImageUrl</th>
                                    <th scope="col">CreatedDate</th>
                                    <th scope="col">ModifiedDate</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {currentTableData.map((product, i) =>
                                    <tr key={i}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.subCategoryName}</td>
                                        <td>{product.companyName}</td>
                                        <td>{product.isRated ? "true" : "false"}</td>
                                        <td>{product.ratings}</td>
                                        <td>Rs {product.discountedPrice.toLocaleString()}</td>
                                        <td>Rs {product.originalPrice.toLocaleString()}</td>
                                        <td><img src={product.productImageUrl} height={200} width={250} alt="" /></td>
                                        <td>{longEnUSFormatter.format(new Date(product.createdDate))}</td>
                                        <td>{longEnUSFormatter.format(new Date(product.modifiedDate))}</td>

                                        {/* eslint-disable-next-line */}
                                        <td><a type="button" data-bs-toggle="modal" data-bs-target="#EditModal"><em className="fa-solid fa-pen text-primary"></em></a></td>

                                        {/* eslint-disable-next-line */}
                                        <td><a type="button"><em className="fa-solid fa-trash-can text-primary"></em></a></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={productsList.length}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddModal"><em className="fa-solid fa-plus text-white me-1"></em>Add Product</button>
                    </div>
                </div>
            </div>

        </div>
    );
}