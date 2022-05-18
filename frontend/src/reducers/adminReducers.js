import { 
    ADMIN_USERS_ALL_FAIL, 
    ADMIN_USERS_ALL_REQUEST, 
    ADMIN_USERS_ALL_RESET, 
    ADMIN_USERS_ALL_SUCCESS, 
    ADMIN_USER_DELETE_FAIL, 
    ADMIN_USER_DELETE_REQUEST, 
    ADMIN_USER_DELETE_RESET, 
    ADMIN_USER_DELETE_SUCCESS, 
    ADMIN_USER_FAIL, 
    ADMIN_USER_REQUEST,
    ADMIN_USER_RESET,
    ADMIN_USER_SUCCESS,
    ADMIN_USER_UPDATE_FAIL,
    ADMIN_USER_UPDATE_REQUEST,
    ADMIN_USER_UPDATE_RESET,
    ADMIN_USER_UPDATE_SUCCESS
} from "../constants/adminConstants"

export const adminGetAllUsersReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_USERS_ALL_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_USERS_ALL_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                pagination: action.payload.pagination,
                nbrPages: action.payload.nbrPages,
                page: action.payload.page,
            }
        case ADMIN_USERS_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ADMIN_USERS_ALL_RESET:
            return {}
        default:
            return state
    }
}

export const adminGetSingleUserReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_USER_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }
        case ADMIN_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ADMIN_USER_RESET:
            return {}
        default:
            return state
    }
}

export const adminDeleteUserReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_USER_DELETE_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_USER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ADMIN_USER_DELETE_FAIL:
            return {
                loading: false,
            }
        case ADMIN_USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const adminUpdateUserReducer = (state={}, action) => {
    switch(action.type) {
        case ADMIN_USER_UPDATE_REQUEST:
            return {
                loading: true,
            }
        case ADMIN_USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case ADMIN_USER_UPDATE_FAIL:
            return {
                loading: false,
            }
        case ADMIN_USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}