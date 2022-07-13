import React, { useState }  from 'react';
import {  Link } from 'react-router-dom';
import s from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar'
import radar from '../Icons/logophoto3.png'
import homeIcon from '../Icons/home.png'
import add from '../Icons/add.png'

export default function NavBar({filterByGenre, filterByOrigin, searchByName, filterByPlatforms, handleOnClear}) {

  const [hover, setHover] = useState({home: false, create: false})

  const handleOnHover = (e) => {
    if (e.target.alt === 'home') setHover({...hover, home:true}) 
    if (e.target.alt === 'create') setHover({...hover, create:true})
  }

    const handleOnOut = (e) => {
      if (e.target.alt === 'home') setHover({...hover, home:false}) 
      if (e.target.alt === 'create') setHover({...hover, create:false}) 
   }

    return (
            <nav>
                 <div className={s.items}>
                   <div className={s.titleCreate}>
                    <Link className= {s.link} to ='/home'> <img className={s.radar} src={radar} alt='radar'></img> </Link>
                      <Link className={s.link} to='/home'><img className ={s.homeIcon} src={homeIcon} alt='home' onMouseOver={(e) => handleOnHover(e)} onMouseOut={(e) => handleOnOut(e)}/> </Link>
                     <Link className={s.link} to='/createVideoGame'><img className ={s.homeIcon} src={add} alt='create' onMouseOver={(e) => handleOnHover(e)} onMouseOut={(e) => handleOnOut(e)}/> </Link>
                      <div>
                      {hover.home ? <h3 className={s.textRenders}>Home</h3> : false}
                      {hover.create ? <h3 className={s.textRenders}>Upload Game</h3> : false}
                      </div>
                   </div>

                     <SearchBar filterByGenre={filterByGenre} filterByOrigin={filterByOrigin} searchByName={searchByName} filterByPlatforms={filterByPlatforms} handleOnClear={handleOnClear}/>
                     
                     <div className={s.userBar}>
                    <Link to='/login'><button className={s.signUp} > LOG IN </button> </Link>
                    <button className={s.signUp}>SIGN UP</button>
                    <Link to ='/faq' className={s.link}><button className={s.signUp}>FAQ</button></Link>
                </div>
                    
                 </div>
            </nav>
    )
}
