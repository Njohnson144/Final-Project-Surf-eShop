
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInPage from './components/login/LogInPage';
import SignUpPage from './components/login/SignUpPage';
// import UserPage from './components/UserPage';
import { createContext, useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { useApi } from './services/axios.service';
import { useLocalStorage } from './services/localStorage.service';
import ProductsDisplay from './components/productsDisplay/ProductsDisplay';
import Homepage from './components/Homepage';
import ShoppingCart from './components/ShoppingCart';
import OrderConfirmPage from './components/OrderConfirmPage';
import PastOrders from './components/PastOrders';
import Nav from './components/navbar/NavBar';
import ProductPage from './components/ProductPage';


export const Context = createContext();

function App() {

  const [products, setProducts] = useState([])
  let [cart, setCart] = useState([])

  // let user = ls.getUser();

  const addItem = (item) => {

    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];

    //assuming we have an ID field in our item

    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == item.id);

    //if item already exists
    if (existingItem) {
      existingItem.quantity++ //update item
    } else { //if item doesn't exist, simply add it
      item.quantity = 1;
      cartCopy.push(item)
    }

    //update app state
    setCart(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart)
  }

  const increaseQuantity = (itemId) => {

    let cartCopy = [...cart];

    //assuming we have an ID field in our item

    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == itemId);

    existingItem.quantity++

    setCart(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  }
  const decreaseQuantity = (itemId) => {

    let cartCopy = [...cart];

    //assuming we have an ID field in our item

    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.id == itemId);

    existingItem.quantity--

    setCart(cartCopy)

    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  }
  const updateItem = (itemId, amount) => {
    let cartCopy = [...cart]

    //find if item exists, just in case
    let existentItem = cartCopy.find(item => item.id == itemId);

    //if it doesnt exist simply return
    if (!existentItem) return

    //continue and update quantity
    existentItem.quantity += amount;

    //validate result
    if (existentItem.quantity <= 0) {
      //remove item  by filtering it from cart array
      cartCopy = cartCopy.filter(item => item.Id != itemId)
    }

    //again, update state and localState
    setCart(cartCopy);

    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const removeItem = (itemId) => {
    let cartCopy = [...cart]

    cartCopy = cartCopy.filter(item => item.id != itemId);

    //update state and local
    setCart(cartCopy);

    let stringCart = JSON.stringify(cart);
    localStorage.removeItem("cart", stringCart)
  }

  const http = useApi();

  function getProducts() {
    http.getAllProducts()
      .then((response) => {
        console.log(response)
        setProducts(response.data.products);
      })
      .catch(() => {
        console.log("error getting all")
      })
  }

  useEffect(() => {
    console.log("app initialized");
    getProducts();

    let localCart = localStorage.getItem("cart");
    //turn it into js
    console.log(localCart);
    //load persisted cart into state if it exists
    if (localCart) {
      localCart = JSON.parse(localCart);
      console.log(localCart);
      setCart(localCart)
    }

  }, []) //the empty array ensures useEffect only runs once

  return (
    <Context.Provider value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity }}>
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products" element={<ProductsDisplay />} />
            <Route path="/products/:category" element={<ProductsDisplay />} />
            <Route path="/products/:category/:style" element={<ProductsDisplay />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orderconfirm/:transactionId" element={<OrderConfirmPage />} />
            <Route path="/transactions" element={<PastOrders />} />
            <Route path="*" element={<div>404 - That Page Does Not Exist</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;

