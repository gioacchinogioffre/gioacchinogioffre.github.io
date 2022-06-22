import { GET_VIDEOGAME_DETAIL, GET_SEARCH_VIDEOGAMES, DELETE_VIDEOGAME, CREATE_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_GENRES, GET_FILTERS, GET_ORDERS} from '../actions/index';


const initialState = {
    filteredVideogames: [],
    videogames: [],
    videogameDetail:[],
    genres: [],
    orders: []
}

export default function rootReducer(state = initialState, action) {

    switch(action.type) {
        case GET_ALL_VIDEOGAMES: return {...state, videogames: action.payload, filteredVideogames:action.payload}

        case GET_SEARCH_VIDEOGAMES: return {...state, videogames: action.payload}

        case GET_VIDEOGAME_DETAIL: return {...state, videogameDetail: [action.payload]}

        case CREATE_VIDEOGAME: return {...state}

        case DELETE_VIDEOGAME: return {...state}

        case GET_GENRES: return {...state, genres: action.payload}

        case GET_FILTERS: 
        let filters = [...state.videogames]
        let byOrigin = action.payload.filterByOrigin
        let byGenre = action.payload.filterByGenre
        let byName = action.payload.searchByName
      
        if(byName) filters = filters.filter(vg => vg.name.toLowerCase().includes(byName.toLowerCase()))

        if(byGenre !== 'all') filters = filters.filter(videogame => byGenre == videogame.genres.find(genre => genre.name == byGenre).name)

        if(byOrigin === 'all') filters =[...state.videogames]
        if(byOrigin === 'db') filters = filters.filter(videogame => videogame.createdOnDb === true)
        if(byOrigin === 'api')  filters = filters.filter(videogame => videogame.createdOnDb === undefined)

        return {...state, filteredVideogames: filters}

        case GET_ORDERS:
        let vgOrder = [...state.filteredVideogames]
        let byOrder = action.payload
        let byRating = action.payload
        console.log(byRating)
    
        if(byOrder === 'ascending') vgOrder = vgOrder.sort((a,b) => {
            if(a.rating < b.rating) return 1
            if(a.rating > b.rating) return -1
            return 0})

        if(byOrder === 'descending') vgOrder = vgOrder.sort((a,b) => {
             if(a.rating > b.rating) return 1
             if(a.rating < b.rating) return -1
             return 0})

        if(byRating === 'a-z') vgOrder = vgOrder.sort((a,b) => a.name.localeCompare(b.name))
        if(byRating === 'z-a') vgOrder = vgOrder.sort((a,b) => b.name.localeCompare(a.name))

        return {...state, filteredVideogames: vgOrder}
        
        default: return {...state}

    }
}