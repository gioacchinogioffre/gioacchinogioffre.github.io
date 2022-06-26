import React, { useEffect, useDispatch, Component} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getGenres } from '../../actions';
import { connect } from 'react-redux';
import s from './LandingPage.module.css'
import radar from '../Icons/rastreador.png'
import sony from '../Icons/sony.png'
import nintendo from '../Icons/nintendo3.png'
import battle from '../Icons/battle.png'
import sega from '../Icons/sega.png'



export class LandingPage extends Component {

    componentDidMount() {
        this.props.getGenres()
    }

    render () {
    return (
         <div>
            <nav className={s.navLp}>
                <div className={s.titleDiv}>
                    <h1 className={s.Title}> Ki </h1>
                    <img className={s.radar} src={radar} alt='radar'></img>
                </div>
                <div>
                    <a className={s.signUp}> LOG IN </a>
                    <button className={s.signUp}>SIGN UP</button>
                </div>
            </nav>

            <div className={s.landingPage}>
                <div><h1 className={s.title}>THE MOST POPULAR VIDEOGAME API IN THE WHOLE WORD</h1></div>
                <br></br>
            
                <div className={s.video}>
                <iframe className={s.video} autoplay='1' width="560" height="315" src="https://www.youtube.com/embed/ItuSud27wkU?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div className={s.info}>
                    <div className={s.first}>
                        <h2>What can you do here?</h2>
                        <p>Search videogames, genres...crear Jorges ajskdjklasdlkasdks</p>
                    </div>

                    <div className={s.first}>
                        <h2>What can you do here?</h2>
                        <p>Search videogames, genres..dasjklasldkajskldjskdzsljdz.</p>
                    </div>

                    <div className={s.first}>
                        <h2>It's free!</h2>
                        <p>Register if you want to receive news with the latest game info</p>
                    </div>

                 </div>

                        <button>
                            <Link className={s.link} to='/home'>GET STARTED</Link>
                        </button>

                     <div className={s.sponsor} >
                            <h2>Sponsored by</h2>
                            <div className={s.icons}>
                                <Link exact to='https://www.sony.net'><img className={s.sponsors} src={sony} alt='sony'/></Link>
                                <Link exact to='https://www.nintendo.com'><img className={s.sponsors} src={nintendo} alt='nintendo'/></Link>
                                <Link exact to='https://www.capcom.com'><img className={s.sponsors} src={battle} alt='battle'/></Link>
                                <Link exact to='https://www.capcom.com'><img className={s.sponsors} src={sega} alt='sega'/></Link>
                            </div>
                     </div>
                    
                 </div>
            </div>
    )
}
}


function mapDispatchToProps(dispatch) {
    return {
      getGenres: () => dispatch(getGenres())
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(LandingPage); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps