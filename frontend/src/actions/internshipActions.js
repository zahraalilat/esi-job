import axios from 'axios'

import { 
    INTERNSHIP_ACCEPT_DELETE_STUDENT_FAIL,
    INTERNSHIP_ACCEPT_DELETE_STUDENT_REQUEST,
    INTERNSHIP_ACCEPT_DELETE_STUDENT_SUCCESS,
    INTERNSHIP_ACCEPT_STUDENT_FAIL,
    INTERNSHIP_ACCEPT_STUDENT_REQUEST,
    INTERNSHIP_ACCEPT_STUDENT_SUCCESS,
    INTERNSHIP_ADD_STUDENT_FAIL,
    INTERNSHIP_ADD_STUDENT_REQUEST,
    INTERNSHIP_ADD_STUDENT_SUCCESS,
    INTERNSHIP_ALL_FAIL,
    INTERNSHIP_ALL_REQUEST,
    INTERNSHIP_ALL_SUCCESS,
    INTERNSHIP_CREATE_FAIL,
    INTERNSHIP_CREATE_REQUEST, 
    INTERNSHIP_CREATE_SUCCESS, 
    INTERNSHIP_DELETE_FAIL, 
    INTERNSHIP_DELETE_REQUEST, 
    INTERNSHIP_DELETE_SUCCESS, 
    INTERNSHIP_GET_ALL_FAIL, 
    INTERNSHIP_GET_ALL_REQUEST, 
    INTERNSHIP_GET_ALL_SUCCESS, 
    INTERNSHIP_GET_FAIL, 
    INTERNSHIP_GET_REQUEST, 
    INTERNSHIP_GET_SUCCESS,
    INTERNSHIP_PUBLIC_FAIL,
    INTERNSHIP_PUBLIC_REQUEST,
    INTERNSHIP_PUBLIC_SUCCESS, 
} from '../constants/internshipConstants'

export const createInternship = (name, desc, place, tags, startDate, endDate, paymentIncluded, exertAt) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_CREATE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post('/api/internships', {
            name,
            desc,
            tags,
            place,
            startDate,
            endDate,
            paymentIncluded,
        }, config)
    
        dispatch({
            type: INTERNSHIP_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const publicInternship = (internshipId, isPublic) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_PUBLIC_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/internships/${internshipId}`, { isPublic }, config)
    
        dispatch({
            type: INTERNSHIP_PUBLIC_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_PUBLIC_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listInternships = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_GET_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/${userInfo._id}/internships`, config)
    
        dispatch({
            type: INTERNSHIP_GET_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_GET_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listAllInternships = (page=1, keyword='') => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_ALL_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/internships?page=${page}&keyword=${keyword}`, config)
    
        dispatch({
            type: INTERNSHIP_ALL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteInternship = (internshipId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_DELETE_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/internships/${internshipId}`, config)
    
        dispatch({
            type: INTERNSHIP_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getInternship = (internshipId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_GET_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/internships/${internshipId}`, config)
    
        dispatch({
            type: INTERNSHIP_GET_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const addInternshipStudent = (internshipId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_ADD_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/internships/${internshipId}/new`, {}, config)
    
        dispatch({
            type: INTERNSHIP_ADD_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_ADD_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptInternshipStudent = (internshipId, acceptedUser) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_ACCEPT_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/internships/${internshipId}/accept/${acceptedUser}`, {}, config)
    
        dispatch({
            type: INTERNSHIP_ACCEPT_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_ACCEPT_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const acceptDeleteInternshipStudent = (internshipId, user) => async(dispatch, getState) => {
    try {
        dispatch({
            type: INTERNSHIP_ACCEPT_DELETE_STUDENT_REQUEST,
        })
    
        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/internships/${internshipId}/accept/delete/${user}`, config)
    
        dispatch({
            type: INTERNSHIP_ACCEPT_DELETE_STUDENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: INTERNSHIP_ACCEPT_DELETE_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}