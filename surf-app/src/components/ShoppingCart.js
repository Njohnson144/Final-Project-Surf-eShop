import { useApi } from '../services/axios.service'
import { useNavigate } from "react-router-dom";
import './ShoppingCart.css'
import { useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../services/localStorage.service';
import { Context } from '../App';

export default function ShoppingCart() {

    const { cart, addItem, removeItem } = useContext(Context);

    const http = useApi();
    const ls = useLocalStorage();
    const navigate = useNavigate();

    let user = ls.getUser();

    let subTotal = calculateTotalPrice(cart);
    const tax = .07 * subTotal;
    const shipping = 15.00;
    const grandTotal = subTotal + tax + shipping;

    function getUserShoppingCart() {
        console.log("cart is already provided from context", cart)
    }

    function onDecrease(itemId, quantity) {
        // remove item(itemId)
    }

    function onIncrease(itemId) {
        addItem(itemId).then((itemId,) => {
            addItem(cart.item);
        }).catch((err) => {
            console.error('There was an error adding item to cart')
        })
    }

    function calculateTotalPrice(cart) {
        let sum = 0;
        // calculate sum of individual price of every item

        for (let i = 0; i < cart.length; i++) {
            sum += cart[i]?.price * cart[i]?.quantity;
        }
        return sum;
    }

    function handleCheckout() {
        http.createTransaction(user.id, grandTotal, cart,)
            .then(res => {

                navigate(`/orderconfirm/${res.data.transactionId}`);
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUserShoppingCart();
    }, []);

    return (
        <div className="shopping-cart-root"
            onSubmit={handleCheckout}>
            <h2 className="cart-header">Surf Wagon</h2>
            <div>
                {cart?.length === 0 &&
                    <div className="empty-cart">
                        Cart Is Empty
                    </div>}
            </div>
            <div className="cart-container">

                <div className="shopping-cart-items">
                    {cart.map((item) => (
                        <CartItem key={item?.id}
                            {...item}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                        />
                    ))}
                </div>

                {cart?.length !== 0 && (
                    <div className="cart-summary-container">
                        <h4 className="summary-header">Order Summary</h4>
                        <div>
                            <div>Sub Total</div>
                            <div>${subTotal.toFixed(2)}</div>
                        </div>
                        <div className="taxes">
                            <div>Tax</div>
                            <div>{tax?.toFixed(2)}</div>
                        </div>
                        <div className="shipping">
                            <div>Shipping Cost</div>
                            <div>${shipping?.toFixed(2)}</div>
                        </div>
                        <div className="total-cost">
                            <h4>Total Price</h4>
                            <h4>${grandTotal?.toFixed(2)}</h4>

                        </div>

                        <button type="button"
                            onClick={handleCheckout}
                            className="checkout-btn"
                        >
                            Checkout
                        </button>

                    </div>
                )}
            </div>
        </div>
    )
}

function CartItem({ id, name, price, quantity, image }) {

    const { cart, addItem, removeItem, increaseQuantity, decreaseQuantity } = useContext(Context);

    return (
        <div key={id} className="item-row-container">
            <div className='cart-item-image-frame'>
                <img src={image}/>
            </div>

            <div className="item-name">
                <div>{name}</div>
                <div>${price?.toFixed(2)}</div>
            </div>
            <div className="quantity-btn">
                <button
                    onClick={() => { 
                        increaseQuantity(id) 
                    }}
                    className="add">
                    +
                </button>
                <button
                    onClick={() => { 
                        if (quantity == 1){
                            removeItem(id)
                        } else {
                            decreaseQuantity(id)
                        }
                        
                     }}
                    className="remove">
                    -
                </button>
            </div>
            <div className="item-quantity">
                <span>qty</span>  {quantity}
            </div>
            <div className="item-price">
                ${price * quantity?.toFixed(2)}
            </div>
        </div>
    )
}