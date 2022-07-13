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
    const[selected, setSelected] = useState({genres: 'All Genres', platforms: 'All Platforms', games: 'All Games'}); // inicializamos estado local selected para que cuando usemos el botón clear filters seteemos estos valores por defecto en cada lista de filtros.
    const [searchByName, setSearchByName] = useState(null);
    const [filterByGenre, setFilterByGenre] = useState([]); // Initial state en arreglo vacío para ir pusheando los valores que seleccionamos en la lista desplegada y que podamos filtrar por esos valores al mismo tiempo (hacemos lo mismo con arreglo platforms)
    const [filterByOrigin, setFilterByOrigin] = useState(null)
    const [filterByPlatforms, setFilterByPlatforms] = useState([]);
    const [renderFilters, setRenderFilters] = useState({origin: '', genres:[], platforms:[]}); // Estado para renderizar los filtros que vamos aplicando para que el usuario pueda verlos y eliminarlos si quiere.


    const allGames = useSelector(state => state.filteredVideogames) // Estado global que trae los juegos filtrados (en principio es una copia de TODOS los videojuegos)
    const loading = useSelector(state => state.loading); // Estado global de loading (valor inicial true)
    
    // Paginate - Local States
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15); // seteamos la cantidad de juegos que mostraremos por página
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame) // Instanciamos constante donde guardaremos los juegos que mostraremos por página según los indices correspondientes.
    const paginate = (pageNumber) => setCurrentPage(pageNumber); // seteamos el estado currentPage con el número de página que le pasemos por parámetro. Invocaremos esta función al hacer click en el botón de la página.
    const prevPage= () => setCurrentPage(currentPage - 1);
    const nextPage= () => setCurrentPage(currentPage + 1);
    const [index, setIndex] = useState({startIndex: 0, endIndex: 3})


   useEffect(() => { // despachamos las actions para obtener los juegos y los géneros cada vez que se monte el componente.
       dispatch(getGenres())
       if(!allGames.length) dispatch(getAllVideogames()) // loading pasa a false.
       else dispatch(setLoading(false))
    }, [])
    
    useEffect(() => { 
        setCurrentPage(1)
    }, [allGames])

    useEffect(() => {return () => dispatch(setLoading())}, []) // despachamos la action para setear el loading a true cada vez que se desmonte el componente.


    const handleOnSelectOrder = (e) => { 
        setCurrentPage(1)
        let orderGames = e.target.value;
        dispatch(getOrders(orderGames))
      }

      const handleOnClear = () => { // función para limpiar los filtros. Seteamos nuestros estados locales a sus valores por defecto y despachamos la action de filtrado por dichos valores (no le paso los estados directamente porque la action puede despacharse y tal vez los mismos no se actualizaron aún)
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
                    <div className={h.orders}>
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
                    </div>

                    {allGames.length >= 100 && <h1 className={h.trending}>Trending now</h1>}
                    
                    <div className={h.vgContainer}>
                         {!loading ? (currentGames.length ? currentGames.map(vg => (
                            <div key={vg.id} className={h.cardC}>
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
                            </div></Link> 
                            </div>)) : <NotFound/>)
                            : <div className={h.loading}>
                                <img src={loadingGif} alt='loading'></img>
                                <h1>loading...</h1>
                              </div>
                            }
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

