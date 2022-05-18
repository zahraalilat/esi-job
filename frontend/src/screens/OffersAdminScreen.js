import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import Sidebar from '../components/Sidebar'
import Toggler from '../components/Toggler'
import { CgRemove } from 'react-icons/cg'
import { BsLayoutTextSidebarReverse, BsChevronLeft } from 'react-icons/bs'
import { deleteOffer, listOffers } from '../actions/offerActions'
import { OFFER_PUBLIC_RESET, OFFER_REMOVE_REQUEST, OFFER_REMOVE_RESET } from '../constants/offerConstants'
import Meta from '../utils/Meta'

const OffersAdminScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const offerAll = useSelector(state => state.offerAll)
    const { offers, loading, pagination, page, nbrPages } = offerAll

    const offerDelete = useSelector(state => state.offerDelete)
    const { success: successDelete } = offerDelete

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/')
        } else if (!offers || successDelete) {
            dispatch(listOffers())
            dispatch({
                type: OFFER_REMOVE_RESET,
            })
        }
    }, [userInfo, offers, navigate, dispatch, successDelete]);

    useEffect(() => {
        if (successDelete) {
            dispatch({
                type: OFFER_REMOVE_REQUEST,
            })
        }
    }, [successDelete])

    const handleDeleteOffer = (offerId) => {
        if(window.confirm('Confirm offer deletion?')) {
            dispatch(deleteOffer(offerId))
        }
    }

  return (
    <section className='admin'>
        <Sidebar />
        <Meta pageName={`Admin Dashboard | Offers`} />
        <div className="main-admin">
            <header>
                Admin Dashboard / Job offers
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
                        {offers && offers.map(ofr => {
                            return (
                                <tr>
                                    <td>
                                        {ofr.name}
                                    </td>
                                    <td>
                                        {ofr.company.name}
                                    </td>
                                    <td>
                                        {ofr.createdAt && ofr.createdAt.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        {ofr.startDate}
                                    </td>
                                    <td>
                                        {ofr.endDate && ofr.endDate.substr(0, 10).replaceAll('-', '/')}
                                    </td>
                                    <td>
                                        <Toggler isPublic={ofr.isPublic} ofrId={ofr._id} />
                                    </td>
                                    <td>
                                        <div className="icons">
                                            <span className="button delete" title='delete offer' onClick={() => handleDeleteOffer(ofr._id)}>
                                                <CgRemove />
                                            </span>
                                            <Link to={`/offers/${ofr._id}`} className="button" title="offer blog">
                                                <BsLayoutTextSidebarReverse />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Pagination pagination={pagination} nbrPages={nbrPages} page={page} type='offers' />
            </div>
        </div>
    </section>
  )
}

export default OffersAdminScreen