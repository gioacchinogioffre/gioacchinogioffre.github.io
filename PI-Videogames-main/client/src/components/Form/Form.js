import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { createVideogame, getGenres} from '../../actions';



export function validate(game) {
    let errors = {}; 
    if (!game.name) {errors.name = 'name is required'} 
    else if (!/\S+@\S+\.\S+/.test(game.name)) {errors.name = 'name is invalid'} 
    else if (!game.description) {errors.description = 'description is required'} 
    else if (!/(?=.*[0-9])/.test(game.description)) {errors.description = 'description is invalid'} 
    return errors; 
  }

 const Form = () => {
    const [game, setGame] = React.useState ({ 
        name: '',
        description: '',
        rating: "",
        released: "",
        image: "",
        platforms: [],
        genres: [],
        });

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
     e.preventDefault()
     dispatch(createVideogame(game))

 }

 const handleOnGenres = (e) => {
  e.preventDefault()
  setGame({...game, genres: [...game.genres, game.genres.push(e.target.value)]})

}

let platforms = ['PC', 'PlayStation', 'PlayStation II', 'PlayStation III', 'PlayStation IV', 'PlayStation V', 'GameBoy', 'Xbox']

    return (
       <div>
       <form onSubmit={handleOnSubmit} id="videogameForm">
        <button><Link to='/home'>Return</Link></button>
        <h3>Create your own Videogame!</h3>

        <label htmlFor='name'>Name:</label> 
             <input className={errors.name && 'danger'} type='text' name='name' key='name' value={game.name} onChange={handleOnChange} placeholder='Videogame name'></input> 
            {errors.name && (<p className='danger'>{errors.name}</p>)} 

        <label htmlFor='released'>Released Date:</label> 
             <input className={errors.date && 'danger'} type='text' name='released' key='released' value={game.date} onChange={handleOnChange} placeholder='07/07/2022'></input> 
             {errors.date && (<p className='danger'>{errors.date}</p>)} 

        <label htmlFor='rating'>Rating:</label> 
             <input className={errors.rating && 'danger'} type='number' name='rating' key='rating' value={game.rating} onChange={handleOnChange} placeholder='From 1 to 5'></input> 
             {errors.rating && (<p className='danger'>{errors.rating}</p>)} 

        <label htmlFor='image'>Image:</label>
            <input className={errors.image && 'danger'} type='text' name='image' key='image' value={game.image} onChange={handleOnChange} placeholder='Insert image url'></input>
            {errors.image && <p className='danger'>{errors.image}</p>} 

            <select name='genres' id='genres' onChange={(e) => handleOnGenres(e)}>
                 <optgroup label='Genres'>
                        {allGenres.map(g =>
                       <option value={g.name} key={g.id}>{g.name}</option> )}
                 </optgroup>
            </select>
            <select name='platforms' id='platforms' onChange={(e) => handleOnGenres(e)}>
                 <optgroup label='Platforms'>
                        {platforms.map(p =>
                       <option value={p} key={p}>{p}</option> )}
                 </optgroup>
            </select>

        <label htmlFor='description'>Description:</label>
            <textarea className={errors.description && 'danger'} form="videogameForm" name='description' key='description' value={game.description} onChange={handleOnChange} placeholder='Describe your game...'></textarea>
            {errors.description && <p className='danger'>{errors.description}</p>} 

         <input type='submit' value='CREATE!'></input> 
       </form> 
      </div>
    )
}

export default Form