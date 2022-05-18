import axios from 'axios'

import { 
    TRAINING_ACCEPT_DELETE_STUDENT_FAIL,
    TRAINING_ACCEPT_DELETE_STUDENT_REQUEST,
    TRAINING_ACCEPT_DELETE_STUDENT_SUCCESS,
    TRAINING_ACCEPT_STUDENT_FAIL,
    TRAINING_ACCEPT_STUDENT_REQUEST,
    TRAINING_ACCEPT_STUDENT_SUCCESS,
    TRAINING_ADD_STUDENT_FAIL,
    TRAINING_ADD_STUDENT_REQUEST,
    TRAINING_ADD_STUDENT_SUCCESS,
    TRAINING_ALL_FAIL,
    TRAINING_ALL_REQUEST,
    TRAINING_ALL_SUCCESS,
    TRAINING_CREATE_FAIL, 
    TRAINING_CREATE_REQUEST, 
    TRAINING_CREATE_SUCCESS, 
    TRAINING_DELETE_FAIL, 
    TRAINING_DELETE_REQUEST, 
    TRAINING_DELETE_SUCCESS, 
    TRAINING_GET_ALL_FAIL, 
    TRAINING_GET_ALL_REQUEST,
    TRAINING_GET_ALL_SUCCESS,
    TRAINING_GET_FAIL,
    TRAINING_GET_REQUEST,
    TRAINING_GET_SUCCESS,
    TRAINING_PUBLIC_FAIL,
    TRAINING_PUBLIC_REQUEST,
    TRAINING_PUBLIC_SUCCESS
} from "../constants/trainingConstants"

export const createTraining = (name, desc, place, tags, price, startDate, endDate, expireAt) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_CREATE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post('/api/trainings', {
            name,
            desc,
            tags,
            place,
            price,
            startDate,
            endDate,
        }, config)
    
        dispatch({
            type: TRAINING_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const publicTraining = (trainingId, isPublic) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_PUBLIC_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/trainings/${trainingId}`, { isPublic }, config)
    
        dispatch({
            type: TRAINING_PUBLIC_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_PUBLIC_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listTrainings = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_GET_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/${userInfo._id}/trainings`, config)
    
        dispatch({
            type: TRAINING_GET_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_GET_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listAllTrainings = (page=1, keyword='') => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/trainings?page=${page}&keyword=${keyword}`, config)
    
        dispatch({
            type: TRAINING_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteTraining = (trainingId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_DELETE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/trainings/${trainingId}`, config)
    
        dispatch({
            type: TRAINING_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getTraining = (trainingId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_GET_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/trainings/${trainingId}`, config)
    
        dispatch({
            type: TRAINING_GET_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const addTrainingStudent = (trainingId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_ADD_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/trainings/${trainingId}/new`, {}, config)
    
        dispatch({
            type: TRAINING_ADD_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_ADD_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptTrainingStudent = (trainingId, accepteUser) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_ACCEPT_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/trainings/${trainingId}/accept/${accepteUser}`, {}, config)
    
        dispatch({
            type: TRAINING_ACCEPT_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_ACCEPT_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptDeleteTrainingStudent = (trainingId, user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRAINING_ACCEPT_DELETE_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/trainings/${trainingId}/accept/delete/${user}`, config)
    
        dispatch({
            type: TRAINING_ACCEPT_DELETE_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: TRAINING_ACCEPT_DELETE_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}