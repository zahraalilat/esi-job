import { 
    OFFER_ACCEPT_DELETE_STUDENT_FAIL,
    OFFER_ACCEPT_DELETE_STUDENT_REQUEST,
    OFFER_ACCEPT_DELETE_STUDENT_RESET,
    OFFER_ACCEPT_DELETE_STUDENT_SUCCESS,
    OFFER_ACCEPT_STUDENT_FAIL,
    OFFER_ACCEPT_STUDENT_REQUEST,
    OFFER_ACCEPT_STUDENT_RESET,
    OFFER_ACCEPT_STUDENT_SUCCESS,
    OFFER_ADD_STUDENT_FAIL,
    OFFER_ADD_STUDENT_REQUEST,
    OFFER_ADD_STUDENT_RESET,
    OFFER_ADD_STUDENT_SUCCESS,
    OFFER_ALL_FAIL,
    OFFER_ALL_REQUEST,
    OFFER_ALL_RESET,
    OFFER_ALL_SUCCESS,
    OFFER_CREATE_FAIL, 
    OFFER_CREATE_REQUEST, 
    OFFER_CREATE_RESET, 
    OFFER_CREATE_SUCCESS, 
    OFFER_GET_ALL_FAIL, 
    OFFER_GET_ALL_REQUEST,
    OFFER_GET_ALL_RESET,
    OFFER_GET_ALL_SUCCESS,
    OFFER_GET_FAIL,
    OFFER_GET_REQUEST,
    OFFER_GET_RESET,
    OFFER_GET_SUCCESS,
    OFFER_PUBLIC_FAIL,
    OFFER_PUBLIC_REQUEST,
    OFFER_PUBLIC_RESET,
    OFFER_PUBLIC_SUCCESS,
    OFFER_REMOVE_FAIL,
    OFFER_REMOVE_REQUEST,
    OFFER_REMOVE_RESET,
    OFFER_REMOVE_SUCCESS
} from "../constants/offerConstants"

export const offerCreateReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case OFFER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                offer: action.payload,
            }
        case OFFER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const offerPublicReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_PUBLIC_REQUEST:
            return {
                loading: true,
            }
        case OFFER_PUBLIC_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OFFER_PUBLIC_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_PUBLIC_RESET:
            return {}
        default:
            return state
    }
}

export const offerGetAllReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_GET_ALL_REQUEST:
            return {
                loading: true,
            }
        case OFFER_GET_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                offers: action.payload,
            }
        case OFFER_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const offerAllReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_ALL_REQUEST:
            return {
                loading: true,
            }
        case OFFER_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                offers: action.payload.offers,
                nbrPages: action.payload.nbrPages,
                page: action.payload.page,
                pagination: action.payload.pagination,
            }
        case OFFER_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_ALL_RESET:
            return {}
        default:
            return state
    }
}

export const offerDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_REMOVE_REQUEST:
            return {
                loading: true,
            }
        case OFFER_REMOVE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OFFER_REMOVE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_REMOVE_RESET:
            return {}
        default:
            return state
    }
}

export const offerGetReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_GET_REQUEST:
            return {
                loading: true,
            }
        case OFFER_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                offer: action.payload,
            }
        case OFFER_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_GET_RESET:
            return {}
        default:
            return state
    }
}

export const offerAddStudentReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_ADD_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case OFFER_ADD_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OFFER_ADD_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_ADD_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const offerAcceptStudentReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_ACCEPT_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case OFFER_ACCEPT_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OFFER_ACCEPT_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_ACCEPT_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const offerAcceptDeleteStudentReducer = (state={}, action) => {
    switch(action.type) {
        case OFFER_ACCEPT_DELETE_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case OFFER_ACCEPT_DELETE_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case OFFER_ACCEPT_DELETE_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case OFFER_ACCEPT_DELETE_STUDENT_RESET:
            return {}
        default:
            return state
    }
}