import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listCompanyOffers, acceptDeleteStudent } from '../actions/offerActions'
import { GiPositionMarker } from 'react-icons/gi'
import {  MdOutlineRemove } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { OFFER_ACCEPT_DELETE_STUDENT_RESET} from '../constants/offerConstants'
import { TRAINING_ACCEPT_DELETE_STUDENT_RESET } from '../constants/trainingConstants'
import { INTERNSHIP_ACCEPT_DELETE_STUDENT_RESET } from '../constants/internshipConstants'
import { acceptDeleteInternshipStudent, listInternships } from '../actions/internshipActions'
import { acceptDeleteTrainingStudent, listTrainings } from '../actions/trainingActions'

const Applicant = ({ offerId, _id, name, address, image, neededSkills,  price }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const offerAcceptDeleteStudent = useSelector(state => state.offerAcceptDeleteStudent)
    const { success: successDelete, loading: loadingDelete } = offerAcceptDeleteStudent

    const trainingAcceptDeleteStudent = useSelector(state => state.trainingAcceptDeleteStudent)
    const { success: trainingSuccessDelete, loading: trainingLoadingDelete } = trainingAcceptDeleteStudent

    const internshipAcceptDeleteStudent = useSelector(state => state.internshipAcceptDeleteStudent)
    const { success: internshipSuccessDelete, loading: internshipLoadingDelete } = internshipAcceptDeleteStudent

    const handleAcceptDeleteStudent = (user) => {
        if (neededSkills) {
            dispatch(acceptDeleteStudent(offerId, user))
        } else if (price) {
            dispatch(acceptDeleteTrainingStudent(offerId, user))
        } else {
            dispatch(acceptDeleteInternshipStudent(offerId, user))
        }
    }

  return (
    <article style={loadingDelete || internshipLoadingDelete || trainingLoadingDelete ? { opacity: '0.5', userSelect: 'none', pointerEvents: 'none' } : null}>
        <div className="img">
            <img src={image} alt={name} />
        </div>
        <div className="appliant-info">
            <Link className='link' to={`/freelancers/${_id}`}>{name}</Link>
            {address && (
                <>
                    <p className='city'>
                    <GiPositionMarker className='icon' />
                    {address}
                    </p>
                </>
            )}
        </div>
        <button className="delete" onClick={() => handleAcceptDeleteStudent(_id)}>
                <MdOutlineRemove className='icon' />
        </button>
    </article>
  )
}

export default Applicant