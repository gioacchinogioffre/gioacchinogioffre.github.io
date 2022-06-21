import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getVideogames } from '../../actions/index';
import { connect } from 'react-redux';
// import './Navbar.css';

export function NavBar() {
    const [title, setTitle] = useState('')

    function handleOnChange(e) {
        setTitle(e.target.value)
    }

    function handleOnClick(e) {
        e.preventDefault()
        getVideogames(title)
    }

    return (
        <header className="navbar">
            <nav>
                <form>
                <ul className="list">
                    {/* <h3>Jueguitos</h3> */}
                    <h4 className="list-item">
                        Jueguitos  |     
                        <NavLink exact to="/home">| Home</NavLink> {/*Con el exact, solo se aplican los estilos cuando se encuentre en el path indicado. */}
                        <NavLink to="/about">About</NavLink>
                    </h4>
                    <div className='searcher'>
                    <input className='searchVg' type='text' value={title} onChange={handleOnChange} placeholder='Videogame name...'></input>
                    <button type='button' onClick={e => handleOnClick(e)}>SEARCH</button>
                </div>
                </ul>
                </form>
            </nav>
        </header>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      getVideogames: title => dispatch(getVideogames(title))
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(NavBar); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps