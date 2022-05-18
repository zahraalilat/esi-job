import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar'
import Toggler from '../components/Toggler'
import { CgRemove } from 'react-icons/cg'
import { BsLayoutTextSidebarReverse, BsChevronLeft } from 'react-icons/bs'
import { deleteTraining, listAllTrainings } from '../actions/trainingActions'
import { TRAINING_DELETE_RESET } from '../constants/trainingConstants'
import Meta from '../utils/Meta'

const OffersAdminScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const trainingAll = useSelector(state => state.trainingAll)
    const { trainings, loading, pagination, page, nbrPages } = trainingAll

    const trainingDelete = useSelector(state => state.trainingDelete)
    const { success: successDeleteTraining } = trainingDelete

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/')
        } else if (!trainings || successDeleteTraining) {
            dispatch(listAllTrainings())
        }
    }, [userInfo, navigate, trainings, dispatch, successDeleteTraining])

    useEffect(() => {
        if (successDeleteTraining) {
            dispatch({
                type: TRAINING_DELETE_RESET,
            })
        }
    }, [successDeleteTraining])

    const handleDeleteTraining = (trainingId) => {
        if(window.confirm('Confirm training deletion?')) {
            dispatch(deleteTraining(trainingId))
        }
    }

  return (
    <section className='admin'>
        <Sidebar />
        <Meta pageName={`Admin Dashboard | Trainings`} />
        <div className="main-admin">
            <header>
                Admin Dashboard / Trainings
                <p>manage users, offers and diffrent resources</p>
            </header>
            <div className="main-admin-content">
                <Link to='/dashboard' className='back'>
                    <BsChevronLeft className='icon' />
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Created At</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Public</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainings && trainings.map(training => {
                            return (
                                <tr>
                                    <td>
                                        {training.name}
                                    </td>
                                    <td>
                                        {training.company.name}
                                    </td>
                                    <td>
                                        {training.createdAt && training.createdAt.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        {training.startDate}
                                    </td>
                                    <td>
                                        {training.endDate && training.endDate.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        <Toggler isPublic={training.isPublic} trainingId={training._id} />
                                    </td>
                                    <td>
                                        <div className="icons">
                                            <span className="button delete" title='delete training' onClick={() => handleDeleteTraining(training._id)}>
                                                <CgRemove />
                                            </span>
                                            <Link to={`/trainings/${training._id}`} className="button" title="training blog">
                                                <BsLayoutTextSidebarReverse />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination pagination={pagination} nbrPages={nbrPages} page={page} type='trainings' />
            </div>
        </div>
    </section>
  )
}

export default OffersAdminScreen