import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getFilters, getGenres, getOrders } from '../../actions';
import h from './Home.module.css';
import Paginate from '../Paginate/Paginate';


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
     const showPagination = () => {
         return ( 
             <Paginate
             gamesPerPage={gamesPerPage}
             allGames={allGames.length}
             currentPage={currentPage}
             paginate={paginate}
             prevPage={prevPage}
             nextPage={nextPage}
             />
         )
         }
    

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

    
    const [title, setTitle] = useState('')

    const handleOnClickSearch = (e) => {
      setCurrentPage(1)
      dispatch(getFilters(filterByGenre, filterByOrigin, title))
    }

    const handleOnSelectOrder = (e) => {
        setCurrentPage(1)
        let orderGames = e.target.value;
        dispatch(getOrders(orderGames))
      }

    const handleOnChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <header className="videogames">

                <div className='searcher'>
                    <input className='searchVg' type='text' value={title} onChange={e=> handleOnChange(e)} placeholder='Videogame name...'></input>
                    <button type='button' onClick={e => handleOnClickSearch(e)}>SEARCH</button>
                </div>
           
             <div className='createVd'>
                <Link to='/createVideoGame'><button>Create Game</button></Link>
            </div>


            <div className='filters'>
                <div className='genre_games_filters'>
                        <select name='all_db_games' id='games' size='4' onChange={(e) => handleOnSelectGames(e)}>
                            <optgroup label='Show'>
                                <option value='all'>All Games</option>
                                <option value='api'>Api Games</option>
                                <option value='db'>Created Games</option>
                            </optgroup>
                        </select>
                        <select name='genres' id='genres' size='20' onChange={(e) => handleOnSelectGenre(e)}>
                            <optgroup label='Genres'>
                               {allGenres.map(g =>
                               <option value={g.name} key={g.id}>{g.name}</option> )}
                            </optgroup>
                         </select>
                </div>
                <div className='alphabetic_rating_orders'>
                      <label>Order By</label>
                        <select name='alphabetic' size='6' onChange={(e) => handleOnSelectOrder(e)}>
                            <optgroup label='Alphabetic'>
                                <option value='a-z'>A-Z</option>
                                <option value='z-a'>Z-A</option>
                            </optgroup>
                            <optgroup label='Rating'>
                                <option value='ascending'>Ascending</option>
                                <option value='descending'>Descending</option>
                        </optgroup>
                         </select>
                </div>
             </div>

                    <div className={h.vgContainer}>
                    ACA VAN LOS JUEGUITOS 🙂
                    <ul>
                        {currentGames.map(vg => (
                            <div key={vg.id}>
                                <img className={h.vgImage} src={vg.background_image} alt='videogameImage'/>
                                <h3><Link to={`/videogames/${vg.id}`}>{vg.name}</Link></h3>
                                <li>Platforms: {vg.platforms.join(' | ')}</li>
                                <li>Genres:  {vg.genres.map(g => g.name).join(' | ')}</li>
                            </div>)) 
                            }
                    </ul>
                    <div>{showPagination()}</div>
             </div>

        </header>
    )
    
}

export default Home;

