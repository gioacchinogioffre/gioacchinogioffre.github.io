const axios = require('axios');

// export const GET_SEARCH_VIDEOGAMES = 'GET__SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_FILTERS = 'GET_FILTERS';
export const GET_ORDERS = 'GET_ORDERS';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const SET_LOADING = 'SET_LOADING';



export function getAllVideogames(){
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogames`)
        .then(res => res.json())
        .then(games =>
            dispatch({type: GET_ALL_VIDEOGAMES, payload: games}))
    }
}

export function cleanDetail(){
    return {type: CLEAN_DETAIL} 
    }

export function setLoading(){
    return {type: SET_LOADING} 
        }
    
    export function getVideogameDetail(id){
        return function(dispatch) {
            return fetch(`http://localhost:3001/videogames/${id}`)
            .then(res => res.json())
            .then(detail =>
                dispatch({ type: GET_VIDEOGAME_DETAIL, payload: detail }))
            }
        }
        
        
        export function createVideogame(game){
            return function (dispatch) {
                return axios.post(`http://localhost:3001/videogames`, game)
                // .then(res => res.data.json())
                .then(game =>
                    dispatch({ type: CREATE_VIDEOGAME, payload: {game:game.data.game, msg: game.data.message}}))
                }
            }
            
            export function deleteVideogame(id) {
                return function (dispatch) {
                    return axios.delete(`http://localhost:3001/videogames/${id}`)
                    .then(msg =>
                        dispatch({ type: DELETE_VIDEOGAME, payload: msg }))
                }    
            }
            
            export function getGenres() {
                return function (dispatch) {
        return fetch(`http://localhost:3001/genres`)
        .then (res => res.json())
        .then (genres => dispatch({type: GET_GENRES, payload: genres}))
    }
} 

export function getOrders(orders) {
    return {type: GET_ORDERS, payload: orders} 
} 
export function getFilters(filterByGenre, filterByOrigin, searchByName, filterByPlatforms) {
    return {type: GET_FILTERS, payload: {filterByGenre, filterByOrigin, searchByName, filterByPlatforms}}
}