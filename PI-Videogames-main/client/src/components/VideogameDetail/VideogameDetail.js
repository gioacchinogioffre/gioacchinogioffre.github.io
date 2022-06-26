import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { getVideogameDetail, deleteVideogame} from '../../actions/index';
import NavBar from '../NavBar/NavBar';
import s from './VideogameDetail.module.css'
import rating from '../Icons/rating.png'
import swal from 'sweetalert';


export class VideogameDetail extends Component {

    componentDidMount() { // Invocamos la función componentDidMount para que cada vez que el componente sea invocado...
        const videogameDetail = this.props.match.params.videogameId
        this.props.getVideogameDetail(videogameDetail)
    }

    handleOnDelete = () => {
        console.log(this.props.vgDetail[0].id)
        this.props.deleteVideogame(this.props.vgDetail[0].id)
        // this.props.history.push('/home')

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this videogame!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
             this.props.deleteVideogame(this.props.vgDetail.id)
             this.props.history.push('/home')
             swal("Videogame has been deleted!", {
                 icon: "success",
                });
            } else {
              swal("Your videogame is safe!");
            }
          });
    }

    handleOnClick = () => {
        this.props.history.push('/home')
    }

    render(){
    return (  
        <div>
        <NavBar/>
        <button onClick={this.handleOnClick}>Return</button>
        <br></br>
     {this.props.vgDetail && this.props.vgDetail.map(vg =>
        <div key={vg.name}>

            <div key={vg.id} className={s.container}>
              <div><img className={s.image} src ={vg.background_image} alt='imageVgD'/></div>
              <div className={s.vgContainer}>
                 <h1>{vg.name}</h1>
                 <p className={s.description}>{vg.description}</p>
              </div>
           </div>

            <div>
                    <h3>Rating: {vg.rating}</h3><img className={s.imageP} src={rating}></img> 
            </div>

                    <h3>Released: {vg.released}</h3>
            <div>Platforms: {vg.platforms.join(' | ')}</div>

            <div>Genres: {vg.genres.map(g => g.name).join(' | ')}</div>
                {vg.createdOnDb && <button onClick={this.handleOnDelete}>DELETE GAME</button>}
        </div>
        )
    }
    </div>
    )
}
}


function mapStateToProps(state) { 
    return {
        vgDetail: state.videogameDetail,
    }
}

function mapDispatchToProps(dispatch) { // Creamos función para pasar por props las actions a nuestro componente Movie.
    return {
        getVideogameDetail: videogameId => dispatch(getVideogameDetail(videogameId)),
        deleteVideogame: id => dispatch(deleteVideogame(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideogameDetail); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.