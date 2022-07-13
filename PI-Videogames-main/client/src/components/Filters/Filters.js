import React from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { getFilters, } from '../../actions';
import h from './Filters.module.css';


const Filters = ({setCurrentPage, searchByName, setSearchByName, filterByGenre, setFilterByGenre, filterByOrigin, setFilterByOrigin, filterByPlatforms, setFilterByPlatforms, renderFilters, setRenderFilters, handleOnClear, selected, setSelected, index, setIndex}) => {

    const dispatch = useDispatch(); 
    const allGenres = useSelector(state => state.genres); // nos traemos los generos del estado global para renderizar la lista desplegable.


    const handleOnSelectGenre = (e) => {
        setSelected({...selected, genres: e.target.value}) // seteamos estado selected con la option seleccionada de la lista desplegable.
        if(!renderFilters.genres.includes(e.target.value)) setRenderFilters({...renderFilters, genres:[...renderFilters.genres, e.target.value]}) // si dicho valor no está incluido en nuestro estado local de renders, lo agregamos haciendo una copia del estado y una copia de la propiedad más el valor.
        setCurrentPage(1)
        setIndex({startIndex: 0, endIndex: 3})
        if (e.target.value === 'All Genres') { // si seleccionamos todos los géneros...
            dispatch(getFilters([], filterByOrigin, searchByName, filterByPlatforms)) // despachamos la action de filtrado.
            setFilterByGenre([]) // seteamos estado local de géneros por defecto.
            setRenderFilters({...renderFilters, genres:[]}) // seteamos estado local de renders de géneros por defecto.
        } else { // si no...
            dispatch(getFilters([...filterByGenre, e.target.value], filterByOrigin, searchByName, filterByPlatforms)) // despachamos la action de filtrado haciendo una copia del estado local de géneros y agregando el valor seleccionado (esto nos permite filtrar por más de un valor)
            setFilterByGenre([...filterByGenre, e.target.value]) // seteamos estado local de géneros en una copia más el valor seleccionado.
        }
    }

    const handleOnSelectPlatforms = (e) => {
        setSelected({...selected, platforms: e.target.value});
        if(!renderFilters.platforms.includes(e.target.value)) setRenderFilters({...renderFilters, platforms:[...renderFilters.platforms, e.target.value]})
        setCurrentPage(1)
        setIndex({startIndex: 0, endIndex: 3})
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
        setSelected({...selected, games: e.target.value});
        setRenderFilters({...renderFilters, origin:e.target.value})
        setFilterByOrigin(e.target.value)
        setCurrentPage(1)
        setIndex({startIndex: 0, endIndex: 3})
        let filterGames = e.target.value;
      dispatch(getFilters(filterByGenre, filterGames, searchByName, filterByPlatforms))
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
  
     let platforms = ['Android', 'iOS', 'Linux', 'macOS', 'Nintendo Switch', 'Nintendo 3DS', 'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PS Vita', 'Wii U', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series S/X', ]

    return (
            <div>

                <div>
                {(renderFilters.origin.length>0 || renderFilters.genres.length>0 || renderFilters.platforms.length>0) && <button  onClick={() => handleOnClear()} className={h.clearFilters}>Remove filters</button>}
                </div>


                <div className={h.filters}>

                       <div className={h.renderFilters}>
                        {renderFilters.genres.length>0 && renderFilters.genres.map(r => {
                            return <button value={r} onClick={(e) => handleOnDelete(e, 'genres')}> {r} x</button>})}
                        {renderFilters.platforms.length>0 && renderFilters.platforms.map(r => {
                            return <button value={r} onClick={(e) => handleOnDelete(e, 'platforms')}> {r} x</button>})}
                        {renderFilters.origin.length>0 && <button value={renderFilters.origin} onClick={(e) => handleOnDelete(e)}> {renderFilters.origin} x</button>}
                       </div>
                        <select value={selected.games} className={h.filters} name='all_db_games' id='games' size='4' onChange={(e) => handleOnSelectGames(e)}>
                            <optgroup  label='Show'>
                                <option value='All Games'>All Games</option>
                                <option value='Popular'>Popular Games</option>
                                <option value='Ki'>Ki Games</option>
                            </optgroup>
                        </select>
                        <div className={h.genres}>

                        <select value={selected.genres} className={h.filters} name='genres' id='genres' size='21' onChange={(e) => handleOnSelectGenre(e)}>
                            <optgroup label='Genres'>
                                <option value='All Genres'>All Genres</option>
                               {allGenres.map(g =>
                               <option value={g.name} key={g.id}>{g.name}</option> )}
                            </optgroup>
                         </select>
            
                        <select  value={selected.platforms} className={h.filters} name='platforms' id='platforms' size='21' onChange={(e) => handleOnSelectPlatforms(e)}>
                            <optgroup label='Platforms'>
                                <option value='All Platforms'>All Platforms</option>
                               {platforms.map(p =>
                               <option value={p} key={p}>{p}</option> )}
                            </optgroup>
                         </select>
                        </div>
                </div>
            </div>   
    ) 
}

export default Filters;

