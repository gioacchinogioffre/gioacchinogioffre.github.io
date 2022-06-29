import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilters } from '../../actions/index';
import { useDispatch } from 'react-redux';
import s from './SearchBar.module.css';
import searchButton from '../Icons/search-2.png'

export default function SearchBar({filterByGenre, filterByOrigin, searchByName, filterByPlatforms}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    function handleOnChange(e) {
        setTitle(e.target.value)
    }

    const handleOnClickSearch = (e) => {
        dispatch(getFilters(filterByGenre, filterByOrigin, title, filterByPlatforms))
      }

    return (
     <div className={s.searchBar}>
        <input type='text' value={title} onChange={e=> handleOnChange(e)} placeholder='Search videogame...'></input>
        <Link to='/home' ><button type='button' onClick={e => handleOnClickSearch(e)}><img src={searchButton} alt='searchButton'></img></button></Link>
    </div>
    )
}
