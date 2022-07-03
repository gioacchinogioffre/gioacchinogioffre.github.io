import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFilters } from '../../actions/index';
import { useDispatch } from 'react-redux';
import s from './SearchBar.module.css';
import searchButton from '../Icons/search-2.png'
import { useHistory } from 'react-router-dom';

export default function SearchBar({filterByGenre, filterByOrigin, searchByName, filterByPlatforms, handleOnClear}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('')

    function handleOnChange(e) {
        console.log(filterByGenre, filterByOrigin, filterByPlatforms)
        setTitle(e.target.value)
    }




    const handleOnClickSearch = (e) => {
        // setTitle('')
        history.push('/home')
        // dispatch(getFilters(filterByGenre, filterByOrigin, title, filterByPlatforms))
        dispatch(getFilters((!filterByGenre ? [] : filterByGenre), (!filterByOrigin ? [] : filterByOrigin), title, (!filterByPlatforms ? [] : filterByPlatforms)))
        setTitle('')
      }

      const handleSubmitEnter = (e) => {
        if (e.key === "Enter") {
            history.push('/home')
            // dispatch(getFilters(filterByGenre, filterByOrigin, title, filterByPlatforms));
             dispatch(getFilters((!filterByGenre ? [] : filterByGenre), (!filterByOrigin ? [] : filterByOrigin), title, (!filterByPlatforms ? [] : filterByPlatforms)))
            setTitle("");
        }
    }

    return (
     <div className={s.searchBar}>
        <input type='text' value={title} onChange={e=> handleOnChange(e)} onKeyDown={e => handleSubmitEnter(e)} placeholder='Search videogame...'></input>
        <button type='button' onClick={e => handleOnClickSearch(e)}><img src={searchButton} alt='searchButton'></img></button>
    </div>
    )
}
