import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navbar.css';

export default function NavBar() {
    const [title, setTitle] = React.useState('')

    return (
        <header className="navbar">
            <nav>
                <ul className="list">
                    <li className="list-item">
                        PageTitle
                        <NavLink exact to="/home">Home</NavLink> {/*Con el exact, solo se aplican los estilos cuando se encuentre en el path indicado. */}
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <div className='searcher'>
                    <input className='searchVg' type='text' value={title} onChange={()=>{}} placeholder='Videogame name...'></input>
                    <button type='submit'>SEARCH</button>
                </div>
                </ul>
            </nav>
        </header>
    )
}