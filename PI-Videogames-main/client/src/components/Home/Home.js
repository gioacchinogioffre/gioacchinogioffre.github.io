import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilters, getGenres, getOrders } from '../../actions';
import h from './Home.module.css';
import Paginate from '../Paginate/Paginate';
import { NavBar}  from "../NavBar/NavBar";
import homeIcon from '../Icons/home.png'
import xbox from '../Icons/xbox-2.png'
import play from '../Icons/playstation.png'
import rating from '../Icons/star-2.png'
import nintendo from '../Icons/nintendo.png'
import wii from '../Icons/wii-u.png'
import android from '../Icons/android.png'
import linux from '../Icons/linux.png'
import pc from '../Icons/pc.png'
import mac from '../Icons/mac.png'
import add from '../Icons/add.png'



const Home = () => {
    const dispatch = useDispatch();
    

    // local states filters/orders/search
    // const [orderAlph, setOrderAlph] = useState(null);
    const [orders, setOrders] = useState(null);
    const [searchByName, setSearchByName] = useState(null);
    const [filterByGenre, setFilterByGenre] = useState('all');
    const [filterByOrigin, setFilterByOrigin] = useState(null)


    const allGames = useSelector(state => state.filteredVideogames);
    const allGenres = useSelector(state => state.genres);
    const [loading, setLoading] = useState(true)
    
    //Paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage= () => setCurrentPage(currentPage - 1);
    const nextPage= () => setCurrentPage(currentPage + 1);
    //  const showPagination = () => {
    //      return ( 
    //          <Paginate
    //          gamesPerPage={gamesPerPage}
    //          allGames={allGames.length}
    //          currentPage={currentPage}
    //          paginate={paginate}
    //          prevPage={prevPage}
    //          nextPage={nextPage}
    //          />
    //      )
    //      }

   useEffect(() => {
       dispatch(getGenres())
       dispatch(getAllVideogames())
    //    setLoading(true)
   }, [])

   useEffect(() => {
    setCurrentPage(1)
}, [allGames])


    const handleOnSelectGenre = (e) => {
        setCurrentPage(1)
        let filterGenre = e.target.value;
      dispatch(getFilters(filterGenre, filterByOrigin, searchByName))
    }

    const handleOnSelectGames = (e) => {
        setCurrentPage(1)
        let filterGames = e.target.value;
      dispatch(getFilters(filterByGenre, filterGames, searchByName))
    }


    const handleOnSelectOrder = (e) => {
        setCurrentPage(1)
        let orderGames = e.target.value;
        dispatch(getOrders(orderGames))
      }

      const [hover, setHover] = useState({home: false, create: false})

      const handleOnHover = (e) => {
        if (e.target.alt === 'home') setHover({...hover, home:true}) 
        if (e.target.alt === 'create') setHover({...hover, create:true}) 
      }

      const handleOnOut = (e) => {
        if (e.target.alt === 'home') setHover({...hover, home:false}) 
        if (e.target.alt === 'create') setHover({...hover, create:false}) 
     }


     allGenres.length && console.log(allGenres[0].image_background)

    return (
        <header className={h.Home}>
                     <NavBar>
                    </NavBar>

         <div className={h.container}>

              <div className={h.firstC}>
                 <div className={h.Buttons}>
                <Link className={h.link} to='/home'><img className ={h.homeIcon} src={homeIcon} alt='home' onMouseOver={(e) => handleOnHover(e)} onMouseOut={(e) => handleOnOut(e)}/>
                {hover.home ? <h3 className={h.textRenders}>Home</h3> : false}</Link>
                <br></br>
                <Link className={h.link} to='/createVideoGame'><img className ={h.homeIcon} src={add} alt='create' onMouseOver={(e) => handleOnHover(e)} onMouseOut={(e) => handleOnOut(e)}/>
                {hover.create ? <h3 className={h.textRenders}>Create Game</h3> : false}</Link>
                 </div>

                <div className={h.filters}>
                    <br></br>
                        <select className={h.filters} name='all_db_games' id='games' size='4' onChange={(e) => handleOnSelectGames(e)}>
                            <optgroup  label='Show'>
                                <option value='all'>All Games</option>
                                <option value='api'>Api Games</option>
                                <option value='db'>Created Games</option>
                            </optgroup>
                        </select>
                        <br></br><br></br><br></br>
                        <div className={h.genres}>
                        {allGenres.length && allGenres.map(g => 
                        <img className={h.genreIcon} src={g.image_background}></img>)}
                        <select  className={h.filters} name='genres' id='genres' size='20' onChange={(e) => handleOnSelectGenre(e)}>
                            <optgroup label='Genres'>
                               {allGenres.map(g =>
                               <option value={g.name} key={g.id}>{g.name}</option> )}
                            </optgroup>
                         </select>
                        </div>
                        <br></br><br></br><br></br>
                        <select className={h.filters} name='alphabetic' size='6' onChange={(e) => handleOnSelectOrder(e)}>
                            <optgroup label='Order By'>
                                <option value='a-z'>A-Z</option>
                                <option value='z-a'>Z-A</option>
                            </optgroup>
                            <optgroup label='Rating'>
                                <option  value='ascending'>Ascending</option>
                                <option value='descending'>Descending</option>
                        </optgroup>
                         </select>
                </div>
             </div>

                    <div>
                    {allGames.length >= 100 && <h1 className={h.trending}>Trending now</h1>}
                    <div className={h.vgContainer}>
                        {currentGames.map(vg => (
                            <Link className={h.link} to={`/videogames/${vg.id}`}>
                                    <div className={h.cardRating}>
                                        <a>{vg.rating}</a>
                                        <img  src={rating}></img> 
                                    </div>
                                <div className={h.Card} key={vg.id}>
                                    <img className={h.vgImage} src={vg.background_image} alt='videogameImage'/>
                                         <div className ={h.cardTitle}>{vg.name}</div>
                                         <div className ={h.cardGenres}>{vg.genres.map(g => g.name).join(' | ')}</div>
                                         {/* <div className={h.cardRating}>
                                         <a>{`|    ${vg.rating}   |`}</a>
                                        <img  src={rating}></img> 
                                         </div> */}
                                    <div className={h.platforms}>
                                         {vg.platforms.filter(p => p.includes('Xbox')).length > 0 && <img className={h.imageP} src={xbox}></img>}
                                         {vg.platforms.filter(p => p.includes('PlayStation')).length > 0 && <img className={h.imageP} src={play}></img>}
                                         {vg.platforms.filter(p => p.includes('Wii U')).length > 0 &&  <img className={h.imageP} src={wii}></img>}
                                         {vg.platforms.filter(p => p.includes('Nintendo')).length > 0 &&  <img className={h.imageP} src={nintendo}></img>}
                                         {vg.platforms.filter(p => p.includes('Android')).length > 0 &&  <img className={h.imageP} src={android}></img>}
                                         {vg.platforms.filter(p => p.includes('Linux')).length > 0 &&  <img className={h.imageP} src={linux}></img>}
                                         {vg.platforms.filter(p => p.includes('PC')).length > 0 &&  <img className={h.imageP} src={pc}></img>}
                                         {vg.platforms.filter(p => p.includes('macOS')).length > 0 &&  <img className={h.imageP} src={mac}></img>}
                                    </div>
                            </div></Link>)) 
                            }
                    </div>
                    </div>
    
            </div>
                    <div className={h.paginate}>
                    <Paginate  gamesPerPage={gamesPerPage}  allGames={allGames.length}  currentPage={currentPage}
                    paginate={paginate} prevPage={prevPage}  nextPage={nextPage} />
                    </div>

        </header>
    )
    
}

export default Home;

