import React, { Component } from 'react';
import s from './ModalNotFound.module.css'
import crush from '../Icons/crush.png'

export class NotFound extends Component {
    render(){
    return (  
        <main>
            <div>
            <h1 className={s.errorTitle}>Ups...</h1><img src={crush} alt='crush'></img>
            </div>
            <h2 className={s.errorSubTitle}>not games around</h2>
        </main>
    )
}
}

export default NotFound
