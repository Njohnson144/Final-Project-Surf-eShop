
import React, { useState } from 'react';
import './Nav.css'
import { faShoppingCart, faSnowboarding } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApi } from '../../services/axios.service';
import palm2 from '../../assets/images/palm2.jpg'
import { useLocalStorage } from '../../services/localStorage.service';

export default function Nav() {

    const http = useApi();
    const navigate = useNavigate();
    const { userId } = useParams();
    const ls = useLocalStorage();
    const user = ls.getUser();

    const loginButton = (
        <button className='loginButton' onClick={() => {
            navigate('/login')
        }}>
            Log In
        </button>
    )

    function onLogoutClicked() {
        ls.removeUser()
        navigate('/')
    }
    const logoutButton = (
        <button className='logoutButton' onClick={onLogoutClicked}>
            Log out
        </button>
    )

    const signUpButton = (
        <button className='loginButton' 
        onClick={() => {
            navigate('/signup')
        }}>
            Sign up
        </button>
    )

    return (
        <nav className='.navbar-root'>
            <div className="flex left">
                <Link to="/">
                    <div className="home">
                    <img src={palm2} />
                    </div>
                </Link>
                <Link to="/products">
                    <div className="products">
                        Products
                    </div>
                </Link>

                <div className="flex links">
                    <div className="dropdown-root">

                        <div className="dropdown-container">
                            <div className="hoverable boards">
                                <Link to={'/products/board'}>
                                    Boards
                                </Link>
                            </div>

                            <div className="hidden-menu">
                                <div className="option hoverable dropdown-container">
                                    {/* Style:
                                    <div className="hidden-menu to-right"> */}
                                            <div className="option">
                                        <Link to={"/products/board/short board"}>
                                                Short&nbsp;Boards
                                        </Link>
                                                </div>

                                            <div className="option">
                                        <Link to={"/products/board/long board"}>
                                                Long&nbsp;Boards
                                        </Link>
                                                </div>

                                            <div className="option">
                                        <Link to={"/products/board/soft top"}>
                                                Soft-&nbsp;Tops
                                        </Link>
                                                </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="dropdown-root">

                        <div className="dropdown-container">
                                <div className="hoverable accessories">
                            <Link to={'/products/accessories'}>
                                    Accessories
                            </Link>
                                </div>
                            <div className="hidden-menu">
                                <div className="option hoverable dropdown-container">
                                    {/* Type: */}
                                    {/* <div className="hidden-menu to-right"> */}
                                            <div className="option">
                                        <Link to={'/products/accessories/leash'}>
                                                Leashes 
                                        </Link>
                                            </div>
                                            <div className="option">
                                        <Link to={'/products/accessories/fins'}>
                                                Fins
                                        </Link>
                                            </div>
                                            <div className="option">
                                        <Link to={'/products/accessories/wax'}>
                                                Wax
                                        </Link>
                                            </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="dropdown-root">

                        <div className="dropdown-container">
                                <div className="hoverable wetsuits">
                            <Link to={'/products/wetsuits'}>
                                    Wet Suits
                            </Link>
                                </div>
                            <div className="hidden-menu">
                                <div className="option hoverable dropdown-container">
                                    
                                                                            <div className="option">
                                        <Link to={'/products/wetsuits/full suit'}>
                                                Full
                                        </Link>
                                            </div>
                                            <div className="option">
                                        <Link to={'/products/wetsuits/spring suit'}>
                                                Spring
                                        </Link>
                                            </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>

                
                    
                    {user
                        ? (
                        <Link to="/transactions">
                        <div className='past-orders'>
                        <FontAwesomeIcon icon={faSnowboarding} />
                        </div>
                    </Link>
                    )
                        : <p></p>
                    }
                </div>

                
            </div>


            <div className="nav-bar-right-root">
                <div className='nav-bar-right'>
                    {user ? '' : signUpButton}

                    {user ? logoutButton : loginButton}
                </div>
                <Link to="cart">
                    <div className="checkout">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    </div>
                </Link>
            </div>
        </nav>
    )
}


// {user !== undefined && (
//     <Link to="/transactions">
//         <div className='past-orders'>
//             Past Orders
//         </div>
//     </Link>
    
//     )}
//     {user || <p></p>}

// {true && <p>shows if true</p>}

// {false || <p>shows if false (a backup)</p>}