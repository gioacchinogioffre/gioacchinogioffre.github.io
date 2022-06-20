import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Videogames.css';
import { connect } from 'react-redux';
import { getAllVideogames } from '../../actions';


export class Videogames extends Component {
    // constructor(props){
    //     super(props)
    // }

    componentDidMount(){
        this.props.getAllVideogames()
    }
   
   render() {
    return (
        <header className="videogames">
           
             <div className='createVd'>
                <Link to='/createVideoGame'><button>Create Game</button></Link>
            </div>

             <div className='containerVideogames'>
                    ACA VAN LOS JUEGUITOS 🙂
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

function mapDispatchToProps(dispatch) {
    return {
        getAllVideogames: () => dispatch(getAllVideogames()) 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Videogames); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.
