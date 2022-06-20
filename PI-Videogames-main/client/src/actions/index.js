export const GET_SEARCH_VIDEOGAMES = 'GET__SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';



export function getAllVideogames(){
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogames`)
        .then(res => res.json())
        .then(games =>
            dispatch({type: GET_ALL_VIDEOGAMES, payload: games}))
    }
}

export function getVideogames(title){
    console.log(title)
    return function(dispatch) {
        return fetch(`http://localhost:3001/videogames?name=${title}`)
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


export function createVideogame(){}

export function deleteVideogame(id) {
    return {type: DELETE_VIDEOGAME, payload: id}

}
