import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Videogames.css';
import { connect } from 'react-redux';
import Filters from '../Filters/Filters';

export class Videogames extends Component {
   
   render() {
    return (
        <header className="videogames">

            <div>{Filters}</div>

            {/* <div className='filters'>
                <div className='genre_games_filters'>
                       <label>Filter By</label>
                        <select name='all_db_games'>
                            <option value='all_games'>All Games</option>
                            <option value='db_games'>Created Games</option>
                        </select>
                        <select name='genres'>
                            <option value='genres'>Genres</option>
                         </select>
                </div>
                <div className='alphabetic_rating_orders'>
                      <label>Order By</label>
                        <select name='alphabetic'>Alphabet
                            <option value='a-z'>Ascending A-Z</option>
                            <option value='z-a'>Descending Z-A</option>
                        </select>
                        <select name='rating' placeholder='Rating'>Rating
                            <option value='1-10'>1-10</option>
                            <option value='10-1'>10-1</option>
                         </select>
                </div>
             </div> */}

             <div className='createVd'>
                <Link to='/createVideoGame'><button>Create Game</button></Link>
            </div>

             <div className='containerVideogames'>
                    ACA VAN LOS VIDEO JUEGOS
                    <ul>
                        {this.props.videogames && this.props.videogames.map(vg => 
                            <div key={vg.id}>
                                <img src={vg.background_image} alt='videogameImage'/>
                                <h3><Link to={`/videogames/${vg.id}`}>{vg.name}</Link></h3>
                                <li>Platforms: {vg.platforms.join(' | ')}</li>
                                <li>Genres:  {vg.genres.join(' | ')}</li>
                            </div>)
                        }
                    </ul>
             </div>

        </header>
    )
    }
}

function mapStateToProps(state) { // Creamos función mapStateToProps que nos traerá el state global almacenado en store.
    return {
        videogames: state.videogames // // Creamos propiedad movie donde nos guardaremos el objeto de la película seleccionada que guardará como propiedades sus detalles. Ahora al componente Movie, le llegará como props la propiedad movie. (podrá acceder mediante this.movie)
    }
}


export default connect(mapStateToProps, null)(Videogames); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.
