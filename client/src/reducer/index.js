const initialState = {
    videogame: [],
    allvideogames: [],
    gender: [],
    detail: [],
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_VIDEO_GAMES':
            return {
                ...state,
                videogame: action.payload,
                allvideogames: action.payload
            };
            
        case 'GET_NAME_VIDEO_GAMES':
            return{
                ...state,
                videogame: action.payload
            }

        case "GET_DETAILS":
            return{
                ...state,
                    detail: action.payload 
            }
        case "CLEAR_STATE":
            return {
                ...state,
                    detail:[],
                    videogame: [],
        };

        case "FILTER_CREATED":
            const allgames = state.allvideogames;
            const createdFilter =
                action.payload.filterBy === "created"
                ? allgames.filter((el) => el.createdInDb)
                : allgames.filter((el) => !el.createdInDb);
            return {
                ...state,
                    videogame: action.payload === "All" ? state.allvideogames : createdFilter,
            };
        
        case "FILTER_BY_GENDER":
            const videoGamesFilterByGender = action.payload === "All"? state.allvideogames: state.allvideogames.filter (el=> el.gender.includes(action.payload));
                if (!videoGamesFilterByGender.length ) {
                    alert("No hay video juegos de este genero")
                }

            return {
                ...state,
                    videogame: videoGamesFilterByGender.length? videoGamesFilterByGender: state.videogame
            }

        case 'ADD_VIDEO_GAME':
            return {
                ...state,
                    videogame: [...state.videogame, action.payload]
            }  

            case 'ORDER_BY_NAME':
                // const allVG = state.allvideogames;
                let sortedArr = action.payload === 'asc'?
                    state.videogame.sort(function(a,b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                            return 0;
                        }) :
                    state.videogame.sort(function(a,b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                            return 0;
                    })
                let OrderNu = action.payload === 'All'?
                state.videogame.sort(function(a,b){
                        if(a.id > b.id){
                            return 1;
                        }
                        if(b.id > a.id){
                            return -1;
                        }
                            return 0;
                        
                        })
                    : sortedArr
                return {
                    ...state,
                        videogame: action.sortedArr === 'All'? sortedArr : OrderNu
                }
        case 'ORDER_BY_RATING': 
            const allVg = state.allvideogames;
            let ratingOrder = action.payload === 'asc'
                ? allVg.sort(function(a,b){
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if(b.rating > a.rating){
                        return 1;
                    }
                        return 0;
                }) 
                : allVg.sort(function(a,b){
                    if(a.rating > b.rating){
                        return 1;
                    }
                    if(b.rating > a.rating){
                        return -1;
                    }
                        return 0;
                    })
            let ratingOrderN = action.payload === 'All'?
                allVg.sort(function(a,b){
                    if(a.id > b.id){
                        return 1;
                    }
                    if(b.id > a.id){
                        return -1;
                    }
                        return 0;
                    
                    })
                : ratingOrder
            return {
                ...state,
                    videogame: action.ratingOrder === 'All'? ratingOrderN : ratingOrder
            }
        case "GET_GENDER":
            return {
                ...state,
                gender: action.payload,
            };
            default: 
            return state;
        }
    }
export default rootReducer;