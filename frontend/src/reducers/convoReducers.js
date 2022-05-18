import {
    CONVO_START_REQUEST,
    CONVO_START_SUCCESS,
    CONVO_START_FAIL,
    CONVO_START_RESET,
    CONVO_NEW_MESSAGE_REQUEST,
    CONVO_NEW_MESSAGE_SUCCESS,
    CONVO_NEW_MESSAGE_FAIL,
    CONVO_NEW_MESSAGE_RESET,
    CONVO_GET_CONVO_SUCCESS,
    CONVO_GET_CONVO_FAIL,
    CONVO_GET_CONVO_REQUEST,
    CONVO_USER_CONVOS_REQUEST,
    CONVO_USER_CONVOS_SUCCESS,
    CONVO_USER_CONVOS_FAIL,
    CONVO_EXIST_CONVO_REQUEST,
    CONVO_EXIST_CONVO_SUCCESS,
    CONVO_EXIST_CONVO_FAIL,
    CONVO_EXIST_CONVO_RESET,
} from '../constants/convoConstants'

export const convoStartReducer = (state={}, action) => {
    switch(action.type) {
        case CONVO_START_REQUEST:
            return {
                loading: true,
            }
        case CONVO_START_SUCCESS:
            return {
                loading: false,
                success: true,
                convo: action.payload,
            }
        case CONVO_START_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CONVO_START_RESET:
            return {}
        default:
            return state
    }
}

export const convoNewMessageReducer = (state={}, action) => {
    switch(action.type) {
        case CONVO_NEW_MESSAGE_REQUEST:
            return {
                loading: true,
            }
        case CONVO_NEW_MESSAGE_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case CONVO_NEW_MESSAGE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CONVO_NEW_MESSAGE_RESET:
            return {}
        default:
            return state
    }
}

export const convoGetConvoReducer = (state={ convo: { convo_msgs: [] } }, action) => {
    switch(action.type) {
        case CONVO_GET_CONVO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONVO_GET_CONVO_SUCCESS:
            return {
                loading: false,
                convo: action.payload,
            }
        case CONVO_GET_CONVO_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const convoExistConvoReducer = (state={ convo: { convo_msgs: [] } }, action) => {
    switch(action.type) {
        case CONVO_EXIST_CONVO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONVO_EXIST_CONVO_SUCCESS:
            return {
                loading: false,
                convoId: action.payload,
            }
        case CONVO_EXIST_CONVO_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CONVO_EXIST_CONVO_RESET:
            return {}
        default:
            return state
    }
}

export const convoGetUserConvosReducer = (state={ convos: [] }, action) => {
    switch(action.type) {
        case CONVO_USER_CONVOS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONVO_USER_CONVOS_SUCCESS:
            return {
                loading: false,
                convos: action.payload,
            }
        case CONVO_USER_CONVOS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}