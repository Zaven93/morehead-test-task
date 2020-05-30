import axios from "axios";
import {GET_USERS, GET_USERS_FAILED, EDIT_USER, DELETE_USER, CREATE_USER} from "./types";


export const getUsers = () => async (dispatch) => {
    try {
        const res = await axios.get("http://77.120.241.80:8911/api/users");
        
        console.log("Data from actions", res);

        dispatch({type: GET_USERS, payload: res.data})
    } catch (error) {
        console.log(error.message);

        dispatch({type: GET_USERS_FAILED, error: error.response.statusText, status: error.response.status })
    }
}

export const editUserRedux = (inputData) => async (dispatch) => {
    try {
        const res = await axios.put(`http://77.120.241.80:8911/api/user/${inputData.id}`, inputData)

        dispatch({type: EDIT_USER, payload: res.data});
    } catch (error) {
        console.log(error.message);

        dispatch({type: GET_USERS_FAILED, error: error.message})
    }
}

export const removeUserRedux = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://77.120.241.80:8911/api/user/${id}`);

        console.log("Response from action", res)

        dispatch({type: DELETE_USER, payload: res.data})
    } catch (error) {
        console.error(error.message);

        dispatch({type: GET_USERS_FAILED, error: error.message})
    }
}

export const createUser = (inputData) => async (dispatch) => {
    try {
        const res = await axios.post("http://77.120.241.80:8911/api/users", inputData);

        dispatch({type: CREATE_USER, payload: res.data})
    } catch (error) {
        console.error(error.message);

        dispatch({type: GET_USERS_FAILED, error: error.message})
    }
}