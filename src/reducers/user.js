import {GET_USERS, GET_USERS_FAILED, EDIT_USER, DELETE_USER, CREATE_USER} from "../actions/types";

const initialState = {
    users: [],
    error: null,
    loading: true
}

export default (state = initialState, action) => {
    const {type, payload, error} = action
   switch(type){
        case GET_USERS:
           return {
               ...state,
               loading: false,
               users: payload
           }
        case EDIT_USER: 
           return {
            ...state,
            loading: false,
            users: [...state.users, payload]
        }   
        case CREATE_USER: 
            return {
                ...state,
                lading: false,
                users: [...state.users.unshift(payload)]
            }
        case DELETE_USER: 
            return {
                ...state,
                loading: false,
                users: [...payload]
            }
        case GET_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: error
            }  
        default:
            return state    
   }
}