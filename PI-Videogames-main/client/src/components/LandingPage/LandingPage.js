import React, { useEffect, useDispatch, Component} from 'react';
import { NavLink, Link } from 'react-router-dom';
import './LandingPage.css';
import { getGenres } from '../../actions';
import { connect } from 'react-redux';



export class LandingPage extends Component {

    componentDidMount() {
        this.props.getGenres()
    }

    render () {
    return (
        <header className="landingPage">
            <nav>
                <ul className="navLP">
                    <li className="pageTitle"> iGioco </li>
                    <button className='signUp'>SIGN UP</button>
                </ul>
            </nav>
            
            <div className='info'>
                <div className='About'></div>
                    <h3>What can you do here?</h3>
                    <p>Search videogames, genres...</p>

                <div className='another info'>
                    <h3>Sponsored By</h3>
                    <ul> 
                        <a>Nintendo | </a>
                        <a>| Sony |</a>
                        <a>| Xbox |</a>
                        <a>| VR </a>
                    </ul>

                </div>
                
                <div className='signingUp'></div>
                    <h3>Sign up for free!</h3>
                    <p>Sign up if you want to receive news with the latest game info</p>
            </div>
            
            <div>
                <button className='button'>
                    <Link to='/home'>TRY IT FOR FREE</Link>
                </button>
            </div>
        </header>
    )
}
}


function mapDispatchToProps(dispatch) {
    return {
      getGenres: () => dispatch(getGenres())
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(LandingPage); // Conectamos a nuestro componente en primer lugar con el estado global (store) pasándolo como prop mediante mapStateToProps, y en segundo lugar con las actions mediante mapDispatchToProps