import React from 'react'
import { useDispatch } from 'react-redux'
import { listOffers } from '../actions/offerActions'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { listAllTrainings } from '../actions/trainingActions'
import { listAllInternships } from '../actions/internshipActions'
import { getAllUsers } from '../actions/adminActions'

const Pagination = ({ nbrPages, pagination, page, type }) => {

    const dispatch = useDispatch()

    const handlePagination = (page) => {
        if (type === 'offers') {
            dispatch(listOffers(page))
        } else if (type === 'trainings') {
            dispatch(listAllTrainings(page))
        } else if (type === 'internships') {
            dispatch(listAllInternships(page))
        } else if (type === 'users') {
            dispatch(getAllUsers(page))
        }
    }
    
  return (
    <>
        {nbrPages && nbrPages > 1 && (
        <div className="pagination">
                <i onClick={() => handlePagination(pagination.prev.page)} style={!pagination.prev ? {pointerEvents: 'none', userSelect: 'none', color: '#999', opacity: '0.8'} : null}>
                    <BsChevronLeft className='icon' />
                </i>
            {[...Array(nbrPages).keys()].slice(0, 4).map((nbr, index) => {
                return (
                    <i key={index} onClick={() => handlePagination(nbr+1)} className={page === (nbr+1) ? 'active' : null}>{nbr+1}</i>
                    )
                })}
            {nbrPages && nbrPages > 4 && (
                <span>...</span>
                )}
            {nbrPages && nbrPages > 4 && (
                <i onClick={() => handlePagination(nbrPages)} className={page === nbrPages ? 'active' : null}>{nbrPages}</i>
            )}
                <i onClick={() => handlePagination(pagination.next.page)} style={!pagination.next ? {pointerEvents: 'none', userSelect: 'none', color: '#999', opacity: '0.8'} : null}>
                    <BsChevronRight className='icon' />
                </i>
        </div>
    )}
    </>
  )
}

export default Pagination