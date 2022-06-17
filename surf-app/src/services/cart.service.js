// import { useEffect, useState } from "react"
// import { useLocalStorage } from "./localStorage.service";
// export {cartService}

// const cartService = () => {

//     let [cart, setCart] = useState([])

//     let localCart = useLocalStorage());

//     const addItem = (item) => {
//         let cartCopy = [...cart];

//         //assuming we have an ID field in our item
//         let { id } = item;

//         //look for item in cart array
//         let existingItem = cartCopy.find(cartItem => cartItem.id == id);

//         //if item already exists
//         if (existingItem) {
//             existingItem.quantity += item.quantity //update item
//         } else { //if item doesn't exist, simply add it
//             cartCopy.push(item)
//         }


//         setCart(cartCopy)


//         let stringCart = JSON.stringify(cartCopy);
//     }
//     const updateItem = (itemID, amount) => {
//         let cartCopy = [...cart]

//         //find if item exists, just in case
//         let existentItem = cartCopy.find(item => item.ID == itemID);

//         //if it doesnt exist simply return
//         if (!existentItem) return

//         //continue and update quantity
//         existentItem.quantity += amount;

//         //validate result
//         if (existentItem.quantity <= 0) {
//             //remove item  by filtering it from cart array
//             cartCopy = cartCopy.filter(item => item.ID != itemID)
//         }

//         //again, update state and localState
//         setCart(cartCopy);
//     }

//     const removeItem = (itemID) => { let cartCopy = [...cart]
  
//         cartCopy = cartCopy.filter(item => item.ID != itemID);
        
//         //update state and local
//         setCart(cartCopy);
        
//         let cartString = JSON.stringify(cartCopy)
//         localStorage.setItem('cart', cartString)
//     }

    
//     useEffect(() => {
//         //turn it into js
//         localCart = JSON.parse(localCart);
//         //load persisted cart into state if it exists
//         if (localCart) setCart(localCart)

//     }, []) //the empty array ensures useEffect only runs once



//     return <div></div>
// }






// // function addItem(item){
// //     // put item in 'cart'
// //     localStorage.setItem("cart", [])
// // }

// // const cartService = {
// //     foo: () => {},
// //     bar
// // }

// // function useCart() {
// //     return cartService
// // }

// // export {useCart}