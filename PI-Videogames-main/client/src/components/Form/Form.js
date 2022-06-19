import React from 'react';
import { NavLink } from 'react-router-dom';
import './Form.css';

export function validate(game) {
    let errors = {}; // Creamos objeto donde iremosguardando como strings los errores en caso de que los hubiere para luego renderizarlos en pantalla.
    if (!game.name) {errors.name = 'name is required'} // Si no hay nada en el input correspondiente al name, creamos una propiedad con dicho nombre en el objeto errors para renderizar que el name es necesaria.
    else if (!/\S+@\S+\.\S+/.test(game.name)) {errors.name = 'name is invalid'} // Testeamos usando regular expressions si lo escrito en el input name es un name válido (en este caso si es un mail). Si es inválido creamos una propiedad en el objeto errors para renderizar que el name es inválido.
    else if (!game.description) {errors.description = 'description is required'} // Si no hay nada en el input correspondiente al description, creamos una propiedad con dicho nombre en el objeto errors para renderizar que la description es necesaria.
    else if (!/(?=.*[0-9])/.test(game.description)) {errors.description = 'description is invalid'} // Testeamos usando regular expressions si lo escrito en el input description es una description válida (en este caso si contiene al menos un número). Si es inválida creamos una propiedad en el objeto errors para renderizar que la description es inválida.
    return errors; // Retornamos el objeto errores.
  }

export default function Form() {
    const [game, setGame] = React.useState ({ 
        name: '',
        description: '',
        rating: "",
        released: "",
        image: ""
        });

 const [errors, setErrors] = React.useState({}) 

 const handleOnChange = (e) => {
    setGame({...game, [e.target.name]: e.target.value})
    setErrors(validate({...game, [e.target.name]: e.target.value})) 
 }

 const handleOnSubmit = (e) => {}

    return (
       <div>
       <form onSubmit={handleOnSubmit} id="videogameForm">
        <button>Return</button>
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

            <select className='gameGenres'>Genres</select>
            <select className='gameplatForms'>Platforms</select>

        <label htmlFor='description'>Description:</label>
            <textarea className={errors.description && 'danger'} form="videogameForm" name='description' key='description' value={game.description} onChange={handleOnChange} placeholder='Describe your game...'></textarea>
            {errors.description && <p className='danger'>{errors.description}</p>} 

         <input type='submit' value='CREATE!'></input> 
       </form> 
      </div>
    )
}