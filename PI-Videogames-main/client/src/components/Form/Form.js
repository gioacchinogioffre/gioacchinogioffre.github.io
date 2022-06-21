import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Form.css';
import { connect } from 'react-redux';
import { createVideogame } from '../../actions';

let genres =[{id:1, name: 'Action'}, {id:2, name: 'Adventure' } ];

export function validate(game) {
    let errors = {}; 
    if (!game.name) {errors.name = 'name is required'} 
    else if (!/\S+@\S+\.\S+/.test(game.name)) {errors.name = 'name is invalid'} 
    else if (!game.description) {errors.description = 'description is required'} 
    else if (!/(?=.*[0-9])/.test(game.description)) {errors.description = 'description is invalid'} 
    return errors; 
  }

export default function Form() {
    const [game, setGame] = React.useState ({ 
        name: '',
        description: '',
        rating: "",
        released: "",
        image: "",
        platforms: [],
        genres: [],
        });

 const [errors, setErrors] = React.useState({}) 

 const handleOnChange = (e) => {
    setGame({...game, [e.target.name]: e.target.value})
    setErrors(validate({...game, [e.target.name]: e.target.value})) 
 }

 const handleOnSubmit = (e) => {
     e.preventDefault()
     createVideogame(game)

 }

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

            <select className='gameGenres' name='Genres' size ='0' multiple>
              <optgroup label='Genres'>
            {genres.map(g => (
                <option key={g.id} value={g.name}>{g.name}</option>
            ))}
            </optgroup>
            </select>
            <select className='gameplatForms'>Platforms</select>

        <label htmlFor='description'>Description:</label>
            <textarea className={errors.description && 'danger'} form="videogameForm" name='description' key='description' value={game.description} onChange={handleOnChange} placeholder='Describe your game...'></textarea>
            {errors.description && <p className='danger'>{errors.description}</p>} 

         <input type='submit' value='CREATE!'></input> 
       </form> 
      </div>
    )
}


// function mapDispatchToProps(dispatch) {
//     return {
//       createVideogame: game => dispatch(createVideogame(game))
//     }
//   }
  

//   function mapStateToProps(state){
//     return {
//         genres: state.genres
//     }
//   }
  
// export default connect(mapStateToProps, mapDispatchToProps)(NavBar); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps