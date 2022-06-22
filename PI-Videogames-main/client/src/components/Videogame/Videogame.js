import React from 'react';
import { NavLink } from 'react-router-dom';
import './Videogame.css';

export default function Videogame() {
    return (
        <header className="videogame">
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