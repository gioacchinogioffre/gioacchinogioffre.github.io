import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getFilters } from '../../actions/index';
import { useDispatch } from 'react-redux';
import s from './SearchBar.module.css';
import searchButton from '../Icons/search-2.png'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    function handleOnChange(e) {
        setTitle(e.target.value)
    }

    const handleOnClickSearch = (e) => {
        dispatch(getFilters('all', null, title))
      }

    return (
     <div className={s.searchBar}>
        <input type='text' value={title} onChange={e=> handleOnChange(e)} placeholder='Search videogame...'></input>
        <button type='button' onClick={e => handleOnClickSearch(e)}><img src={searchButton}></img></button>
    </div>
    )
}
