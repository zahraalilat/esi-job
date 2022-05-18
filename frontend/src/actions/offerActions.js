import axios from 'axios'

import { 
    OFFER_ACCEPT_DELETE_STUDENT_FAIL,
    OFFER_ACCEPT_DELETE_STUDENT_REQUEST,
    OFFER_ACCEPT_DELETE_STUDENT_SUCCESS,
    OFFER_ACCEPT_STUDENT_FAIL,
    OFFER_ACCEPT_STUDENT_REQUEST,
    OFFER_ACCEPT_STUDENT_SUCCESS,
    OFFER_ADD_STUDENT_FAIL,
    OFFER_ADD_STUDENT_REQUEST,
    OFFER_ADD_STUDENT_SUCCESS,
    OFFER_ALL_FAIL,
    OFFER_ALL_REQUEST,
    OFFER_ALL_SUCCESS,
    OFFER_CREATE_FAIL,
    OFFER_CREATE_REQUEST, 
    OFFER_CREATE_SUCCESS, 
    OFFER_GET_ALL_FAIL, 
    OFFER_GET_ALL_REQUEST,
    OFFER_GET_ALL_SUCCESS,
    OFFER_GET_FAIL,
    OFFER_GET_REQUEST,
    OFFER_GET_SUCCESS,
    OFFER_PUBLIC_FAIL,
    OFFER_PUBLIC_REQUEST,
    OFFER_PUBLIC_SUCCESS,
    OFFER_REMOVE_FAIL,
    OFFER_REMOVE_REQUEST,
    OFFER_REMOVE_SUCCESS
} from "../constants/offerConstants"

export const createOffer = (name, desc, neededSkills, place, startDate, endDate, expireAt) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_CREATE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post('/api/offers', {
            name,
            desc,
            neededSkills,
            place,
            startDate,
            endDate,
            expireAt,
        }, config)
    
        dispatch({
            type: OFFER_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const publicOffer = (offerId, isPublic) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_PUBLIC_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/offers/${offerId}`, {
            isPublic,
        }, config)
    
        dispatch({
            type: OFFER_PUBLIC_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_PUBLIC_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listCompanyOffers = (userId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_GET_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/${userId}/offers`, config)
    
        dispatch({
            type: OFFER_GET_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_GET_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteOffer = (offerId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_REMOVE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/offers/${offerId}`, config)
    
        dispatch({
            type: OFFER_REMOVE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_REMOVE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getOffer = (offerId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_GET_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/offers/${offerId}`, config)
    
        dispatch({
            type: OFFER_GET_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listOffers = (page=1, keyword='') => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/offers?page=${page}&keyword=${keyword}`, config)
    
        dispatch({
            type: OFFER_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const offerNewStudent = (offerId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_ADD_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/offers/${offerId}/new`, {}, config)
    
        dispatch({
            type: OFFER_ADD_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_ADD_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptStudent = (offerId, acceptedUser) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_ACCEPT_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/offers/${offerId}/accept/${acceptedUser}`, {}, config)
    
        dispatch({
            type: OFFER_ACCEPT_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_ACCEPT_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptDeleteStudent = (offerId, user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: OFFER_ACCEPT_DELETE_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/offers/${offerId}/accept/delete/${user}`, config)
    
        dispatch({
            type: OFFER_ACCEPT_DELETE_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: OFFER_ACCEPT_DELETE_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}