import { 
    INTERNSHIP_ACCEPT_DELETE_STUDENT_FAIL,
    INTERNSHIP_ACCEPT_DELETE_STUDENT_REQUEST,
    INTERNSHIP_ACCEPT_DELETE_STUDENT_RESET,
    INTERNSHIP_ACCEPT_DELETE_STUDENT_SUCCESS,
    INTERNSHIP_ACCEPT_STUDENT_FAIL,
    INTERNSHIP_ACCEPT_STUDENT_REQUEST,
    INTERNSHIP_ACCEPT_STUDENT_RESET,
    INTERNSHIP_ACCEPT_STUDENT_SUCCESS,
    INTERNSHIP_ADD_STUDENT_FAIL,
    INTERNSHIP_ADD_STUDENT_REQUEST,
    INTERNSHIP_ADD_STUDENT_RESET,
    INTERNSHIP_ADD_STUDENT_SUCCESS,
    INTERNSHIP_ALL_FAIL,
    INTERNSHIP_ALL_REQUEST,
    INTERNSHIP_ALL_RESET,
    INTERNSHIP_ALL_SUCCESS,
    INTERNSHIP_CREATE_FAIL,
    INTERNSHIP_CREATE_REQUEST, 
    INTERNSHIP_CREATE_RESET, 
    INTERNSHIP_CREATE_SUCCESS, 
    INTERNSHIP_DELETE_FAIL, 
    INTERNSHIP_DELETE_REQUEST, 
    INTERNSHIP_DELETE_RESET, 
    INTERNSHIP_DELETE_SUCCESS, 
    INTERNSHIP_GET_ALL_FAIL, 
    INTERNSHIP_GET_ALL_REQUEST,
    INTERNSHIP_GET_ALL_SUCCESS,
    INTERNSHIP_GET_FAIL,
    INTERNSHIP_GET_REQUEST,
    INTERNSHIP_GET_RESET,
    INTERNSHIP_GET_SUCCESS,
    INTERNSHIP_PUBLIC_FAIL,
    INTERNSHIP_PUBLIC_REQUEST,
    INTERNSHIP_PUBLIC_RESET,
    INTERNSHIP_PUBLIC_SUCCESS
} from "../constants/internshipConstants"

export const internshipCreateReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_CREATE_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const internshipPublicReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_PUBLIC_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_PUBLIC_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_PUBLIC_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_PUBLIC_RESET:
            return {}
        default:
            return state
    }
}

export const internshipGetAllReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_GET_ALL_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_GET_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                internships: action.payload,
            }
        case INTERNSHIP_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const internshipAllReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_ALL_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                internships: action.payload.internships,
                pagination: action.payload.pagination,
                nbrPages: action.payload.nbrPages,
                page: action.payload.page,
            }
        case INTERNSHIP_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_ALL_RESET:
            return {}
        default:
            return state
    }
}

export const internshipDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_DELETE_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const internshipGetReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_GET_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                internship: action.payload,
            }
        case INTERNSHIP_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_GET_RESET:
            return {}
        default:
            return state
    }
}

export const internshipAddStudentReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_ADD_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_ADD_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_ADD_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_ADD_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const internshipAcceptStudentReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_ACCEPT_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_ACCEPT_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_ACCEPT_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_ACCEPT_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const internshipAcceptDeleteStudentReducer = (state={}, action) => {
    switch(action.type) {
        case INTERNSHIP_ACCEPT_DELETE_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case INTERNSHIP_ACCEPT_DELETE_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case INTERNSHIP_ACCEPT_DELETE_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case INTERNSHIP_ACCEPT_DELETE_STUDENT_RESET:
            return {}
        default:
            return state
    }
}