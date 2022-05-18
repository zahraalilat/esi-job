import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../actions/adminActions'
import { publicInternship } from '../actions/internshipActions'
import { publicOffer } from '../actions/offerActions'
import { publicTraining } from '../actions/trainingActions'

const Toggler = ({ isAdmin, userId, isPublic, ofrId, trainingId, intrId }) => {

  const dispatch = useDispatch()

  const [admin, setAdmin] = useState(isAdmin)

  const [ofrPublic, setOfrPublic] = useState(isPublic)

  const handleToggle = () => {
    if (userId) {
      dispatch(updateUser(userId, !admin))
      setAdmin(!admin)
    } else if (ofrId) {
      dispatch(publicOffer(ofrId, !ofrPublic))
      setOfrPublic(!ofrPublic)
    } else if (trainingId) {
      dispatch(publicTraining(trainingId, !ofrPublic))
      setOfrPublic(!ofrPublic)
    } else {
      dispatch(publicInternship(intrId, !ofrPublic))
      setOfrPublic(!ofrPublic)
    }
  }
  
  return (
    <div className={`toggler ${(admin || ofrPublic) && 'active'}`} onClick={handleToggle}>
        <div className="bubble"></div>
    </div>
  )
}

export default Toggler