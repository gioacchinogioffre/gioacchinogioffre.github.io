import React  from 'react';
import NavBar from '../NavBar/NavBar'
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';
import add from '../Icons/add.png'

export default function Profile() {

   const { user } = useAuth0();

    return (
            <div>
                <NavBar/>
                <div className={s.info}>
                    <h1> Welcome {user?.name}!</h1>
                    <img src={user?.picture} alt='profile'></img>
                    <p>Thank you so much for signing up in our website!<br></br><br></br>You are now able to upload your own videogames<img className ={s.homeIcon} src={add} alt='create'/><br></br><br></br><br></br>And delete them <button>DELETE GAME</button><br></br> <br></br><br></br>We're currently working in the Ki-Games ranking to make your game become popular. Enjoy it!</p>
                </div>
            </div>
    )
}
