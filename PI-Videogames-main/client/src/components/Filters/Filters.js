import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Filters.css';
import { connect } from 'react-redux';

export default function Filters () {
   
    return (
        <header className="videogames">

            <div className='filters'>
                <div className='genre_games_filters'>
                       <label>Filter By</label>
                        <select name='all_db_games'>
                            <option value='all_games'>All Games</option>
                            <option value='db_games'>Created Games</option>
                        </select>
                        <select name='genres'>
                            <option value='genres'>Genres</option>
                         </select>
                </div>
                <div className='alphabetic_rating_orders'>
                      <label>Order By</label>
                        <select name='alphabetic'>Alphabet
                            <option value='a-z'>Ascending A-Z</option>
                            <option value='z-a'>Descending Z-A</option>
                        </select>
                        <select name='rating' placeholder='Rating'>Rating
                            <option value='1-10'>1-10</option>
                            <option value='10-1'>10-1</option>
                         </select>
                </div>
             </div>

        </header>
    )
}