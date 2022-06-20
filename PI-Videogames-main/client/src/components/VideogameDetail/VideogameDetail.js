import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './VideogameDetail.css';
import {connect} from 'react-redux';
import { getVideogameDetail} from '../../actions/index';


export class VideogameDetail extends Component {

    componentDidMount() { // Invocamos la función componentDidMount para que cada vez que el componente sea invocado...
        const videogameDetail = this.props.match.params.videogameId   
        console.log(videogameDetail)
        this.props.getVideogameDetail(videogameDetail)
    }

    render(){
    return (
        console.log(this.props.vgDetail),
        <div key={this.props.vgDetail.id} className="containerDetail">
            <button>Return</button>
            <img src ={this.props.vgDetail.background_image} alt='imageVgD'/>
            <h3>{this.props.vgDetail.name}</h3>
            <h4>Rating: {this.props.vgDetail.rating}</h4>
            <h4>Released: {this.props.vgDetail.released}</h4>
            {/* <div>Platforms: {this.props.vgDetail.platforms.join(' | ')}</div>
            <div>Genres: {this.props.vgDetail.genres.join(' | ')}</div> */}
            <p>{this.props.vgDetail.description}</p>
        </div>
    )
    }
}


function mapStateToProps(state) { 
    return {
        vgDetail: state.videogameDetail 
    }
}

function mapDispatchToProps(dispatch) { // Creamos función para pasar por props las actions a nuestro componente Movie.
    return {
        getVideogameDetail: videogameId => dispatch(getVideogameDetail(videogameId)) // Creamos propiedad getMovieDetail que será la definición de una función que despachará la action. La action recibe el id de una movie. Importamos previamente la función getMovieDetail de nuestro archivo actions para usarla.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideogameDetail); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.