import React, { useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import s from './Form.module.css';
import { useDispatch, useSelector, } from 'react-redux';
import { createVideogame, getGenres} from '../../actions';
import swal from 'sweetalert';
import photo from '../Icons/logophoto.jpg';
// import {validate} from '../Utils/Utils'



export function validate(game) {
    
    let errors = {}; 
    if (!game.name.length) {errors.name = 'name is required'} 
    // if (!/^[a-zA-Z0-9]/.test(game.name)) {errors.name = 'name can only contain letters and numbers'} 
    if (game.name[game.name.length -1] === " ") {errors.name = 'name cannot end with white spaces'} 
    if (game.name.length > 40) {errors.name = 'name must be shorter'} 
    if (!game.description) {errors.description = 'description is required'} 
    if (!/^[a-zA-Z0-9]/.test(game.description)) {errors.description = 'description can only contain letters and numbers'} 
    if (game.platforms.length === 0) {errors.platforms = 'platforms are required'} 
    if (game.genres.length === 0) {errors.genres = 'genres are required'} 
    // if(!/^[1-5]+\.?[1-9]*$/.test(game.rating)) {errors.rating = 'rating is invalid'}
    if(game.rating > 5 || game.rating < 1) {errors.rating = 'rating is invalid'}
    if(game.background_image.length > 255) {errors.background_image = 'url is too long'}
    // if(game.background_image.length > 0) {if(!/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(game.bacground_image)) {errors.background_image = 'url is invalid'}}

    return errors; 
  }

 const Form = () => {
     
     const formatDate = () => {
         const date = new Date();
         return date.toISOString().slice(0, 10);
        }
        
        const [game, setGame] = React.useState ({ 
            name: '',
            description: '',
            rating: "",
            released: formatDate(),
            background_image: '',
            platforms: [],
            genres: [],
        });
        
        const [renders, setRenders] = React.useState([])
        const history = useHistory();
        
        useEffect(() => {
            dispatch(getGenres())
        }, [])



 const [errors, setErrors] = React.useState({}) 
 const allGenres = useSelector(state => state.genres);
 const dispatch = useDispatch()


 const handleOnChange = (e) => {
    setGame({...game, [e.target.name]: e.target.value})
    setErrors(validate({...game, [e.target.name]: e.target.value})) 
 }

 const handleOnSubmit = (e) => {
    e.preventDefault();
    if(game.background_image.length === 0) {game.background_image = photo}
    game.genres = game.genres.map(g => parseInt(g))
     if (Object.keys(errors).length === 0) {
        dispatch(createVideogame(game))
            swal("Videogame created!", "", "success")}
 }
    
 const handleOnSelect = (e, prop) => {
    let genre = allGenres.find(g => g.id == e.target.value)
    setGame({...game, [e.target.name]: [...game[prop], e.target.value]})
    setErrors(validate({...game, [e.target.name]: e.target.value})) 
    if(prop === 'genres') setRenders([...renders, genre])
   }

const handleOnClickDelete = (e, prop) => {
    if(e.target.name == 'genre') {
  setGame({...game, genres: game.genres.filter(g => g != prop)})
  setRenders(renders.filter(r => r.id !== parseInt(prop)))
    }
    else{
        setGame({...game, platforms: game.platforms.filter(p => p !== e.target.value)})
        // setRenders(renders.filter(r => r.id !== parseInt(prop)))  
    }
}


let platforms = ['PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox 360', 'Xbox One', 'Xbox Series S/X', 'Nintendo Switch', 'macOS', 'Android', 'iOS', 'Linux', 'PS Vita', 'Wii U', 'Nintedo 3DS' ]

    return (
       <div>
       <form onSubmit={handleOnSubmit} id="videogameForm">
        <button><Link to='/home'>Return</Link></button>
        <h3>Create your own Videogame!</h3>

        <label htmlFor='name'>Name:</label> 
             <input className={errors.name && s.danger} type='text' name='name' key='name' value={game.name} onChange={handleOnChange} placeholder='Videogame name'></input> 
            {errors.name && (<p className={s.danger}>{errors.name}</p>)} 

        <label htmlFor='released'>Released Date:</label> 
             <input className={errors.date && s.danger} type='date' name='released' key='released' value={game.date} onChange={handleOnChange} placeholder='07/07/2022'></input> 
             {errors.date && (<p className={s.danger}>{errors.date}</p>)} 

        <label htmlFor='rating'>Rating:</label> 
             <input className={errors.rating && s.danger} type='number' name='rating' key='rating' value={game.rating} onChange={handleOnChange} placeholder='From 1 to 5'></input> 
             {errors.rating && (<p className={s.danger}>{errors.rating}</p>)} 

        <label htmlFor='image'>Image:</label>
            <input className={errors.background_image && s.danger} type='text' name='background_image' key='background_image' value={game.background_image} onChange={handleOnChange} placeholder='Insert image url'></input>
            {errors.background_image && <p className={s.danger}>{errors.background_image}</p>} 

            <select name='genres' id='genres' onChange={(e) => handleOnSelect(e, e.target.name)}>
                 <optgroup label='Genres'>
                        {allGenres.map(g =>
                       <option value={g.id} name={g.name} key={g.id}>{g.name}</option> )}
                 </optgroup>
            </select>
            <select name='platforms' id='platforms' onChange={(e) => handleOnSelect(e, e.target.name)}>
                 <optgroup label='Platforms'>
                        {platforms.map(p =>
                       <option value={p} name={p} key={p}>{p}</option> )}
                 </optgroup>
            </select>

            <div id='renders'>
                       {renders.length > 0 && renders.map(g =>
                       <div>
                          <span key={g.id}>{g.name}</span>
                          <button name='genre'value={g.id} onClick={(e) => {handleOnClickDelete(e, e.target.value)}} >X</button>
                       </div>
                        )}
                        {errors.genres && <p className={s.danger}>{errors.genres}</p>} 
                           {game.platforms.length > 0 && game.platforms.map(p =>
                        <div className={errors.platforms && s.danger}>
                            <span key={p}>{p}</span>
                            <button name='platforms' value={p} onClick={(e)=>{handleOnClickDelete(e)}}>X</button>
                        </div>
                        )}
                        {errors.platforms && <p className={s.danger}>{errors.platforms}</p>} 
            </div>

        <label htmlFor='description'>Description:</label>
            <textarea className={errors.description && s.danger} form="videogameForm" name='description' key='description' value={game.description} onChange={handleOnChange} placeholder='Describe your game...'></textarea>
            {errors.description && <p className={s.danger}>{errors.description}</p>} 

         <input type='submit' value='CREATE!'></input> 
       </form> 
      </div>
    )
}

export default Form