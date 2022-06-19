import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <header className="landingPage">
            <nav>
                <ul className="navLP">
                    <li className="pageTitle"> pageName </li>
                    <button className='signUp'>SIGN UP</button>
                </ul>
            </nav>

            <div>
                <button className='button'>
                    <Link to='/home'>TRY IT FOR FREE</Link>
                </button>
            </div>
            
            <div className='info'>
                <div className='About'></div>
                    <h3>What can you do here?</h3>
                    <p>Search videogames, genres...</p>

                <div className='another info'>Idk what to put here yet</div>
                

                <div className='signingUp'></div>
                    <h3>Sign up for free!</h3>
                    <p>Sign up if you want to receive emails with the latests game info</p>
            </div>
        </header>
    )
}