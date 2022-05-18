import { 
    TRAINING_ACCEPT_DELETE_STUDENT_FAIL,
    TRAINING_ACCEPT_DELETE_STUDENT_REQUEST,
    TRAINING_ACCEPT_DELETE_STUDENT_RESET,
    TRAINING_ACCEPT_DELETE_STUDENT_SUCCESS,
    TRAINING_ACCEPT_STUDENT_FAIL,
    TRAINING_ACCEPT_STUDENT_REQUEST,
    TRAINING_ACCEPT_STUDENT_RESET,
    TRAINING_ACCEPT_STUDENT_SUCCESS,
    TRAINING_ADD_STUDENT_FAIL,
    TRAINING_ADD_STUDENT_REQUEST,
    TRAINING_ADD_STUDENT_RESET,
    TRAINING_ADD_STUDENT_SUCCESS,
    TRAINING_ALL_FAIL,
    TRAINING_ALL_REQUEST,
    TRAINING_ALL_RESET,
    TRAINING_ALL_SUCCESS,
    TRAINING_CREATE_FAIL,
    TRAINING_CREATE_REQUEST,
    TRAINING_CREATE_RESET,
    TRAINING_CREATE_SUCCESS,
    TRAINING_DELETE_FAIL,
    TRAINING_DELETE_REQUEST,
    TRAINING_DELETE_RESET,
    TRAINING_DELETE_SUCCESS,
    TRAINING_GET_ALL_FAIL,
    TRAINING_GET_ALL_REQUEST,
    TRAINING_GET_ALL_SUCCESS,
    TRAINING_GET_FAIL,
    TRAINING_GET_REQUEST,
    TRAINING_GET_RESET,
    TRAINING_GET_SUCCESS,
    TRAINING_PUBLIC_FAIL,
    TRAINING_PUBLIC_REQUEST,
    TRAINING_PUBLIC_RESET,
    TRAINING_PUBLIC_SUCCESS,
} from "../constants/trainingConstants"

export const trainingCreateReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_CREATE_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const trainingPublicReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_PUBLIC_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_PUBLIC_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_PUBLIC_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_PUBLIC_RESET:
            return {}
        default:
            return state
    }
}

export const trainingGetAllReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_GET_ALL_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_GET_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                trainings: action.payload,
            }
        case TRAINING_GET_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const trainingAllReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_ALL_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_ALL_SUCCESS:
            return {
                loading: false,
                success: true,
                trainings: action.payload.trainings,
                pagination: action.payload.pagination,
                nbrPages: action.payload.nbrPages,
                page: action.payload.page,
            }
        case TRAINING_ALL_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_ALL_RESET:
            return {}
        default:
            return state
    }
}

export const trainingDeleteReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_DELETE_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const trainingGetReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_GET_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_GET_SUCCESS:
            return {
                loading: false,
                success: true,
                training: action.payload,
            }
        case TRAINING_GET_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_GET_RESET:
            return {}
        default:
            return state
    }
}

export const trainingAddStudentReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_ADD_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_ADD_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_ADD_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_ADD_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const trainingAcceptStudentReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_ACCEPT_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_ACCEPT_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_ACCEPT_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_ACCEPT_STUDENT_RESET:
            return {}
        default:
            return state
    }
}

export const trainingAcceptDeleteStudentReducer = (state={}, action) => {
    switch(action.type) {
        case TRAINING_ACCEPT_DELETE_STUDENT_REQUEST:
            return {
                loading: true,
            }
        case TRAINING_ACCEPT_DELETE_STUDENT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case TRAINING_ACCEPT_DELETE_STUDENT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case TRAINING_ACCEPT_DELETE_STUDENT_RESET:
            return {}
        default:
            return state
    }
}