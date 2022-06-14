import axios from 'axios';

export function getDog() {
    return async function (dispatch) {
        try{
            var json = await axios.get('http://localhost:3001/dogs',{
    
            });
            return dispatch({
                type: 'GET_DOGS',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function filterDogsByTemperament(payload) {
    return{
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }
};

export function filterByCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getNameDogs(name){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/dogs?name=' + name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
            alert('El perro ingresado no existe')
        }
    }
}

export function getTemperaments(){
    return async function (dispatch){
        var temp = await axios.get("http://localhost:3001/temperament", {
        
        });
        return dispatch ( {type: "GET_TEMPERAMENTS", payload: temp.data} );
    }
}

export function postDogs(payload) {
    return async function (dispatch){
        const data = await axios.post("http://localhost:3001/dog", payload);
        return data;
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);
        return dispatch ({
            type: 'GET_DETAILS',
            payload: json.data
        })
        
    }catch(error){
        console.log(error)
    }}
}
