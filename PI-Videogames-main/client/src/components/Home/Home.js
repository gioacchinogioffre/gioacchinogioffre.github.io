import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilters, getGenres, getOrders } from '../../actions';
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
import loading from '../Icons/loading3.gif'



const Home = () => {
    const dispatch = useDispatch();
    

    // local states filters/orders/search
    const [searchByName, setSearchByName] = useState(null);
    // const [filterByGenre, setFilterByGenre] = useState('all');
    const [filterByGenre, setFilterByGenre] = useState([]);
    const [filterByOrigin, setFilterByOrigin] = useState(null)
    const [filterByPlatforms, setFilterByPlatforms] = useState([]);
    // const [filterByPlatforms, setFilterByPlatforms] = useState('All Platforms');
    const [renderFilters, setRenderFilters] = useState({origin: '', genres:[], platforms:[]});


    const allGames = useSelector(state => state.filteredVideogames);
    const allGenres = useSelector(state => state.genres);
    // const [loading, setLoading] = useState(true)
    
    //Paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage= () => setCurrentPage(currentPage - 1);
    const nextPage= () => setCurrentPage(currentPage + 1);


   useEffect(() => {
       dispatch(getGenres())
       if(!allGames.length) dispatch(getAllVideogames())
       //    setLoading(true)
    }, [])
    
    useEffect(() => {
        setCurrentPage(1)
    }, [allGames])
    

    // const handleOnSelectGenre = (e) => {
    //     if(!renderFilters.genres.includes(e.target.value)) setRenderFilters({...renderFilters, genres:[...renderFilters.genres, e.target.value]})
    //     setCurrentPage(1)
    //     dispatch(getFilters([...filterByGenre, e.target.value], filterByOrigin, searchByName, filterByPlatforms))
    //     e.target.value !== 'All Genres' ? (setFilterByGenre([...filterByGenre, e.target.value])): setFilterByGenre([])
    // }

    const handleOnSelectGenre = (e) => {
        if(!renderFilters.genres.includes(e.target.value)) setRenderFilters({...renderFilters, genres:[...renderFilters.genres, e.target.value]})
        setCurrentPage(1)
        if (e.target.value === 'All Genres') {
            dispatch(getFilters([], filterByOrigin, searchByName, filterByPlatforms))
            setFilterByGenre([])
            setRenderFilters({...renderFilters, genres:[]})
        } else {
            dispatch(getFilters([...filterByGenre, e.target.value], filterByOrigin, searchByName, filterByPlatforms))
            setFilterByGenre([...filterByGenre, e.target.value])   
        }
    }

    // const handleOnSelectPlatforms = (e) => {
    //     if(!renderFilters.platforms.includes(e.target.value)) setRenderFilters({...renderFilters, platforms:[...renderFilters.platforms, e.target.value]})
    //     setFilterByPlatforms(e.target.value)
    //     setCurrentPage(1)
    //     let filterPlatforms = e.target.value;
    //   dispatch(getFilters(filterByGenre, filterByOrigin, searchByName, filterPlatforms))
    // }
    const handleOnSelectPlatforms = (e) => {
        if(!renderFilters.platforms.includes(e.target.value)) setRenderFilters({...renderFilters, platforms:[...renderFilters.platforms, e.target.value]})
        setCurrentPage(1)
        if(e.target.value === 'All Platforms') {
            dispatch(getFilters(filterByGenre, filterByOrigin, searchByName, []))
            setFilterByPlatforms([])
            setRenderFilters({...renderFilters, platforms:[]})
        } else {
            dispatch(getFilters(filterByGenre, filterByOrigin, searchByName, [...filterByPlatforms, e.target.value]))
            setFilterByPlatforms([...filterByPlatforms, e.target.value])   
        }
    }

        
    const handleOnSelectGames = (e) => {
        setRenderFilters({...renderFilters, origin:e.target.value})
        setFilterByOrigin(e.target.value)
        setCurrentPage(1)
        let filterGames = e.target.value;
      dispatch(getFilters(filterByGenre, filterGames, searchByName, filterByPlatforms))
    }



    const handleOnSelectOrder = (e) => {
        setCurrentPage(1)
        let orderGames = e.target.value;
        dispatch(getOrders(orderGames))
      }

      const handleOnClear = () => {
        setFilterByGenre('All Genres')
        setFilterByOrigin(null)
        setFilterByPlatforms('All Platforms')
        setSearchByName(null)
        setRenderFilters({origin: '', genres:[], platforms:[]})
        dispatch(getFilters('All Genres', 'All Games', null, 'All Platforms'))
      }

      const handleOnDelete = (e, prop) => {
        if(prop) {
            setRenderFilters({...renderFilters, [prop]: renderFilters[prop].filter(item => item !== e.target.value)}) 
            if(prop === 'genres') {
                setFilterByGenre(filterByGenre.filter(item => item !== e.target.value))
                dispatch(getFilters(filterByGenre.filter(item => item !== e.target.value), filterByOrigin, searchByName, filterByPlatforms))
            } else {
                setFilterByPlatforms(filterByPlatforms.filter(item => item !== e.target.value))
                dispatch(getFilters(filterByGenre, filterByOrigin, searchByName, filterByPlatforms.filter(item => item !== e.target.value)))
            }
        }
        else {
            setRenderFilters({...renderFilters, origin: ''})
            setFilterByOrigin('')
            dispatch(getFilters(filterByGenre, 'All Games', searchByName, filterByPlatforms))
        }
        setCurrentPage(1)
      
      }


    //  allGenres.length && console.log(allGenres[0].image_background)
  
     let platforms = ['Android', 'iOS', 'Linux', 'macOS', 'Nintendo Switch', 'Nintendo 3DS', 'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PS Vita', 'Wii U', 'Xbox 360', 'Xbox One', 'Xbox Series S/X', ]

    return (
        
        <header className={h.Home}>
                     <NavBar filterByGenre={filterByGenre} filterByOrigin={filterByOrigin} searchByName={searchByName} filterByPlatforms={filterByPlatforms}>
                    </NavBar>

         <div className={h.container}>

              <div className={h.firstC}>
                 <div >
                    <button  onClick={() => handleOnClear()} className={h.clearFilters}>Clear filters</button>
                 </div>

                <div className={h.filters}>

                       <div className={h.renderFilters}>
                        {renderFilters.genres.length>0 && renderFilters.genres.map(r => {
                            return <button value={r} onClick={(e) => handleOnDelete(e, 'genres')}> {r} x</button>})}
                        {renderFilters.platforms.length>0 && renderFilters.platforms.map(r => {
                            return <button value={r} onClick={(e) => handleOnDelete(e, 'platforms')}> {r} x</button>})}
                        {renderFilters.origin.length>0 && <button value={renderFilters.origin} onClick={(e) => handleOnDelete(e)}> {renderFilters.origin} x</button>}
                       </div>
                        <select className={h.filters} name='all_db_games' id='games' size='4' onChange={(e) => handleOnSelectGames(e)}>
                            <optgroup  label='Show'>
                                <option value='All Games'>All Games</option>
                                <option value='Api'>Api Games</option>
                                <option value='Created'>Created Games</option>
                            </optgroup>
                        </select>
                        <br></br><br></br><br></br>
                        <div className={h.genres}>
                        {/* {allGenres.length && allGenres.map(g => 
                        <img className={h.genreIcon} src={g.image_background} alt='genreIcon'></img>)} */}
                        <select  className={h.filters} name='genres' id='genres' size='21' onChange={(e) => handleOnSelectGenre(e)}>
                            <optgroup label='Genres'>
                                <option value='All Genres'>All Genres</option>
                               {allGenres.map(g =>
                               <option value={g.name} key={g.id}>{g.name}</option> )}
                            </optgroup>
                         </select>
                        <br></br><br></br>
                        <select  className={h.filters} name='platforms' id='platforms' size='21' onChange={(e) => handleOnSelectPlatforms(e)}>
                            <optgroup label='Platforms'>
                                <option value='All Platforms'>All Platforms</option>
                               {platforms.map(p =>
                               <option value={p} key={p}>{p}</option> )}
                            </optgroup>
                         </select>
                        </div>
                </div>
             </div>
                    <div>
                    <div className={h.orders}>Sort by: 
                     <select name='alphabetic' onChange={(e) => handleOnSelectOrder(e)}>
                            <optgroup label='Order By'>
                                <option value='a-z'>A-Z</option>
                                <option value='z-a'>Z-A</option>
                            </optgroup>
                         </select>
                        <select name='rating' onChange={(e) => handleOnSelectOrder(e)}>
                            <optgroup label='Rating' >
                                <option  value='ascending'>Ascending</option>
                                <option value='descending'>Descending</option>
                            </optgroup>
                        </select>
                    </div>
                    {allGames.length >= 100 && <h1 className={h.trending}>Trending now</h1>}
                    <div className={h.vgContainer}>
                         {currentGames.length ? currentGames.map(vg => (
                            <Link className={h.link} to={`/videogames/${vg.id}`}>
                                    <div className={h.cardRating}>
                                        <p>{vg.rating}</p>
                                        <img alt='ratingIcon' src={rating}></img> 
                                    </div>
                                <div className={h.Card} key={vg.id}>
                                    <img className={h.vgImage} src={vg.background_image} alt='videogameImage'/>
                                         <div className ={h.cardTitle}>{vg.name}</div>
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
                                    {vg.createdOnDb && <div className={h.deleteGame}><button>DELETE GAME</button></div>}
                            </div></Link>)) 
                            : <div>
                                <h1>Loading...</h1>
                                <img src={loading} alt='loading'></img>
                              </div>
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

