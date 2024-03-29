import React, { useState } from 'react';
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
        setTitle(e.target.value)
    }

    const handleOnClickSearch = (e) => {
        if(title.length>0 && title[0]!==' ') {
            history.push('/home')
            dispatch(getFilters((!filterByGenre ? [] : filterByGenre), (!filterByOrigin ? [] : filterByOrigin), title, (!filterByPlatforms ? [] : filterByPlatforms)))
            setTitle('')
        }
      }

      const handleSubmitEnter = (e) => {
        if (e.key === "Enter" && title.length>0 && title[0]!==' ') {
            history.push('/home')
             dispatch(getFilters((!filterByGenre ? [] : filterByGenre), (!filterByOrigin ? [] : filterByOrigin), title, (!filterByPlatforms ? [] : filterByPlatforms)))
            setTitle("");
        }
    }

    return (
     <div className={s.searchBar}>
        <input type='text' value={title} onChange={e=> handleOnChange(e)} onKeyDown={e => handleSubmitEnter(e)} placeholder='Grand Theft Auto, Left 4 Dead, Spider Man...'></input>
        <button type='button' onClick={e => handleOnClickSearch(e)}><img src={searchButton} alt='searchButton'></img></button>
    </div>
    )
}
