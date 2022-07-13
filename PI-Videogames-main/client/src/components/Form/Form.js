import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './Form.module.css';
import { useDispatch, useSelector, } from 'react-redux';
import { createVideogame, getAllVideogames, getGenres} from '../../actions';
import photo from '../Icons/logophoto.jpg';
import NavBar from '../NavBar/NavBar';
import Modal from '../Modals/ModalForm';

export function validate(game) {
    
    let errors = {}; 

    if(game.name.length === 0) {errors.name = 'name is required'}
    if(game.name.length>0) {
        if (!/^[a-zA-Z0-9 ]+$/.test(game.name)) {errors.name = 'name can only contain letters and numbers'} 
        if (game.name[game.name.length -1] === " ") {errors.name = 'name cannot end with white spaces'} 
        if (game.name.length > 40) {errors.name = 'name must be shorter'} 
    }

    if(game.description.length === 0) {errors.description = 'description is required'}
    
    if(game.description.length>0) {
        if (!/^[a-zA-Z0-9 .,?'":]+$/.test(game.description)) {errors.description = 'description can only contain letters and numbers'} 
        if (game.description.length>500) {errors.description = 'description must be shorter'}
    }

    if(game.released.slice(0, 4)>2024) {errors.released = 'released date cannot be after 2024'}
    if(game.released.slice(0, 4)<1970) {errors.released = 'released date cannot be before 1970'}

    
    if(game.rating.length>0) {
        if(game.rating > 5 || game.rating < 1 || game.rating.length>4 || game.rating[0] === 0) {errors.rating = 'rating is invalid'}
    }
    
    if (!game.platforms.length) {errors.platforms = 'platforms are required'}
    if (!game.genres.length) {errors.genres = 'genres are required'}

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
    const [errors, setErrors] = React.useState({}) 
    const [showModal, setShowModal] = useState(false)

    let platforms = ['Android', 'iOS', 'Linux', 'macOS', 'Nintendo Switch', 'Nintendo 3DS', 'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PS Vita', 'Wii U', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series S/X', ]
    
        const history = useHistory();
        const allGenres = useSelector(state => state.genres);
        const dispatch = useDispatch()
        
        useEffect(() => {
            dispatch(getGenres())
        }, [])
        
        
    const handleOnChange = (e) => {
     setGame({...game, [e.target.name]: e.target.value})
     setErrors(validate({...game, [e.target.name]: e.target.value})) 
    }

    const setModal = () => {
        if (!showModal) return s.notShow;
        else return s.showModal
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (!Object.keys(errors).length) {
            if(game.name.length) {
                if(game.rating.length===0) delete game.rating
                if(game.background_image.length === 0) {game.background_image = photo}
                game.genres = game.genres.map(g => parseInt(g))
                console.log(game)
                dispatch(createVideogame(game))
                dispatch(getAllVideogames())
                setShowModal(true)
                setTimeout(() => {
                setShowModal(false)
                history.push('/home')
            }, 2500)
        }
        }
 }
    
 const handleOnSelect = (e, prop) => {
    let genre = allGenres.find(g => g.id == e.target.value)
    if (!game[prop].find(p => p == e.target.value )) {
        if(prop === 'genres' && game.genres.length <= 2) {
            setGame({...game, [e.target.name]: [...game[prop], e.target.value]})
            setErrors(validate({...game, [e.target.name]: e.target.value})) 
            setRenders([...renders, genre])
        } else if (prop === 'platforms' && game.platforms.length <= 5) {
            setGame({...game, [e.target.name]: [...game[prop], e.target.value]})
            setErrors(validate({...game, [e.target.name]: e.target.value})) 
        }
    }
   }

const handleOnClickDelete = (e, prop) => {
    if(e.target.name == 'genre') {
  setGame({...game, genres: game.genres.filter(g => g != prop)})
  setRenders(renders.filter(r => r.id !== parseInt(prop)))
  setErrors(validate({...game, genres: game.genres.filter(g => g != prop)}))
}
else{
  setGame({...game, platforms: game.platforms.filter(p => p !== e.target.value)})
  setErrors(validate({...game, platforms: game.platforms.filter(p => p !== e.target.value)}))
  }
}


    return (
        <div className={showModal && s.opacityBG}>

        <NavBar></NavBar>
        <div className={s.title}><h3>Upload your own Game!</h3></div>
       <form className={s.container} onSubmit={handleOnSubmit} id="videogameForm">
        
       <div className={s.containerII}>
         <div className={s.subContainer}>
            <div className={s.subTitles}>
            <label htmlFor='name' >Name*:</label> 
                <input className={s.inputs} type='text' name='name' key='name' value={game.name} onChange={handleOnChange} placeholder='Example: Warcraft 3'  ></input> 
                {errors.name && <p className={s.danger}>{errors.name}</p>}
            </div>

            <div className={s.subTitles} >
            <label htmlFor='released'>Released Date:</label> 
                <input className={s.iDate} type='date' name='released' key='released' value={game.released} onChange={handleOnChange} ></input> 
               {errors.released && <p className={s.danger}>{errors.released}</p>} 
            </div>
            
            <div className={s.subTitles}>
            <label htmlFor='rating'>Rating:</label> 
                <input title='max. two decimals' className={s.iRating} type='number' name='rating' key='rating' value={game.rating} onChange={handleOnChange} placeholder='From 1 to 5'></input> 
                {errors.rating && <p className={s.danger}>{errors.rating}</p>} 
            </div>

                <div>
                <select required title='max. 3 genres' className={s.selectOption} name='genres' id='genres' onChange={(e) => handleOnSelect(e, e.target.name)}>
                    <option selected disabled value='Genres'>Genres*</option>
                            {allGenres.map(g =>
                        <option value={g.id} name={g.name} key={g.id}>{g.name}</option> )}
                </select>
                <select required title='max. 6 platforms' className={s.selectOption} name='platforms' id='platforms' onChange={(e) => handleOnSelect(e, e.target.name)}>
                    <option selected disabled value='platforms'>Platforms*</option>
                            {platforms.map(p =>
                        <option value={p} name={p} key={p}>{p}</option> )}
                </select>
                        {errors.genres && <p className={s.danger}>{errors.genres}</p>} 
                        {errors.platforms && <p className={s.danger}>{errors.platforms}</p>} 
                </div>
    
            <div>
            <label htmlFor='description' className={s.descT} >Description*:</label>{errors.description && <p className={s.danger}>{errors.description}</p>} 
                <textarea className={s.description} form="videogameForm" name='description' key='description' value={game.description} onChange={handleOnChange} placeholder='Describe your game...' ></textarea>
            </div>

            <div className={s.containeRenders} id='renders'>
                       {renders.length > 0 && renders.map(g =>
                       <div className={s.renders}>
                          <span key={g.id}>{g.name}</span>
                          <button type='button' name='genre'value={g.id} onClick={(e) => {handleOnClickDelete(e, e.target.value)}} >X</button>
                       </div>
                        )}
                           {game.platforms.length > 0 && game.platforms.map(p =>
                        <div className={s.renders}>
                            <span key={p}>{p}</span>
                            <button type='button' name='platforms' value={p} onClick={(e)=>{handleOnClickDelete(e)}}>X</button>
                        </div>
                        )}
                </div>
            </div>

            <div className={s.imageContainer}>
                <img className={s.photoRender} src={game.background_image.includes('http') ? game.background_image : photo} alt='photoRender'></img>
                <label className={s.imageRender} htmlFor='image'>Image:</label>
                    <input className={errors.background_image && s.danger} type='text' pattern='https?://[\w-]+(.[\w-]+)+[/#?]?.*$' title='image url' name='background_image' key='background_image' value={game.background_image} onChange={handleOnChange} placeholder='Insert image url'></input>
                    {errors.background_image && <p className={s.danger}>{errors.background_image}</p>} 
                <input className={s.create} type='submit' value='CREATE!'></input> 
                <div className={setModal()}><Modal /></div>
            </div>
       </div>
        <div>

        </div>
       </form> 
        </div>
    )
}

export default Form