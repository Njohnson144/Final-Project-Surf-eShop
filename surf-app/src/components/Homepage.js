import React from 'react'
import './homepage.css'
import { useNavigate } from "react-router-dom";
import palm2 from '../assets/images/palm2.jpg';



export default function Homepage() {


  const navigate = useNavigate();

  return (
    <div className="homescreen-root">
      <div className='homepage-wavy'>
        <div className='wavy'>
          <span style={{ "--i": 1 }}>I</span>
          <span style={{ "--i": 2 }}>S</span>
          <span style={{ "--i": 3 }}>L</span>
          <span style={{ "--i": 4 }}>A</span>
          <span style={{ "--i": 5 }}>N</span>
          <span style={{ "--i": 6 }}>D</span>
          <span style={{ "--i": 7 }}>-</span>
          <span style={{ "--i": 8 }}>I</span>
          <span style={{ "--i": 9 }}>M</span>
          <span style={{ "--i": 10 }}>A</span>
          <span style={{ "--i": 11 }}>G</span>
          <span style={{ "--i": 12 }}>E</span>
          <span style={{ "--i": 13 }}>S</span>
        </div>
      </div>

      <div className='home-logo'>
        <img src={palm2} />
      </div>
      <div className="shop-welcome">
        Find your beach
      </div>
      <div>
        <button className="shop-button" onClick={() => {
          navigate('/products')
        }}>
          Shop Here
        </button>
      </div>


    </div >




  )
}
