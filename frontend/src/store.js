import { 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userAcceptedRequestsReducer,
    userAddBookmarkReducer,
    userAddExperienceReducer,
    userAddSkillReducer,
    userDeleteBookmarkReducer,
    userDeleteFieldReducer,
    userDeleteSkillReducer,
    userForgotPasswordReducer,
    userGetAllUsersReducer,
    userGetBookmarksReducer,
    userGetReducer,
    userLoginReducer, 
    userMarkAsReadReducer, 
    userMarkOneAsReadReducer,
    userProfileReducer, 
    userProfileUpdateReducer, 
    userRegisterReducer,
    userRequestsReducer,
    userResetPasswordReducer,
} from './reducers/userReducers'
import { 
    convoExistConvoReducer,
    convoGetConvoReducer, 
    convoGetUserConvosReducer, 
    convoNewMessageReducer, 
    convoStartReducer 
} from './reducers/convoReducers'
import { 
    offerAcceptDeleteStudentReducer,
    offerAcceptStudentReducer,
    offerAddStudentReducer,
    offerAllReducer,
    offerCreateReducer, 
    offerDeleteReducer, 
    offerGetAllReducer, 
    offerGetReducer,
    offerPublicReducer,
} from './reducers/offerReducers'
import { 
    trainingAcceptDeleteStudentReducer,
    trainingAcceptStudentReducer,
    trainingAddStudentReducer,
    trainingAllReducer,
    trainingCreateReducer, 
    trainingDeleteReducer, 
    trainingGetAllReducer, 
    trainingGetReducer,
    trainingPublicReducer
} from './reducers/trainingReducers'
import { 
    internshipAcceptDeleteStudentReducer,
    internshipAcceptStudentReducer,
    internshipAddStudentReducer,
    internshipAllReducer,
    internshipCreateReducer, 
    internshipDeleteReducer, 
    internshipGetAllReducer, 
    internshipGetReducer, 
    internshipPublicReducer
} from './reducers/internshipReducers'
import { adminDeleteUserReducer, adminGetAllUsersReducer, adminGetSingleUserReducer, adminUpdateUserReducer } from './reducers/adminReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userGet: userGetReducer,
    userProfileUpdate: userProfileUpdateReducer,
    userDeleteField: userDeleteFieldReducer,
    userGetAllUsers: userGetAllUsersReducer,
    userAddExperience: userAddExperienceReducer,
    userAddSkill: userAddSkillReducer,
    userDeleteSkill: userDeleteSkillReducer,
    userRequests: userRequestsReducer,
    userAcceptedRequests: userAcceptedRequestsReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: userResetPasswordReducer,
    userAddBookmark: userAddBookmarkReducer,
    userDeleteBookmark: userDeleteBookmarkReducer,
    userGetBookmarks: userGetBookmarksReducer,
    userMarkAsRead: userMarkAsReadReducer,
    userMarkOneAsRead: userMarkOneAsReadReducer,
    adminGetAllUsers: adminGetAllUsersReducer,
    adminGetSingleUser: adminGetSingleUserReducer,
    adminDeleteUser: adminDeleteUserReducer,
    adminUpdateUser: adminUpdateUserReducer,
    convoStart: convoStartReducer,
    convoExistConvo: convoExistConvoReducer,
    convoNewMessage: convoNewMessageReducer,
    convoGetConvo: convoGetConvoReducer,
    convoGetUserConvos: convoGetUserConvosReducer,
    offerCreate: offerCreateReducer,
    offerPublic: offerPublicReducer,
    offerGet: offerGetReducer,
    offerAll: offerAllReducer,
    offerGetAll: offerGetAllReducer,
    offerDelete: offerDeleteReducer,
    offerAddStudent: offerAddStudentReducer,
    offerAcceptStudent: offerAcceptStudentReducer,
    offerAcceptDeleteStudent: offerAcceptDeleteStudentReducer,
    trainingCreate: trainingCreateReducer,
    trainingPublic: trainingPublicReducer,
    trainingGetAll: trainingGetAllReducer,
    trainingAll: trainingAllReducer,
    trainingDelete: trainingDeleteReducer,
    trainingGet: trainingGetReducer,
    trainingAddStudent: trainingAddStudentReducer,
    trainingAcceptStudent: trainingAcceptStudentReducer,
    trainingAcceptDeleteStudent: trainingAcceptDeleteStudentReducer,
    internshipCreate: internshipCreateReducer,
    internshipPublic: internshipPublicReducer,
    internshipGetAll: internshipGetAllReducer,
    internshipAll: internshipAllReducer,
    internshipDelete: internshipDeleteReducer,
    internshipGet: internshipGetReducer,
    internshipAddStudent: internshipAddStudentReducer,
    internshipAcceptStudent: internshipAcceptStudentReducer,
    internshipAcceptDeleteStudent: internshipAcceptDeleteStudentReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    }
}

const middlware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
)

export default store