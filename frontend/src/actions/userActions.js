import axios from 'axios'
import { INTERNSHIP_ALL_RESET } from '../constants/internshipConstants'
import { OFFER_ALL_RESET } from '../constants/offerConstants'
import { TRAINING_ALL_RESET } from '../constants/trainingConstants'
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_PROFILE_REQUEST, 
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST, 
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,
    USER_PROFILE_RESET,
    USER_DELETE_FIELD_REQUEST,
    USER_DELETE_FIELD_SUCCESS,
    USER_DELETE_FIELD_FAIL,
    USER_GET_ALL_USERS_REQUEST,
    USER_GET_ALL_USERS_SUCCESS,
    USER_GET_ALL_USERS_FAIL,
    USER_NEW_EXPERIENCE_REQUEST,
    USER_NEW_EXPERIENCE_SUCCESS,
    USER_NEW_EXPERIENCE_FAIL,
    USER_NEW_SKILL_REQUEST,
    USER_NEW_SKILL_SUCCESS,
    USER_NEW_SKILL_FAIL,
    USER_DELETE_SKILL_REQUEST,
    USER_DELETE_SKILL_SUCCESS,
    USER_DELETE_SKILL_FAIL,
    USER_REQUESTS_REQUEST,
    USER_REQUESTS_SUCCESS,
    USER_REQUESTS_FAIL,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_ACCEPTED_REQUESTS_REQUEST,
    USER_ACCEPTED_REQUESTS_SUCCESS,
    USER_ACCEPTED_REQUESTS_FAIL,
    USER_ADD_BOOKMARK_REQUEST,
    USER_ADD_BOOKMARK_SUCCESS,
    USER_ADD_BOOKMARK_FAIL,
    USER_DELETE_BOOKMARK_REQUEST,
    USER_DELETE_BOOKMARK_SUCCESS,
    USER_DELETE_BOOKMARK_FAIL,
    USER_GET_BOOKMARKS_REQUEST,
    USER_GET_BOOKMARKS_SUCCESS,
    USER_GET_BOOKMARKS_FAIL,
    USER_MARK_REQUEST,
    USER_MARK_SUCCESS,
    USER_MARK_FAIL,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,
    USER_MARK_ONE_REQUEST,
    USER_MARK_ONE_SUCCESS,
    USER_MARK_ONE_FAIL,
} from "../constants/userConstants"

export const login = (email, password) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const { data } = await axios.post('/api/users/login', {
            email,
            password
        }, config)
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const logout = () => async(dispatch) => {
    dispatch({
        type: USER_LOGOUT,
    })
    dispatch({
        type: USER_REGISTER_RESET,
    })
    dispatch({
        type: USER_PROFILE_UPDATE_RESET,
    })
    dispatch({
        type: USER_PROFILE_RESET,
    })
    dispatch({
        type: OFFER_ALL_RESET,
    })
    dispatch({
        type: TRAINING_ALL_RESET,
    })
    dispatch({
        type: INTERNSHIP_ALL_RESET,
    })
    
    localStorage.removeItem('userInfo')
}

export const register = (name, email, password, isCompany) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const { data } = await axios.post('/api/users', {
            name,
            email,
            password,
            isCompany
        }, config)
    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const listProfile = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get('/api/users/profile', config)
    
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getUser = (userId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/${userId}`, config)
    
        dispatch({
            type: USER_GET_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const updateProfile = (name, email, password, image, bio, skills, phone, address, site, jobExperience, certifications, internships, postalAddress) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put('/api/users/profile', {
            name,
            email,
            password,
            image,
            bio,
            skills,
            phone,
            address,
            site,
            jobExperience,
            certifications,
            internships,
            postalAddress,
        }, config)
    
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteField = (type) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_FIELD_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/users/profile/${type}`, {}, config)
    
        dispatch({
            type: USER_DELETE_FIELD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FIELD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getAllUsers = (keyword='', page=1) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_ALL_USERS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users?keyword=${keyword}&select=name,bio,skills,address,image&page=${page}`, config)
    
        dispatch({
            type: USER_GET_ALL_USERS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_GET_ALL_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const newExperience = (experience) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_NEW_EXPERIENCE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/users/profile/experience`, experience, config)
    
        dispatch({
            type: USER_NEW_EXPERIENCE_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_NEW_EXPERIENCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const newSkill = (skillName, skillPerc) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_NEW_SKILL_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/users/profile/skills`, {
            name: skillName,
            perc: skillPerc,
        }, config)
    
        dispatch({
            type: USER_NEW_SKILL_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_NEW_SKILL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteSkill = (skillId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_SKILL_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.delete(`/api/users/profile/skills/${skillId}`, config)
    
        dispatch({
            type: USER_DELETE_SKILL_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_DELETE_SKILL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getRequests = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_REQUESTS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/requests`, config)
    
        dispatch({
            type: USER_REQUESTS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_REQUESTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getAcceptedRequests = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_ACCEPTED_REQUESTS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/requests/accepted`, config)
    
        dispatch({
            type: USER_ACCEPTED_REQUESTS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_ACCEPTED_REQUESTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const forgotPassword = (email, protocol, hostname, port) => async(dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const { data } = await axios.post(`/api/users/forgotpassword`, { email, protocol, hostname, port }, config)
    
        dispatch({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const resetPassword = (password, resetToken) => async(dispatch) => {
    try {
        dispatch({
            type: USER_RESET_PASSWORD_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    
        const { data } = await axios.put(`/api/users/resetpassword/${resetToken}`, { password }, config)
    
        dispatch({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const addBookmark = (bookmarkId, docType) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_ADD_BOOKMARK_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/users/bookmarks`, { 
            bookmarkId,
            docType,
         }, config)
    
        dispatch({
            type: USER_ADD_BOOKMARK_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_ADD_BOOKMARK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const deleteBookmark = (bookmarkId, docType) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_BOOKMARK_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/users/bookmarks/${bookmarkId}`, { 
            docType,
         }, config)
    
        dispatch({
            type: USER_DELETE_BOOKMARK_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_BOOKMARK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const getBookmarks = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_GET_BOOKMARKS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/users/bookmarks`, config)
    
        dispatch({
            type: USER_GET_BOOKMARKS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_GET_BOOKMARKS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const markAsRead = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_MARK_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/users/markasread`, {}, config)
    
        dispatch({
            type: USER_MARK_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_MARK_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const markOneAsRead = (notificationId) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_MARK_ONE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.put(`/api/users/markasread/${notificationId}`, {}, config)
    
        dispatch({
            type: USER_MARK_ONE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_MARK_ONE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}
