import React, { useEffect, useState, useMemo } from "react";
import { getAllProducts, getProductById, postProduct, putProduct, deleteProduct } from "../../../services/ProductService";
import Pagination from "../../Pagination";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getSubCategory } from "../../../services/SubCategoryService";
import storage from '../../firebaseConfig';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import '../products/Products.css';

export default function Products() {

    useEffect(() => {
        getProducts();
        getSubCategories();
    },[])

    const { reset, handleSubmit, register, formState: { errors } } = useForm();

    const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Fetch all products
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

    // Fetch subCategories to fill option values for add product form
    const [subCategory, setSubCategory] = useState();
    async function getSubCategories(){
        return await getSubCategory().then((response) => {
            const data = response.data;
            setSubCategory(data);
        }).catch((error) => {
            console.log(error);
            toast.error('Server Error', {
                position: "bottom-right",
                autoClose: 1000
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
            isRated : isRated,
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
        console.log(AddProductForm);
        //addProducts(AddProductForm);
        reset(data.values);
        document.getElementsByClassName("progressBar")[0].style.width = "0%";
        setImageUrl('');
    }

    async function addProducts(data){
        return await postProduct(data).then(() => {
            toast.success('Added Product Successfully',{
                position:"bottom-right",
                autoClose: 1000
            })
            getProducts();
        }).catch((error) => {
            console.log(error);
            toast.error('Error',{
                position:"bottom-right",
                autoClose: 1000
            })
        })
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

    // Pagination code
    const PageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const productsData = useMemo(() => {
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
                                {productsData.map((product, i) =>
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

            {/* AddProducts Modal */}
            <div className="modal fade" id="AddModal" tabIndex="-1" aria-labelledby="AddModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="AddModal">Add Product</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit(onAddProductSubmit)}>
                            <div className="modal-body">
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
                                                    required: { value: true, message: "Field is required" },
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
                                                    required: { value: true, message: "Field is required" },
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
                                        <div className="progress-bar progress-bar-striped progressBar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: `${percent}`}}>{percent}%</div>
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
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}