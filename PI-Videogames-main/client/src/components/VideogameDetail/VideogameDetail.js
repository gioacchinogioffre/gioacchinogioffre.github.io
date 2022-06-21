import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './VideogameDetail.css';
import {connect} from 'react-redux';
import { getVideogameDetail} from '../../actions/index';


export class VideogameDetail extends Component {

    componentDidMount() { // Invocamos la función componentDidMount para que cada vez que el componente sea invocado...
        const videogameDetail = this.props.match.params.videogameId
        this.props.getVideogameDetail(videogameDetail)
    }

    render(){
    return (  
      this.props.vgDetail && this.props.vgDetail.map(vg =>
        <div key={vg.id} className="containerDetail">
            <button><Link to ='/home'>Return</Link></button>
            <br></br>
            <img src ={vg.background_image} alt='imageVgD'/>
            <h3>{vg.name}</h3>
            <h4>Rating: {vg.rating}</h4>
            <h4>Released: {vg.released}</h4>
            <div>Platforms: {vg.platforms.join(' | ')}</div>
            <div>Genres: {vg.genres.map(g => g.name).join(' | ')}</div>
            <p>{vg.description}</p>
        </div>
        ))
        }
}


function mapStateToProps(state) { 
    return {
        vgDetail: state.videogameDetail,
    }
}

function mapDispatchToProps(dispatch) { // Creamos función para pasar por props las actions a nuestro componente Movie.
    return {
        getVideogameDetail: videogameId => dispatch(getVideogameDetail(videogameId)) // Creamos propiedad getMovieDetail que será la definición de una función que despachará la action. La action recibe el id de una movie. Importamos previamente la función getMovieDetail de nuestro archivo actions para usarla.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideogameDetail); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.