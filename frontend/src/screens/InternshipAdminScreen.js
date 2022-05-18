import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar'
import Toggler from '../components/Toggler'
import { CgRemove } from 'react-icons/cg'
import { BsLayoutTextSidebarReverse, BsChevronLeft } from 'react-icons/bs'
import { INTERNSHIP_DELETE_RESET } from '../constants/internshipConstants'
import { deleteInternship, listAllInternships } from '../actions/internshipActions'
import Meta from '../utils/Meta'

const OffersAdminScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const internshipAll = useSelector(state => state.internshipAll)
    const { internships, loading, pagination, page, nbrPages } = internshipAll

    const internshipDelete = useSelector(state => state.internshipDelete)
    const { success: successDeleteInternship } = internshipDelete

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/')
        } else if (!internships || successDeleteInternship) {
            dispatch(listAllInternships())
        }
    }, [userInfo, navigate, internships, dispatch, successDeleteInternship])

    useEffect(() => {
        if (successDeleteInternship) {
            dispatch({
                type: INTERNSHIP_DELETE_RESET,
            })
        }
    }, [successDeleteInternship])

    const handleDeleteInternship = (internshipId) => {
        if(window.confirm('Confirm internship deletion?')) {
            dispatch(deleteInternship(internshipId))
        }
    }

  return (
    <section className='admin'>
        <Sidebar />
        <Meta pageName={`Admin Dashboard | Internships`} />
        <div className="main-admin">
            <header>
                Admin Dashboard / Internships
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
                        {internships && internships.map(intr => {
                            return (
                                <tr>
                                    <td>
                                        {intr.name}
                                    </td>
                                    <td>
                                        {intr.company.name}
                                    </td>
                                    <td>
                                        {intr.createdAt && intr.createdAt.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        {intr.startDate}
                                    </td>
                                    <td>
                                        {intr.endDate && intr.endDate.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        <Toggler isPublic={intr.isPublic} intrId={intr._id} />
                                    </td>
                                    <td>
                                        <div className="icons">
                                            <span className="button delete" title='delete internship' onClick={() => handleDeleteInternship(intr._id)}>
                                                <CgRemove />
                                            </span>
                                            <Link to={`/internships/${intr._id}`} className="button" title="internship blog">
                                                <BsLayoutTextSidebarReverse />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination pagination={pagination} nbrPages={nbrPages} page={page} type='internships' />
            </div>
        </div>
    </section>
  )
}

export default OffersAdminScreen