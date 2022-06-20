import { GET_VIDEOGAME_DETAIL, GET_SEARCH_VIDEOGAMES, DELETE_VIDEOGAME, CREATE_VIDEOGAME, GET_ALL_VIDEOGAMES} from '../actions/index';

let videogameExample = {name: 'Warcraft', platforms: ['ps3', 'family'], released: '2013-10-3', rating: 5, genres: ['action', 'multiplayer']}

const initialState = {
    videogames: [],
    videogameDetail:{},
    genres: []
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_VIDEOGAMES: return {...state, videogames: action.payload}

        case GET_SEARCH_VIDEOGAMES: return {...state, videogames: action.payload}

        case GET_VIDEOGAME_DETAIL: return {...state, videogameDetail: action.payload}

        case CREATE_VIDEOGAME: return {...state}

        case DELETE_VIDEOGAME: return {...state}
        
        default: return {...state}

    }
}