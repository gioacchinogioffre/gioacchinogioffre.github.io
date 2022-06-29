import { GET_VIDEOGAME_DETAIL, DELETE_VIDEOGAME, CREATE_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_GENRES, GET_FILTERS, GET_ORDERS} from '../actions/index';


const initialState = {
    filteredVideogames: [],
    videogames: [],
    videogameDetail:[],
    genres: [],
    orders: [],
    msg: ''
}

export default function rootReducer(state = initialState, action) {

    switch(action.type) {
        case GET_ALL_VIDEOGAMES: return {...state, videogames: action.payload, filteredVideogames:action.payload}

        case GET_VIDEOGAME_DETAIL: return {...state, videogameDetail: [action.payload]}

        case CREATE_VIDEOGAME: return {...state, videogames: [...state.videogames, action.payload.game], msg: action.payload.msg}

        case DELETE_VIDEOGAME: return {...state}

        case GET_GENRES: return {...state, genres: action.payload}

        case GET_FILTERS: 
        let filters = [...state.videogames]
        let byOrigin = action.payload.filterByOrigin
        let byGenre = action.payload.filterByGenre
        let byName = action.payload.searchByName
        let byPlatforms = action.payload.filterByPlatforms

        console.log(byGenre)
      
        // if(byGenre !== 'all') { 
        //     filters = filters.filter(videogame => {
        //         let genre = videogame.genres.find(vg => vg.name.includes(byGenre))
        //         return genre})
        //     }

          if(byGenre.length > 0) { 
            if (byGenre.includes('All')) {
                
            } else {
                for (let i = 0; i < byGenre.length; i++) {
                    filters = filters.filter(videogame => {
                        let genre = videogame.genres.find(vg => vg.name.includes(byGenre[i]))
                        return genre})
                }
            }
            }
            // console.log(byGenre)

        //  if(byPlatforms !== 'All Platforms') { 
        //     filters = filters.filter(videogame => {
        //         let platform = videogame.platforms.find(p => p == byPlatforms)
        //         return platform})
        //         }
        
                if(byPlatforms.length > 0) { 
                    if(byPlatforms.includes('All Platforms')) {
                    }
                    else {for (let i = 0; i < byPlatforms.length; i++) {
                            filters = filters.filter(videogame => {
                                let platform = videogame.platforms.find(p => p == byPlatforms[i])
                                return platform})
                        }
                        }
                        }


                
        if(byOrigin === 'Created') filters = filters.filter(videogame => videogame.createdOnDb === true)
        if(byOrigin === 'Api')  filters = filters.filter(videogame => videogame.createdOnDb === undefined)
        if(byOrigin === 'All Games' && byGenre === 'All Genres') filters =[...state.videogames]
            
        if(byName) filters = filters.filter(vg => vg.name.toLowerCase().includes(byName.toLowerCase()))
            
        return {...state, filteredVideogames: filters}

        case GET_ORDERS:
        let vgOrder = [...state.filteredVideogames]
        let byOrder = action.payload
        let byRating = action.payload
    
        if(byOrder === 'descending') vgOrder = vgOrder.sort((a,b) => {
            if(a.rating < b.rating) return 1
            if(a.rating > b.rating) return -1
            return 0})

        if(byOrder === 'ascending') vgOrder = vgOrder.sort((a,b) => {
             if(a.rating > b.rating) return 1
             if(a.rating < b.rating) return -1
             return 0})

        if(byRating === 'a-z') vgOrder = vgOrder.sort((a,b) => a.name.localeCompare(b.name))
        if(byRating === 'z-a') vgOrder = vgOrder.sort((a,b) => b.name.localeCompare(a.name))

        return {...state, filteredVideogames: vgOrder}
        
        default: return {...state}

    }
}