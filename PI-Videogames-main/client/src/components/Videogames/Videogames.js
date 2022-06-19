import React from 'react';
import { NavLink } from 'react-router-dom';
import './Videogames.css';

export default function Videogames() {
    return (
        <header className="videogames">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink> {/*Con el exact, solo se aplican los estilos cuando se encuentre en el path indicado. */}
                        <NavLink to="/favs" >Favourites</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}