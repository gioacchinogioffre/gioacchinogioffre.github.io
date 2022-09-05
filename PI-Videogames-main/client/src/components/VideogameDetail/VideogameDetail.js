import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getVideogameDetail, cleanDetail, setLoading} from '../../actions/index';
import NavBar from '../NavBar/NavBar';
import s from './VideogameDetail.module.css'
import rating from '../Icons/star-2.png'
import loading from '../Icons/loadingII.gif'
import ModalDelete from '../Modals/ModalDelete';
import NotFound from '../NotFound/NotFound';


export class VideogameDetail extends Component {

    

    componentDidMount() {
        const videogameDetail = this.props.match.params.videogameId
        this.props.getVideogameDetail(videogameDetail)
        this.props.setLoading(false)
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.cleanDetail()
        this.props.setLoading()
    }
    
    handleOnClick = () => {
        this.props.history.push('/home')
    }


    render(){
    return (  
        <div>
        <NavBar/>
     {!this.props.loading ?
      (this.props.vgDetail[0] && (this.props.vgDetail[0].name ? this.props.vgDetail.map(vg =>
        <div key={vg.name}>

            <div key={vg.id} className={s.container}>
              <img className={s.image} src ={vg.background_image} alt='imageVgD'/>

              <div className={s.vgContainer}>
                 <h1>{vg.name}</h1>
                 <h3>Released: {vg.released}</h3>
                 <p className={s.description}>{vg.description}</p>
              </div>
                <ModalDelete className={s.delete} createdOnDb={vg.createdOnDb} id={vg.id}/>
           </div>

           <div className={s.info}>
                <div className={s.infoGP}><p>Genres: {vg.genres.map(g => g.name).join(' | ')}</p></div>

                <div className={s.infoGP}>
                    <h3>Rating: {vg.rating}</h3><img src={rating} alt ='rating'></img>
                </div>

                <div className={s.infoGP}><p>{vg.platforms.join(' | ')}</p></div>

                </div>
           </div>

        ) : <NotFound/>))
        :  <div className={s.loading}>
        <img src={loading} alt='loading'></img>
      </div>
    }
    </div>
    )
}
}


function mapStateToProps(state) { 
    return {
        vgDetail: state.videogameDetail,
        loading: state.loading,
    }
}

function mapDispatchToProps(dispatch) { 
    return {
        getVideogameDetail: videogameId => dispatch(getVideogameDetail(videogameId)),
        cleanDetail: () => dispatch(cleanDetail()),
        setLoading: () => dispatch(setLoading()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideogameDetail); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps.