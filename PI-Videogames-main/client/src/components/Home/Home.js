import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilters, getGenres, getOrders, setLoading } from '../../actions';
import h from './Home.module.css';
import Paginate from '../Paginate/Paginate';
import NavBar from "../NavBar/NavBar";
import xbox from '../Icons/xbox-2.png'
import play from '../Icons/playstation.png'
import rating from '../Icons/star-2.png'
import nintendo from '../Icons/nintendo.png'
import wii from '../Icons/wii-u.png'
import android from '../Icons/android.png'
import linux from '../Icons/linux.png'
import pc from '../Icons/pc.png'
import mac from '../Icons/mac.png'
import loadingGif from '../Icons/loadingII.gif'
import {NotFound} from '../Modals/ModalNotFound';
import Filters from '../Filters/Filters';



const Home = () => {
    const dispatch = useDispatch();
    
    // Filters - Local States
    const[selected, setSelected] = useState({genres: 'All Genres', platforms: 'All Platforms', games: 'All Games'});
    const [searchByName, setSearchByName] = useState(null);
    const [filterByGenre, setFilterByGenre] = useState([]);
    const [filterByOrigin, setFilterByOrigin] = useState(null)
    const [filterByPlatforms, setFilterByPlatforms] = useState([]);
    const [renderFilters, setRenderFilters] = useState({origin: '', genres:[], platforms:[]});


    const allGames = useSelector(state => state.filteredVideogames)
    const loading = useSelector(state => state.loading);
    
    // Paginate - Local States
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame) 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage= () => setCurrentPage(currentPage - 1);
    const nextPage= () => setCurrentPage(currentPage + 1);
    const [index, setIndex] = useState({startIndex: 0, endIndex: 3})


   useEffect(() => { 
       dispatch(getGenres())
       if(!allGames.length) dispatch(getAllVideogames()) 
       else dispatch(setLoading(false))
       window.scrollTo(0, 0);
    }, [])
    
    useEffect(() => { 
        setCurrentPage(1)
    }, [allGames])

    useEffect(() => {return () => dispatch(setLoading())}, [])


    const handleOnSelectOrder = (e) => { 
        setCurrentPage(1)
        let orderGames = e.target.value;
        dispatch(getOrders(orderGames))
      }

      const handleOnClear = () => { 
        setSelected({genres: 'All Genres', platforms: 'All Platforms', games: 'All Games'})
        setFilterByGenre([])
        setFilterByOrigin(null)
        setFilterByPlatforms([])
        setSearchByName(null)
        setIndex({startIndex: 0, endIndex: 3})
        setRenderFilters({origin: '', genres:[], platforms:[]})
        dispatch(getFilters([], null, null, []))
      }

    return (
        
        <header className={h.Home}>
                     <NavBar filterByGenre={filterByGenre} filterByOrigin={filterByOrigin} searchByName={searchByName} filterByPlatforms={filterByPlatforms} handleOnClear={handleOnClear}>
                    </NavBar>

         <div className={h.container}>

              <div className={h.firstC}>
                 <Filters index={index} setIndex={setIndex} setCurrentPage={setCurrentPage} searchByName={searchByName} setSearchByName={setSearchByName} filterByGenre={filterByGenre} setFilterByGenre={setFilterByGenre} filterByOrigin={filterByOrigin} setFilterByOrigin={setFilterByOrigin} filterByPlatforms={filterByPlatforms} setFilterByPlatforms={setFilterByPlatforms} renderFilters={renderFilters} setRenderFilters={setRenderFilters} handleOnClear={handleOnClear} selected={selected} setSelected={setSelected}></Filters>
             </div>
                    <div>

                    <h1 className={h.trending}>Trending now</h1>
                    
                    <div className={h.vgContainer}>
                        {!loading && <div className={h.orders}>
                            <h4>Sort by: </h4>
                        <select defaultValue='alphabetic' name='alphabetic' onChange={(e) => handleOnSelectOrder(e)}>
                                    <option disabled value='alphabetic'>Name</option>
                                    <option value='a-z'>A-Z</option>
                                    <option value='z-a'>Z-A</option>
                            </select>
                            <select defaultValue='rating' name='rating' onChange={(e) => handleOnSelectOrder(e)}>
                                <option disabled value='rating'>Rating</option>
                                    <option value='descending'>Highest</option>
                                    <option  value='ascending'>Lowest</option>
                            </select>
                        </div>}
                        <div className={h.cardsContainer}>
                         {!loading ? (currentGames.length ? currentGames.map(vg => (
                            <div key={vg.id} className={h.cardC}>
                            <Link className={h.link} to={`/videogames/${vg.id}`}>
                                    <div className={h.cardRating}>
                                        <p>{vg.rating}</p>
                                        <img alt='ratingIcon' src={rating}></img>
                                    </div>
                                    <div className={h.Card} key={vg.id}>
                                    <img className={h.vgImage} src={vg.background_image} alt='videogameImage'/>
                                         <div className ={h.cardTitle}><h1>{vg.name}</h1></div>
                                         <div className ={h.cardGenres}>{vg.genres.map(g => g.name).join(' | ')}</div>
                                  
                                    <div className={h.platforms}>
                                         {vg.platforms.filter(p => p.includes('Xbox')).length > 0 && <img className={h.imageP} src={xbox} alt='xbox'></img>}
                                         {vg.platforms.filter(p => p.includes('PlayStation')).length > 0 && <img className={h.imageP} src={play} alt='ps'></img>}
                                         {vg.platforms.filter(p => p.includes('Wii U')).length > 0 &&  <img className={h.imageP} src={wii} alt='wii'></img>}
                                         {vg.platforms.filter(p => p.includes('Nintendo')).length > 0 &&  <img className={h.imageP} src={nintendo} alt='nintendo'></img>}
                                         {vg.platforms.filter(p => p.includes('Android')).length > 0 &&  <img className={h.imageP} src={android} alt='android'></img>}
                                         {vg.platforms.filter(p => p.includes('Linux')).length > 0 &&  <img className={h.imageP} src={linux} alt='linux'></img>}
                                         {vg.platforms.filter(p => p.includes('PC')).length > 0 &&  <img className={h.imageP} src={pc} alt='pc'></img>}
                                         {vg.platforms.filter(p => p.includes('macOS')).length > 0 &&  <img className={h.imageP} src={mac} alt='mac'></img>}
                                    </div>
                            </div></Link> 
                            </div>)) : <NotFound/>)
                            : <div className={h.loading}>
                                <img src={loadingGif} alt='loading'></img>
                              </div>
                            }
                            </div>
                    </div>
                    </div>
    
            </div>
                    <div className={h.paginate}>
                    <Paginate  gamesPerPage={gamesPerPage}  allGames={allGames.length}  currentPage={currentPage}
                    paginate={paginate} prevPage={prevPage}  nextPage={nextPage} index={index} setIndex={setIndex}/>
                    </div>
        </header>
    )
}

export default Home;

