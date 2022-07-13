import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../../actions';
import { connect } from 'react-redux';
import s from './LandingPage.module.css'
import radar from '../Icons/logophoto3.png'
import sony from '../Icons/sony.png'
import nintendo from '../Icons/nintendo3.png'
import battle from '../Icons/battle.png'
import sega from '../Icons/sega.png'
import photo from '../Icons/landingphoto_2.png'


export class LandingPage extends Component {

    componentDidMount() {
        this.props.getGenres()
    }

    render () {
    return (
         <div>
            <nav className={s.navLp}>
                <div className={s.titleDiv}>
                    <Link><img className={s.radar} src={radar} alt='radar'></img></Link>
                </div>
                <div>
                    <Link to='/login'><button className={s.signUp} > LOG IN </button> </Link>
                    <button className={s.signUp}>SIGN UP</button>
                    <Link to ='/faq' className={s.link}><button className={s.signUp}>FAQ</button></Link>
                </div>
            </nav>

            <div className={s.landingPage}>
                <div><h1 className={s.title}>THE MOST POPULAR GAMING DATABASE IN THE UNIVERSE</h1></div>
                <br></br>
            
                <div className={s.video}>
                    <img className={s.video} src={photo} alt='landingPhoto'></img>
                </div>

                <div className={s.info}>
                    <div className={s.first}>
                        <h2>More than 900k games!</h2>
                        <p>Supporting all genres<br></br> 20+ platforms and counting</p>
                    </div>

                    <div className={s.first}>
                        <h2>IT'S FREE!</h2>
                        <p>Sign up to keep updated about the gaming world <br></br>and be a member of our universe </p>
                    </div>

                    <div className={s.first}>
                        <h2>Show us your talent</h2>
                        <p>Upload your own videogame <br></br>and get it ranked by the community!</p>
                    </div>

                 </div>

                        <button>
                            <Link className={s.link} to='/home'>GET STARTED</Link>
                        </button>

                     <div className={s.sponsor} >
                            <h2>Sponsored by</h2>
                            <div className={s.icons}>
                                <a href='https://www.sony.net' target="_blank" rel='noreferrer'><img className={s.sponsors} src={sony} alt='sony'/></a>
                                <a href='https://www.nintendo.com' target='_blank' rel='noreferrer'><img className={s.sponsors} src={nintendo} alt='nintendo'/></a>
                                <a href='https://us.shop.battle.net/' target='_blank' rel='noreferrer'><img className={s.sponsors} src={battle} alt='battle'/></a>
                                <a href='https://www.sega.es' target='_blank' rel='noreferrer'><img className={s.sponsors} src={sega} alt='sega'/></a>
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
  
  
  export default connect(null, mapDispatchToProps)(LandingPage);