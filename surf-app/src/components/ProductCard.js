import React, { useContext } from 'react'
import './productCard.css'
import { useApi } from '../services/axios.service'
import { useLocalStorage } from '../services/localStorage.service';
import ToastMessenger, { ToastProvider, useToasts } from '../services/toasts/toastService';
import { setCart } from '../services/cart.service';
import { Context } from '../App';
import { Link } from 'react-router-dom';


export default function ProductCard({ id, name, price, brand, size, color, style, description, image, rating, quantity, product_id, customer_id, total }) {

    const http = useApi();
    const ls = useLocalStorage();
    const { cart, addItem, removeItem } = useContext(Context);
    let user = ls.getUser();
    const toast = useToasts();
    const setCart = addItemToCart

    function addItemToCart() {

        addItem({
            id,
            name,
            price,
            brand,
            size,
            color,
            style,
            description,
            image
        })
        toast.success("Your Item has been added to cart, Gnarly!")
    }

    

    return (
        <div className='product-card'>
            <Link to={'/product/' + id}>
                <img className='image' src={image} />
            </Link>

            <div className='product-info'>
                <h4 className='product-name'>{name}</h4>
                <h4 className='brand'>{brand}</h4>
                <h4 className='price'>${price}</h4>
                {/* <h4 className='description'>{description}</h4> */}

                <button
                    onClick={addItemToCart}
                    className='add-button'
                >
                    <span> Add to Cart</span>
                </button>
            </div>
        <ToastMessenger />
        </div>

    )
}