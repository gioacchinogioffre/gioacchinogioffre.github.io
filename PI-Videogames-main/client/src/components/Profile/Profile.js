import React, { useState }  from 'react';
import NavBar from '../NavBar/NavBar'
import { useAuth0 } from '@auth0/auth0-react';
import s from './Profile.module.css';

export default function Profile() {

   const { user } = useAuth0();

   console.log(user)

    return (
            <div>
                <NavBar/>
                <div className={s.info}>
                    <h1> Welcome {user.name}!</h1>
                    <img src={user.picture} alt='profile'></img>
                    <p>Thank you so much for signing up in our website!!!<br></br><br></br>You can now create your own videogames and soon <br></br> you will be able to save them in your profile<br></br> and save your favorite games to review them later. <br></br><br></br>Enjoy it!</p>
                </div>
            </div>
    )
}
