const stateInicial = {
    dogs: [],
    allDog: [],
    temperaments: [],
    detail: []
}   //inicio un estado e importo los type de las acciones


function rootReducer (state = stateInicial, action) {
    switch(action.type) {
        case 'GET_DOGS' :
            return {
                ...state,
                dogs: action.payload,
                //en mi estado manda lo que mande la accion
                allDog : action.payload
            }

            case 'FILTER_BY_TEMPERAMENTS':
                const allDog = state.allDog;
                const temperamentFiltered = action.payload === 'All' ? allDog :
                allDog.filter(e => e.temperament && e.temperament.split(', ').find((d) => d === action.payload))
                return{
                    ...state,
                    dogs: temperamentFiltered,
                }
            
            case "FILTER_CREATED":
                const allDogsCreated = state.allDog;
                const createdFilter = action.payload === "created" ? allDogsCreated.filter(e => e.creareDb) : 
                allDogsCreated.filter(e => !e.creareDb) ;
                console.log(createdFilter)
                return {
                    ...state,
                    dogs: action.payload === 'All' ? allDogsCreated : createdFilter 
                };

            case "ORDER_BY_NAME":
                let arr = action.payload === 'asc' ? 
                state.dogs.sort(function (a, b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) :
                state.dogs.sort(function(a, b){
                    if (a.name > b.name){
                        return -1;
                    }
                    if (b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs: arr
                }
                    
            case "ORDER_BY_WEIGHT": 
                let arrWeight = action.payload === 'ascPeso' ? 
                state.dogs.sort(function (a, b){
                    let num1 = a.weight.split(" - ");
                    let num2 = b.weight.split(" - ");
                    return num1[0] - num2[0];
                }) :
                state.dogs.sort(function(a, b){
                    let num1 = a.weight.split(" - ");
                    let num2 = b.weight.split(" - ");
                    return num2[0] - num1[0];
                })
                return{
                    ...state,
                    dogs: arrWeight
                }
            
            case "GET_NAME_DOGS":
                return{
                    ...state,
                    dogs: action.payload,
                };

            case "POST_DOG":
                return{
                    ...state
                };
              
            case "GET_TEMPERAMENTS":
                return{
                    ...state,
                    temperaments: action.payload
                }
              
            case "GET_DETAILS":
                return{
                    ...state,
                    detail: action.payload
                }
            case 'CLEAN_DETAIL':
                return {
                    ...state,
                    detail: [],
                }
            default: 
               return state;
    }
}

export default rootReducer