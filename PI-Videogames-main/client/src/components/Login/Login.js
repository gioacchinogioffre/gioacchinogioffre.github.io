import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import s from './Login.module.css';

export class Login extends Component {

    render(){
    return (  
        <div>
        <NavBar></NavBar>
        <div className={s.login}>
            <form>
                <div className={s.input}>
                    <label>Username</label>
                    <input type="text" name="" required=""/>
                </div>
                <div className={s.input}>
                    <label>Password</label>
                    <input type="password" name="" required=""/>
                </div>
                <button className={s.button}>LOG IN</button>
            </form>
        </div>
        </div>
    )
}
}