// IMPORTAR ACTIONS

let videogameExample = {name: 'Warcraft', platforms: ['ps3', 'family'], released: '2013-10-3', rating: 5, genres: ['action', 'multiplayer']}

const initialState = {
    videogames: [videogameExample],
    videogameDetail: {name: 'Warcraft', platforms: ['ps3', 'family'], released: '2013-10-3', rating: 5, genres: ['action', 'multiplayer']},
    genres: []
}

export default function rootReducer(state = initialState, action) {
    return {...state}
}