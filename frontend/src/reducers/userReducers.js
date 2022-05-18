import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_LOGIN_ERROR_RESET,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_REGISTER_ERROR_RESET,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,
    USER_DELETE_FIELD_REQUEST,
    USER_DELETE_FIELD_SUCCESS,
    USER_DELETE_FIELD_FAIL,
    USER_DELETE_FIELD_RESET,
    USER_GET_ALL_USERS_REQUEST,
    USER_GET_ALL_USERS_SUCCESS,
    USER_GET_ALL_USERS_FAIL,
    USER_NEW_EXPERIENCE_REQUEST,
    USER_NEW_EXPERIENCE_SUCCESS,
    USER_NEW_EXPERIENCE_FAIL,
    USER_NEW_EXPERIENCE_RESET,
    USER_NEW_SKILL_REQUEST,
    USER_NEW_SKILL_SUCCESS,
    USER_NEW_SKILL_FAIL,
    USER_NEW_SKILL_RESET,
    USER_DELETE_SKILL_REQUEST,
    USER_DELETE_SKILL_SUCCESS,
    USER_DELETE_SKILL_FAIL,
    USER_DELETE_SKILL_RESET,
    USER_REQUESTS_REQUEST,
    USER_REQUESTS_SUCCESS,
    USER_REQUESTS_FAIL,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_FORGOT_PASSWORD_RESET,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_RESET,
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
    USER_DELETE_BOOKMARK_RESET,
    USER_GET_BOOKMARKS_RESET,
    USER_MARK_REQUEST,
    USER_MARK_SUCCESS,
    USER_MARK_FAIL,
    USER_MARK_RESET,
    USER_ADD_BOOKMARK_RESET,
    USER_GET_SUCCESS,
    USER_GET_REQUEST,
    USER_GET_FAIL,
    USER_MARK_ONE_REQUEST,
    USER_MARK_ONE_SUCCESS,
    USER_MARK_ONE_FAIL,
    USER_MARK_ONE_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state={}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_LOGIN_ERROR_RESET:
            return {
                ...state,
                error: null,
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_REGISTER_ERROR_RESET:
            return {
                ...state,
                error: null,
            }
        case USER_REGISTER_RESET:
            return {}
        default:
            return state
    }
}

export const userProfileReducer = (state={ user: {} }, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_PROFILE_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}

export const userGetReducer = (state={}, action) => {
    switch(action.type) {
        case USER_GET_REQUEST:
            return {
                loading: true,
            }
        case USER_GET_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case USER_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const userProfileUpdateReducer = (state={}, action) => {
    switch(action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_PROFILE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_PROFILE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userDeleteFieldReducer = (state={}, action) => {
    switch(action.type) {
        case USER_DELETE_FIELD_REQUEST:
            return {
                loading: true,
            }
        case USER_DELETE_FIELD_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload,
            }
        case USER_DELETE_FIELD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_DELETE_FIELD_RESET:
            return {}
        default:
            return state
    }
}

export const userGetAllUsersReducer = (state={users: []}, action) => {
    switch(action.type) {
        case USER_GET_ALL_USERS_REQUEST:
            return {
                loading: true,
            }
        case USER_GET_ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                pagination: action.payload.pagination,
                nbrPages: action.payload.nbrPages,
                page: action.payload.page,
            }
        case USER_GET_ALL_USERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const userAddExperienceReducer = (state={}, action) => {
    switch(action.type) {
        case USER_NEW_EXPERIENCE_REQUEST:
            return {
                loading: true,
            }
        case USER_NEW_EXPERIENCE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_NEW_EXPERIENCE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_NEW_EXPERIENCE_RESET:
            return {}
        default:
            return state
    }
}

export const userAddSkillReducer = (state={}, action) => {
    switch(action.type) {
        case USER_NEW_SKILL_REQUEST:
            return {
                loading: true,
            }
        case USER_NEW_SKILL_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_NEW_SKILL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_NEW_SKILL_RESET:
            return {}
        default:
            return state
    }
}

export const userDeleteSkillReducer = (state={}, action) => {
    switch(action.type) {
        case USER_DELETE_SKILL_REQUEST:
            return {
                loading: true,
            }
        case USER_DELETE_SKILL_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_DELETE_SKILL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_DELETE_SKILL_RESET:
            return {}
        default:
            return state
    }
}

export const userRequestsReducer = (state={}, action) => {
    switch(action.type) {
        case USER_REQUESTS_REQUEST:
            return {
                loading: true,
            }
        case USER_REQUESTS_SUCCESS:
            return {
                loading: false,
                success: true,
                requests: action.payload,
            }
        case USER_REQUESTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const userAcceptedRequestsReducer = (state={}, action) => {
    switch(action.type) {
        case USER_ACCEPTED_REQUESTS_REQUEST:
            return {
                loading: true,
            }
        case USER_ACCEPTED_REQUESTS_SUCCESS:
            return {
                loading: false,
                success: true,
                accepted: action.payload,
            }
        case USER_ACCEPTED_REQUESTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const userForgotPasswordReducer = (state={}, action) => {
    switch(action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case USER_FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case USER_FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_FORGOT_PASSWORD_RESET:
            return {
                error: null,
            }
        default:
            return state
    }
}

export const userResetPasswordReducer = (state={}, action) => {
    switch(action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case USER_RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case USER_RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_RESET_PASSWORD_RESET:
            return {
                error: null,
            }
        default:
            return state
    }
}

export const userAddBookmarkReducer = (state={}, action) => {
    switch(action.type) {
        case USER_ADD_BOOKMARK_REQUEST:
            return {
                loading: true,
            }
        case USER_ADD_BOOKMARK_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case USER_ADD_BOOKMARK_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_ADD_BOOKMARK_RESET:
            return {}
        default:
            return state
    }
}

export const userDeleteBookmarkReducer = (state={}, action) => {
    switch(action.type) {
        case USER_DELETE_BOOKMARK_REQUEST:
            return {
                loading: true,
            }
        case USER_DELETE_BOOKMARK_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case USER_DELETE_BOOKMARK_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_DELETE_BOOKMARK_RESET:
            return {}
        default:
            return state
    }
}

export const userGetBookmarksReducer = (state={}, action) => {
    switch(action.type) {
        case USER_GET_BOOKMARKS_REQUEST:
            return {
                loading: true,
            }
        case USER_GET_BOOKMARKS_SUCCESS:
            return {
                loading: false,
                success: true,
                bookmarks: action.payload,
            }
        case USER_GET_BOOKMARKS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_GET_BOOKMARKS_RESET:
            return {}
        default:
            return state
    }
}

export const userMarkAsReadReducer = (state={}, action) => {
    switch(action.type) {
        case USER_MARK_REQUEST:
            return {
                loading: true,
            }
        case USER_MARK_SUCCESS:
            return {
                loading: false,
                success: true,
                bookmarks: action.payload,
            }
        case USER_MARK_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_MARK_RESET:
            return {}
        default:
            return state
    }
}

export const userMarkOneAsReadReducer = (state={}, action) => {
    switch(action.type) {
        case USER_MARK_ONE_REQUEST:
            return {
                loading: true,
            }
        case USER_MARK_ONE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case USER_MARK_ONE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case USER_MARK_ONE_RESET:
            return {}
        default:
            return state
    }
}