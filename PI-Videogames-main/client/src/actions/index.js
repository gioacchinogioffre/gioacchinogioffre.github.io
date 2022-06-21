const axios = require('axios');

export const GET_SEARCH_VIDEOGAMES = 'GET__SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';



export function getAllVideogames(){
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogames`)
        .then(res => res.json())
        .then(games =>
            dispatch({type: GET_ALL_VIDEOGAMES, payload: games}))
    }
}



export function getVideogames(title){
    console.log(title, 'JORGE')
    return function(dispatch) {
        return axios(`http://localhost:3001/videogames?name=${title}`)
        .then(res => res.json())
        .then(games =>
            dispatch({ type: GET_SEARCH_VIDEOGAMES, payload: games }))
    }
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
        .then(res => res.json())
        .then(game =>
            dispatch({ type: CREATE_VIDEOGAME, payload: {game:game.data.game, msg: game.data.message}}))
    }
}

export function deleteVideogame(id) {
    return {type: DELETE_VIDEOGAME, payload: id}

}

export function getGenres() {
    return function (dispatch) {
        return fetch(`http://localhost:3001/genres`)
        .then (res => res.json())
        .then (genres => dispatch({type: GET_GENRES, payload: genres}))
    }
} 
