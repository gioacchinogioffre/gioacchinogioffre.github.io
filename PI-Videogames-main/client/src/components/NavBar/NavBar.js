import React  from 'react';
import {  Link } from 'react-router-dom';
import s from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar'
import radar from '../Icons/logophoto3.png'
import homeIcon from '../Icons/home.png'
import add from '../Icons/add.png'
import user from '../Icons/user3.png'
import { useAuth0 } from '@auth0/auth0-react';

export default function NavBar({filterByGenre, filterByOrigin, searchByName, filterByPlatforms, handleOnClear}) {


   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
            <nav>
                 <div className={s.items}>
                   <div className={s.titleCreate}>
                     <img className={s.radar} src={radar} alt='radar'></img>
                      <Link className={s.link} to='/home'><img className ={s.homeIcon} src={homeIcon} alt='home'/> </Link>
                     { isAuthenticated && <Link className={s.link} to='/createVideoGame'><img className ={s.homeIcon} src={add} alt='create'/> </Link>}
                   </div>

                     <SearchBar filterByGenre={filterByGenre} filterByOrigin={filterByOrigin} searchByName={searchByName} filterByPlatforms={filterByPlatforms} handleOnClear={handleOnClear}/>
                     
                     <div className={s.userBar}>
                      { isAuthenticated 
                      ? <Link className={s.link} to='/profile'><img  className={s.profileIcon} src= {user} alt='user'></img> </Link>
                      : <button onClick={() => loginWithRedirect()} > LOG IN </button> }
                      { isAuthenticated 
                      ? <button  onClick={()=>
                        logout({returnTo:'https://localhost:3000/home'})}
                        // logout({returnTo:'https://ki-games.vercel.app/home'})}
                        >LOG OUT</button> 
                      : <button onClick={() => loginWithRedirect()}>SIGN UP</button> }
                    <Link to ='/faq' className={s.link}><button>FAQ</button></Link>
                    </div>
                 </div>
            </nav>
    )
}
