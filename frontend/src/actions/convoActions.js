import {
    CONVO_START_REQUEST,
    CONVO_START_SUCCESS,
    CONVO_START_FAIL,
    CONVO_START_RESET,
    CONVO_NEW_MESSAGE_REQUEST,
    CONVO_NEW_MESSAGE_SUCCESS,
    CONVO_NEW_MESSAGE_FAIL,
    CONVO_GET_CONVO_REQUEST,
    CONVO_GET_CONVO_SUCCESS,
    CONVO_GET_CONVO_FAIL,
    CONVO_USER_CONVOS_REQUEST,
    CONVO_USER_CONVOS_SUCCESS,
    CONVO_USER_CONVOS_FAIL,
    CONVO_EXIST_CONVO_REQUEST,
    CONVO_EXIST_CONVO_SUCCESS,
    CONVO_EXIST_CONVO_FAIL,
} from '../constants/convoConstants'
import axios from 'axios'

export const startConvo = (receiver) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CONVO_START_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post('/api/convos', {
            receiver,
        }, config)
    
        dispatch({
            type: CONVO_START_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONVO_START_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const newMessage = (convoId, message) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CONVO_NEW_MESSAGE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        await axios.post('/api/convos/newmessage', {
            convoId,
            message,
        }, config)
    
        dispatch({
            type: CONVO_NEW_MESSAGE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: CONVO_NEW_MESSAGE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getConvo = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CONVO_GET_CONVO_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/convos/${id}`, config)
    
        dispatch({
            type: CONVO_GET_CONVO_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONVO_GET_CONVO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getExistConvo = (receiverId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CONVO_EXIST_CONVO_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/convos/exist/${receiverId}`, config)
    
        dispatch({
            type: CONVO_EXIST_CONVO_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONVO_EXIST_CONVO_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getConvos = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: CONVO_USER_CONVOS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get('/api/convos', config)
    
        dispatch({
            type: CONVO_USER_CONVOS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: CONVO_USER_CONVOS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}