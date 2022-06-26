import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getVideogames } from '../../actions/index';
import { connect } from 'react-redux';
import s from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar'
import radar from '../Icons/logophotoII.png'

export function NavBar() {
    // const [title, setTitle] = useState('')

    // function handleOnChange(e) {
    //     setTitle(e.target.value)
    // }

    // function handleOnClick(e) {
    //     e.preventDefault()
    //     getVideogames(title)
    // }

    return (
            <nav>
                 <div className={s.items}>
                   <div className={s.titleCreate}>
                    {/* <Link className= {s.link} to ='/home'> <h4>Ki</h4> </Link> */}
                    <Link className= {s.link} to ='/home'> <img src={radar} alt='radar'></img> </Link>
                   </div>
                     <SearchBar/>
                    <div className={s.userBar}>
                        <Link className={s.link} to='/logIn' ><a> LOG IN </a></Link>
                        <a> SIGN UP </a>
                     </div>
                    
                 </div>
            </nav>
    )
}

function mapDispatchToProps(dispatch) {
    return {
      getVideogames: title => dispatch(getVideogames(title))
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(NavBar); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps