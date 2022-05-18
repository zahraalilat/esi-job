import axios from 'axios'

import { 
    ADMIN_USERS_ALL_FAIL, 
    ADMIN_USERS_ALL_REQUEST, 
    ADMIN_USERS_ALL_SUCCESS, 
    ADMIN_USER_DELETE_FAIL, 
    ADMIN_USER_DELETE_REQUEST, 
    ADMIN_USER_DELETE_SUCCESS, 
    ADMIN_USER_FAIL, 
    ADMIN_USER_REQUEST,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_UPDATE_FAIL,
    ADMIN_USER_UPDATE_REQUEST,
    ADMIN_USER_UPDATE_SUCCESS
} from "../constants/adminConstants"

export const getAllUsers = (page=1) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USERS_ALL_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/admin/users?page=${page}`, config)
    
        dispatch({
            type: ADMIN_USERS_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USERS_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getSingleUser = (userId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/admin/users/${userId}`, config)
    
        dispatch({
            type: ADMIN_USER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteUser = (userId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_DELETE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/admin/users/${userId}`, config)
    
        dispatch({
            type: ADMIN_USER_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}


export const updateUser = (userId, isAdmin) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_USER_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/admin/users/${userId}`, {isAdmin}, config)
    
        dispatch({
            type: ADMIN_USER_UPDATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}