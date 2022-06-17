
import React, { useContext, useEffect, useRef, useState, } from 'react'
import { useNavigate } from 'react-router';
import { useApi } from '../services/axios.service'
import { Link, useParams } from 'react-router-dom';
import { useLocalStorage } from '../services/localStorage.service';
import { Context } from '../App';
import ToastMessenger, { useToasts } from '../services/toasts/toastService';
import './ProductPage.css'
import Toast from '../services/toasts/Toast';



export default function ProductPage() {

    let { id } = useParams()
    const http = useApi();
    const ls = useLocalStorage();
    const { cart, addItem, removeItem } = useContext(Context);
    let user = ls.getUser();
    const toast = useToasts();
    const setCart = addItemToCart

    const [product, setProduct] = useState(null)

    function getProductsById() {
        http.getProductById(id)
            .then((response) => {

                console.log(response.data)
                setProduct(response.data.product);
            })
            .catch((err) => {
                console.log("error getting product by id", err)
            })
    }

    useEffect(() => {
        getProductsById();
    }, []);

    function addItemToCart() {

        addItem(product)
        toast.success("Your Item has been added to cart, Gnarly!")
    }

    if (product == null) {
        return <p>no product :(</p>
    } else {


        return (
            <div className='product-page'>

                <img className='image' src={product?.image} />
                <div className='product-info'>
                    <h4 className='product-name'>{product.name}</h4>
                    <h4 className='brand'>{product.brand}</h4>
                    <h4 className='price'>${product.price}</h4>
                    <h4 className='description'>{product.description}</h4>

                    <button
                        onClick=
                        {addItemToCart}
                        className='add-button'

                    >
                        <span> Add to Cart</span>
                    </button>
                </div>
                <ToastMessenger />
            </div>
        )
    }
}

