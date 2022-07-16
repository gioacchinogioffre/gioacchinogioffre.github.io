import axios from 'axios';


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
        return axios(`/videogames`)
        .then(games =>
            dispatch({type: GET_ALL_VIDEOGAMES, payload: games.data}))
    }
}

export function cleanDetail(){
    return {type: CLEAN_DETAIL} 
    }

export function setLoading(payload){
    return {type: SET_LOADING, payload} 
        }
    
    export function getVideogameDetail(id){
        return function(dispatch) {
            try{
                return axios(`/videogames/${id}`)
                .then(detail =>
                    dispatch({ type: GET_VIDEOGAME_DETAIL, payload: detail.data }))
                } catch (e) {
                    dispatch({ type: GET_VIDEOGAME_DETAIL, payload: e.data })
                }
            } 
        }


        
        
    export function createVideogame(game){
            return function (dispatch) {
                return axios.post(`/videogames`, game)
                .then(game =>
                    dispatch({ type: CREATE_VIDEOGAME, payload: {game:game.data.game, msg: game.data.message}}))
                }
            }
            
    export function deleteVideogame(id) {
                return function (dispatch) {
                    return axios.delete(`/videogames/${id}`)
                    .then(msg =>
                        dispatch({ type: DELETE_VIDEOGAME, payload: msg }))
                }    
            }
            
    export function getGenres() {
                return function (dispatch) {
        return axios(`/genres`)
        .then (genres => dispatch({type: GET_GENRES, payload: genres.data}))
    }
} 

export function getOrders(orders) {
    return {type: GET_ORDERS, payload: orders} 
} 
export function getFilters(filterByGenre, filterByOrigin, searchByName, filterByPlatforms) {
    return {type: GET_FILTERS, payload: {filterByGenre, filterByOrigin, searchByName, filterByPlatforms}}
}