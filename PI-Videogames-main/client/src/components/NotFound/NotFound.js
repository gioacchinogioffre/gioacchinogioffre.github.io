import React, { Component } from 'react';
import s from './NotFound.module.css'
import ghost from '../Icons/ghostII.png'
import {Link} from 'react-router-dom';

export class NotFound extends Component {
    render(){
    return (  
        <div>
            <div className={s.notFound}>
                <h1>ERROR</h1>
                <div>
                <h1 className={s.errorTitle}>4</h1><img src={ghost} alt='ghost'></img><h1 className={s.errorTitle}>4</h1>
                </div>
                <h2 className={s.errorSubTitle}>page not found</h2>
                <Link to='/home'> <button>GO HOME!</button></Link>
            </div>
        </div>
        )
}
}

export default NotFound
