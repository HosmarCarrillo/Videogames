import axios from 'axios';

export function getVideoGames() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames",);
            return dispatch({
                type: 'GET_VIDEO_GAMES',
                payload: json.data
            });
        }catch(error){
            console.log(error)
            alert("Debes ingresar un Video Juego Existente")
        }
    };
};

export function getNameVideoGame(name){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: "GET_NAME_VIDEO_GAMES",
                payload: json.data
            });
        }catch(error){
            console.log(error)
            alert("Debes ingresar un Video Juego Existente")
        };
    };
};

export function getGender() {
    return async function (dispatch) {
        var info = await axios.get("http://localhost:3001/");
        return dispatch({
        type: 'GET_GENDER',
        payload: info.data
        });
    };
};

export function orderByRating(payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    };
};

export function filterCreated(filterBy, origin){
    return{
        type: 'FILTER_CREATED',
        payload: { filterBy, origin }
    };
};

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    };
};

export function getDetail (id){
    return async function(dispach){
        try {
            const json = await axios.get(`http://localhost:3001/videogames/${id}`);           
            return dispach({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error) {
            console.log(error);
        };
    };
};

export function addVideoGame(payload) {
    return async function (dispatch) {
        try{
            var info = await axios.post("http://localhost:3001/videogames", payload);
            alert("Video Juego Creado")
            return dispatch({
                type: 'ADD_VIDEO_GAME',
                payload: info.data
            })
        }catch(e){
            console.log(e);
        };
    };
};
export function clearState() {
    return {
      type: "CLEAR_STATE",
    };
  };

export function filterVideoGamesByGender(payload){
    return{
        type: 'FILTER_BY_GENDER',
        payload: payload,
    };
};