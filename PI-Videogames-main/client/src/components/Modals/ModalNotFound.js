import React, { Component } from 'react';
import s from './ModalNotFound.module.css'
import ghost from '../Icons/ghostII.png'

export class NotFound extends Component {
    render(){
    return (  
        <main>
            <h1>ERROR</h1>
            <div>
            <h1 className={s.errorTitle}>4</h1><img src={ghost}></img><h1 className={s.errorTitle}>4</h1>
            </div>
            <h2 className={s.errorSubTitle}>not games around</h2>
            {/* <button className={s.button} onClick={this.handleOnClick}>Return Home</button> */}
        </main>
    )
}
}
