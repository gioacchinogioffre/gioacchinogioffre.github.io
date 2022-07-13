import React from 'react';
import NavBar from '../NavBar/NavBar';
import profile from '../Icons/profile.jpg';
import s from './FAQ.module.css';
import linkedin from '../Icons/linkedin.png';
import github from '../Icons/github.png';


export default function About() {
    return (
        <div>
            <NavBar/>       
            <div className={s.container}>
                <div className={s.about}>
                <img  className={s.profile} src={profile} alt='profile'></img>
                    <div className={s.contact}>
                        <h2>Contact</h2>
                        <div>
                        <a href='https://www.linkedin.com/in/joaquingioffre/' target="_blank" rel='noreferrer'><img className={s.linkedin} src={linkedin} alt='linkedin'></img></a>
                        <a href='https://github.com/gioacchinogioffre' target="_blank" rel='noreferrer'><img className={s.github} src={github} alt='github'></img></a>
                        </div>
                    </div>
                <p>Hi everybody! My name is Joaquín Gioffre. Welcome to my first project 🚀 <br></br><br></br>In this opportunity, I'm bringing to you my idea of what I think a leading videogame platform should be. I hope you enjoy testing it as much as I enjoyed developing it 😁 <br></br><br></br>I would really appreciate any suggestions and feedback to keep improving the app 🙏🏼 <br></br><br></br>Enjoy your gaming!</p> 
                </div>
                
                <div className={s.faq}>
                <h2>What is Ki Games?</h2>
                <p>Ki Games is a prototype of a leading videogame database platform that combines videogames of the world most popular companies and also provides you the opportunity to be a part of this universe and promote your own videogames.</p>
                <h2>What can you do here?</h2>
                <p>You can search video games by name, filter them by more than one genre and platform, and combine them with each other.</p> 
                <h2>And what if you sign up?</h2>
                <p>You can show your talent to the world and upload your own videogames to be ranked by the community. Take the chance and become popular!</p> 
                <h2>How can you contribute to Ki Games?</h2>
                <p>Simple. Share your feedback! </p> 
                </div>
            </div>
        </div>
    )
}