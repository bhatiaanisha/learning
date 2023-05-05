import React, { useEffect, useState } from "react";
import { getAllProducts, postProduct, putProduct, getProductDetailsById, deleteProduct } from "../../../services/ProductService";
import { deleteImage } from "../../../services/ImageService";
import { deleteProductOverview } from "../../../services/ProductOverview";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getSubCategory } from "../../../services/SubCategoryService";
import storage from '../../firebaseConfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import '../products/Products.css';
import { NavLink } from "react-router-dom";
import { Pagination } from "@mui/material";
import usePagination from "../../Paging";

export default function Products() {
    console.log("re-render");
    useEffect(() => {
        getProducts();
        getSubCategories();
    },[])

    const { reset, handleSubmit, register, formState: { errors } } = useForm(); 
    const [page, setPage] = useState(1);

    // Fetch all products
    const [productsList, setProductsList] = useState([]);
    function getProducts(){
        getAllProducts().then((response) => {
            const data = response.data;
            setProductsList(data);
        }).catch((error) => {
            console.log(error);
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Fetch subCategories to fill option values for add product form
    const [subCategory, setSubCategory] = useState();
    function getSubCategories(){
        getSubCategory().then((response) => {
            const data = response.data;
            setSubCategory(data);
        }).catch((error) => {
            console.log(error);
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Fetch the data of product,image and overview table to fill the edit form based on product id
    const [productEditDetails, setProductEditDetails] = useState({
        Id : 0,
        SubCategoryId : 0,
        ProductName : '',
        CompanyName : '',
        IsRated : true,
        Ratings : 0,
        Reviews : 0,
        OriginalPrice : 0,
        DiscountedPrice : 0,
        ProductCreated : '',
        ImageId : 0,
        ImageUrl : '',
        ImageCreated : '',
        ProductOverviewId : 0,
        Seater : '',
        Material : '',
        Color : '',
        DimensionsInInch : '',
        Mechanism : '',
        DimensionsInCm : '',
        Foam : '',
        WeightCapacity : '',
        Width : '',
        Warranty : '',
        ShipsIn : '',
        DeliveryCondition : '',
        SKU : '',
        OverviewCreated : ''
    })
    function getProductEditDetails(productId){
        getProductDetailsById(productId).then((response) => {
            const data = response.data[0];
            setProductEditDetails({
                Id : data.productId,
                SubCategoryId : data.subCategoryId,
                ProductName : data.productName,
                CompanyName : data.companyName,
                IsRated : data.isRated,
                Ratings : data.ratings,
                Reviews : data.reviews,
                OriginalPrice : data.originalPrice,
                DiscountedPrice : data.discountedPrice,
                ProductCreated : data.productCreatedDate,
                ImageId : data.imageId,
                ImageUrl : data.productImageUrl,
                ImageCreated : data.imageCreatedDate,
                ProductOverviewId : data.productOverviewId,
                Seater : data.seater,
                Material : data.material,
                Color : data.color,
                DimensionsInInch : data.dimensionsInInch,
                Mechanism : data.mechanism,
                DimensionsInCm : data.dimensionsInCm,
                Foam : data.foam,
                WeightCapacity : data.weightCapacity,
                Width : data.width,
                Warranty : data.warranty,
                ShipsIn : data.shipsIn,
                DeliveryCondition : data.deliveryCondition,
                SKU : data.sku,
                OverviewCreated : data.overviewCreatedDate
            })
            console.log("ProductEditDetails = ",productEditDetails);
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Add Product
    const [subCategoryId, setSubCategoryId] = useState();
    const [productName, setProductName] = useState();
    const [companyName, setCompanyName] = useState();
    const [isRated, setIsRated] = useState();
    const [ratings, setRatings] = useState();
    const [reviews, setReviews] = useState();
    const [originalPrice, setOriginalPrice] = useState();
    const [discountedPrice, setDiscountedPrice] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [seater, setSeater] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [dimensionsInInch, setDimensionsInInch] = useState('');
    const [mechanism, setMechanism] = useState('');
    const [dimensionsInCm, setDimensionsInCm] = useState('');
    const [foam, setFoam] = useState('');
    const [weightCapacity, setWeightCapacity] = useState('');
    const [width, setWidth] = useState('');
    const [warranty, setWarranty] = useState('');
    const [shipsIn, setShipsIn] = useState('');
    const [deliveryCondition, setDeliveryCondition] = useState('');
    const [sku, setSku] = useState('');

    const onAddProductSubmit = (data) => {
        let AddProductForm = {
            subCategoryId : subCategoryId,
            productName : productName,
            companyName : companyName,
            isRated :  Boolean(isRated),
            ratings : ratings,
            reviews : reviews,
            originalPrice : originalPrice,
            discountedPrice : discountedPrice,
            images : [{
                productImageUrl : imageUrl
            }],
            productOverviews : [{
                seater : seater,
                material : material,
                color : color,
                dimensionsInInch : dimensionsInInch,
                mechanism : mechanism,
                dimensionsInCm : dimensionsInCm,
                foam : foam,
                weightCapacity : weightCapacity,
                width : width,
                warranty : warranty,
                shipsIn : shipsIn,
                deliveryCondition : deliveryCondition,
                sku : sku
            }]
        }
        addProducts(AddProductForm);
        reset(data.values);
        document.getElementsByClassName("progressBar")[0].style.width = "0%";
        setImageUrl('');
    }

    function addProducts(data){
        postProduct(data).then(() => {
            toast.success('Added Product Successfully',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
            getProducts();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Update Product
    function updateProduct(e){
        e.preventDefault();
        let UpdateProductForm = {
            productId : productEditDetails.Id,
            subCategoryId : productEditDetails.SubCategoryId,
            productName : productEditDetails.ProductName,
            companyName : productEditDetails.CompanyName,
            isRated : productEditDetails.IsRated,
            ratings : productEditDetails.Ratings,
            reviews : productEditDetails.Reviews,
            originalPrice : productEditDetails.OriginalPrice,
            discountedPrice : productEditDetails.DiscountedPrice,
            createdDate : productEditDetails.ProductCreated,
            images : [{
                imageId : productEditDetails.ImageId,
                productImageUrl : productEditDetails.ImageUrl,
                createdDate : productEditDetails.ImageCreated
            }],
            productOverviews : [{
                productOverviewId : productEditDetails.ProductOverviewId,
                seater : productEditDetails.Seater,
                material : productEditDetails.Material,
                color : productEditDetails.Color,
                dimensionsInInch : productEditDetails.DimensionsInInch,
                mechanism : productEditDetails.Mechanism,
                dimensionsInCm : productEditDetails.DimensionsInCm,
                foam : productEditDetails.Foam,
                weightCapacity : productEditDetails.WeightCapacity,
                width : productEditDetails.Width,
                warranty : productEditDetails.Warranty,
                shipsIn : productEditDetails.ShipsIn,
                deliveryCondition : productEditDetails.DeliveryCondition,
                sku : productEditDetails.SKU,
                createdDate : productEditDetails.OverviewCreated
            }]
        }
        putProduct(UpdateProductForm.productId,UpdateProductForm).then(() => {
            toast.success('Updated Product Successfully',{
                position:"bottom-right",
                autoClose:1000,
                style:{fontSize:"14px"}
            })
            getProducts();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    function imageDelete(productId){
        deleteImage(productId).then().catch((error) => {
            console.log(error);
            toast.error('Image Deleting Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    function productOverviewDelete(productId){
        deleteProductOverview(productId).then().catch((error) => {
            console.log(error);
            toast.error('Product Overview Deleting Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    // Delete Product with deleting all its children records as well
    function productDelete(productId){
        deleteProduct(productId).then(() => {
            toast.success('Deleted Product Successfully',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        }).catch((error) => {
            console.log(error);
            toast.error('Product Deleting Error',{
                position:"bottom-right",
                autoClose: 1000,
                style:{fontSize:"14px"}
            })
        })
    }

    function deleteProductWithDescendants(productId){
       imageDelete(productId);
       productOverviewDelete(productId);
       productDelete(productId);
       getProducts();
    }

    // Code for uploading image to firebase and storing url in image field

    // State to store uploaded file
    const [file, setFile] = useState('');

    //progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    //const [image, setImage] = useState();
    function handleUpload(){
        if(!file)
        {
        alert("Choose file first");
        }
        const storageRef = ref(storage, `/uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageUrl(url);
                });
            }
        );
    }

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    //Pagination code
    const per_page = 2;
    const count = Math.ceil(productsList.length / per_page);
    const _Data = usePagination(productsList,per_page);

    const handlePageChange = (e,p) => {
        setPage(p);
        _Data.jump(p);
    }

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
                                {_Data.currentData().map((product, i) =>
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
                                        <td><NavLink type="button" onClick={() => getProductEditDetails(product.productId)} data-bs-toggle="modal" data-bs-target="#EditModal"><em className="fa-solid fa-pen text-primary"></em></NavLink></td>
                                        <td><NavLink type="button" onClick={() => deleteProductWithDescendants(product.productId)}><em className="fa-solid fa-trash-can text-primary"></em></NavLink></td>
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
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AddModal"><em className="fa-solid fa-plus text-white me-1"></em>Add Product</button>
                    </div>
                </div>
            </div>

            {/* AddProducts Modal */}
            <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="AddModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AddModal">Add Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label htmlFor="subCategoryId">SubCategoryId</label>
                                    <div>
                                        <select
                                            name="items"
                                            id="subCategoryId"
                                            {...register
                                                ('subCategoryId',
                                                    {
                                                        pattern: { value: /^[0-9+-]+$/, message: "Field is required" },
                                                        onChange: (e) => setSubCategoryId(e.target.value)
                                                    }
                                                )
                                            }
                                        >
                                            <option>Select</option>
                                            {subCategory?.map((item, i) =>
                                                <option key={i} value={item.subCategoryId}>{item.subCategoryName}</option>
                                            )}
                                        </select>
                                        {errors.subCategoryId && <p className="text-danger small-font">{errors.subCategoryId.message}</p>}
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="productName">ProductName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="productName"
                                        {...register
                                            ('productName',
                                                {
                                                    required: { value: true, message: "Field is required" },
                                                    onChange: (e) => setProductName(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.productName && <p className="text-danger small-font">{errors.productName.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="companyName">CompanyName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="companyName"
                                        {...register
                                            ('companyName',
                                                {
                                                    required: { value: true, message: "Field is required" },
                                                    onChange: (e) => setCompanyName(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.companyName && <p className="text-danger small-font">{errors.companyName.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="isRated">IsRated</label>
                                    <div>
                                        <select
                                            name="items"
                                            id="isRated"
                                            {...register
                                                ('isRated',
                                                    {
                                                        required: { value: true, message: "Field is required" },
                                                        onChange: (e) => setIsRated(e.target.value)
                                                    }
                                                )
                                            }
                                        >
                                            <option>Select</option>
                                            <option>True</option>
                                            <option>False</option>
                                        </select>
                                    </div>
                                    {errors.isRated && <p className="text-danger small-font">{errors.isRated.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ratings">Ratings</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ratings"
                                        {...register
                                            ('ratings',
                                                {
                                                    pattern: { value: /^[0-9+-]+$/, message: "Please enter valid numbers" },
                                                    onChange: (e) => setRatings(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.ratings && <p className="text-danger small-font">{errors.ratings.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="reviews">Reviews</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="reviews"
                                        {...register
                                            ('reviews',
                                                {
                                                    pattern: { value: /^[0-9+-]+$/, message: "Please enter valid numbers" },
                                                    onChange: (e) => setReviews(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.reviews && <p className="text-danger small-font">{errors.reviews.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="originalPrice">OriginalPrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="originalPrice"
                                        {...register
                                            ('originalPrice',
                                                {
                                                    required: { value: true, message: "Field is required" },
                                                    pattern: { value: /^[0-9+-]+$/, message: "Please enter valid numbers" },
                                                    onChange: (e) => setOriginalPrice(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.originalPrice && <p className="text-danger small-font">{errors.originalPrice.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="discountedPrice">DiscountedPrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="discountedPrice"
                                        {...register
                                            ('discountedPrice',
                                                {
                                                    required: { value: true, message: "Field is required" },
                                                    pattern: { value: /^[0-9+-]+$/, message: "Please enter valid numbers" },
                                                    onChange: (e) => setDiscountedPrice(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                    {errors.discountedPrice && <p className="text-danger small-font">{errors.discountedPrice.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="imageUrl">Image</label>
                                    <input 
                                        type="file" 
                                        className="form-control mt-2"
                                        id="imageUrl"
                                        {...register
                                            ('imageUrl',
                                                {
                                                    required : { value: true, message: "Field is required" },
                                                    onChange : (e) => handleChange(e)
                                                }
                                            )
                                        }
                                    />
                                    <br />
                                    <button type="button" className="btn btn-success" onClick={handleUpload}>Upload</button>
                                    <div className="progress mt-4">
                                        <div className="progress-bar progress-bar-striped progressBar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>{percent}%</div>
                                    </div>
                                    {errors.imageUrl && <p className="text-danger small-font">{errors.imageUrl.message}</p>}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="seater">Seater</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="seater"
                                        {...register
                                            ('seater',
                                                {
                                                    onChange: (e) => setSeater(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="material">Material</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="material"
                                        {...register
                                            ('material',
                                                {
                                                    onChange: (e) => setMaterial(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="color">Color</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="color"
                                        {...register
                                            ('color',
                                                {
                                                    onChange: (e) => setColor(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="dimensionsInInch">DimensionsInInch</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dimensionsInInch"
                                        {...register
                                            ('dimensionsInInch',
                                                {
                                                    onChange: (e) => setDimensionsInInch(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="mechanism">Mechanism</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mechanism"
                                        {...register
                                            ('mechanism',
                                                {
                                                    onChange: (e) => setMechanism(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="dimensionsInCm">DimensionsInCm</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dimensionsInCm"
                                        {...register
                                            ('dimensionsInCm',
                                                {
                                                    onChange: (e) => setDimensionsInCm(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="foam">Foam</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="foam"
                                        {...register
                                            ('foam',
                                                {
                                                    onChange: (e) => setFoam(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="weightCapacity">WeightCapacity</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="weightCapacity"
                                        {...register
                                            ('weightCapacity',
                                                {
                                                    onChange: (e) => setWeightCapacity(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="width">Width</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="width"
                                        {...register
                                            ('width',
                                                {
                                                    onChange: (e) => setWidth(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="warranty">Warranty</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="warranty"
                                        {...register
                                            ('warranty',
                                                {
                                                    onChange: (e) => setWarranty(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="shipsIn">ShipsIn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="shipsIn"
                                        {...register
                                            ('shipsIn',
                                                {
                                                    onChange: (e) => setShipsIn(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="deliveryCondition">DeliveryCondition</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="deliveryCondition"
                                        {...register
                                            ('deliveryCondition',
                                                {
                                                    onChange: (e) => setDeliveryCondition(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="sku">SKU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sku"
                                        {...register
                                            ('sku',
                                                {
                                                    onChange: (e) => setSku(e.target.value)
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="submitBtn" type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit(onAddProductSubmit)}>Submit</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EditProducts Modal */}
            <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="EditModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="EditModal">Edit Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div>
                                    <label htmlFor="Id">ProductId</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        id="Id"
                                        value={productEditDetails.Id || 0}
                                        {...register
                                            ('Id',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Id: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <label htmlFor="SubCategoryId">SubCategoryId</label>
                                    <input
                                        readOnly
                                        className="form-control"
                                        id="SubCategoryId"
                                        value={productEditDetails.SubCategoryId || 0}
                                        {...register
                                            ('SubCategoryId',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, SubCategoryId: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ProductName">ProductName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ProductName"
                                        value={productEditDetails.ProductName || ''}
                                        {...register
                                            ('ProductName',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, ProductName: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="CompanyName">CompanyName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="CompanyName"
                                        value={productEditDetails.CompanyName || ''}
                                        {...register
                                            ('CompanyName',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, CompanyName: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="IsRated">IsRated</label>
                                    <input
                                        readOnly
                                        type="text"
                                        className="form-control"
                                        id="IsRated"
                                        value={productEditDetails.IsRated || true}
                                        {...register
                                            ('IsRated',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, IsRated: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Ratings">Ratings</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Ratings"
                                        value={productEditDetails.Ratings || 0}
                                        {...register
                                            ('Ratings',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Ratings: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Reviews">Reviews</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Reviews"
                                        value={productEditDetails.Reviews || 0}
                                        {...register
                                            ('Reviews',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Reviews: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="OriginalPrice">OriginalPrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="OriginalPrice"
                                        value={productEditDetails.OriginalPrice || 0}
                                        {...register
                                            ('OriginalPrice',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, OriginalPrice: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="DiscountedPrice">DiscountedPrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="DiscountedPrice"
                                        value={productEditDetails.DiscountedPrice || 0}
                                        {...register
                                            ('DiscountedPrice',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, DiscountedPrice: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ImageUrl">ImageUrl</label>
                                    <br />
                                    <img src={productEditDetails.ImageUrl} width={450} height={400} alt="" />
                                    {/* <input 
                                        readOnly
                                        type="text" 
                                        className="form-control mt-2"
                                        id="ImageUrl"
                                        {...register
                                            ('ImageUrl',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, ImageUrl: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                    <br />
                                    <button type="button" className="btn btn-success" onClick={handleUpload}>Upload</button>
                                    <div className="progress mt-4">
                                        <div className="progress-bar progress-bar-striped progressBar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}%`}}>{percent}%</div>
                                    </div>
                                    {errors.imageUrl && <p className="text-danger small-font">{errors.imageUrl.message}</p>} */}
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Seater">Seater</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Seater"
                                        value={productEditDetails.Seater || ''}
                                        {...register
                                            ('Seater',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Seater: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="material">Material</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Material"
                                        value={productEditDetails.Material || ''}
                                        {...register
                                            ('Material',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Material: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="color">Color</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Color"
                                        value={productEditDetails.Color || ''}
                                        {...register
                                            ('Color',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Color: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="DimensionsInInch">DimensionsInInch</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="DimensionsInInch"
                                        value={productEditDetails.DimensionsInInch || ''}
                                        {...register
                                            ('DimensionsInInch',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, DimensionsInInch: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Mechanism">Mechanism</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Mechanism"
                                        value={productEditDetails.Mechanism || ''}
                                        {...register
                                            ('Mechanism',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Mechanism: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="DimensionsInCm">DimensionsInCm</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="DimensionsInCm"
                                        value={productEditDetails.DimensionsInCm || ''}
                                        {...register
                                            ('DimensionsInCm',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, DimensionsInCm: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Foam">Foam</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Foam"
                                        value={productEditDetails.Foam || ''}
                                        {...register
                                            ('Foam',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Foam: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="WeightCapacity">WeightCapacity</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="WeightCapacity"
                                        value={productEditDetails.WeightCapacity || ''}
                                        {...register
                                            ('WeightCapacity',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, WeightCapacity: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Width">Width</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Width"
                                        value={productEditDetails.Width || ''}
                                        {...register
                                            ('Width',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Width: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="Warranty">Warranty</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Warranty"
                                        value={productEditDetails.Warranty || ''}
                                        {...register
                                            ('Warranty',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, Warranty: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="ShipsIn">ShipsIn</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ShipsIn"
                                        value={productEditDetails.ShipsIn || ''}
                                        {...register
                                            ('ShipsIn',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, ShipsIn: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="DeliveryCondition">DeliveryCondition</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="DeliveryCondition"
                                        value={productEditDetails.DeliveryCondition || ''}
                                        {...register
                                            ('DeliveryCondition',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, DeliveryCondition: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="SKU">SKU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="SKU"
                                        value={productEditDetails.SKU || ''}
                                        {...register
                                            ('SKU',
                                                {
                                                    onChange: (e) => setProductEditDetails({ ...productEditDetails, SKU: e.target.value })
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateProduct}>Update</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}