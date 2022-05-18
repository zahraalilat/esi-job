import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getConvos, startConvo } from '../actions/convoActions'
import { getAllUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Sidebar from '../components/Sidebar'
import { CONVO_START_RESET } from '../constants/convoConstants'
import { FaUserCircle } from 'react-icons/fa'
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
import { GiPositionMarker } from 'react-icons/gi'
import Messanger from '../components/Messanger'
import SearchNavbar from '../components/SearchNavbar'
import Meta from '../utils/Meta'

const FreelancersScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { keyword='' } = useParams()

    const userGetAllUsers = useSelector(state => state.userGetAllUsers)
    const { error, loading, users, pagination, nbrPages, page } = userGetAllUsers

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const convoStart = useSelector(state => state.convoStart)
    const { loading: convoLoading, error: convoError, success, convo } = convoStart

    const convoGetUserConvos = useSelector(state => state.convoGetUserConvos)
    const { convos, loading: convosLoading } = convoGetUserConvos

    useEffect(() => {
        if(!userInfo) {
            navigate('/')
        } else if (userInfo && !userInfo.isCompany) {
            navigate('/profile')
        } else if(success) {
            navigate(`/conversations/${convo._id}`)
            dispatch({
                type: CONVO_START_RESET,
            })
        } else {
            dispatch(getAllUsers(keyword))
            dispatch(getConvos())
        }
    }, [dispatch, convo, navigate, success])

    const handlerStartConvo = (receiver) => {
        dispatch(startConvo(receiver))
    }

    const handlePagination = (page) => {
        dispatch(getAllUsers(keyword, page))
    }

    if (error) {
        return (
            <Message text={error} />
        )
    }

  return (
    <section className='freelancers'>
        <Sidebar />
        <Messanger />
        <Meta pageName={`ESI-JOB | Freelancers`} />
        <div className="main-freelancers">
               <SearchNavbar />
        {loading && convosLoading ? (
            <div className="cards-loading">
                <article></article>
                <article></article>
                <article></article>
            </div>
        ) : users && users.length > 0 && (
            <div className="main-freelancers-content">
            {users.map((user, index) => {
                const {_id, name, bio, image, skills, address} = user
                return (
                   <>
                             <article key={index}>
                             <header>
                                 <div className="user-info">
                                     <div className="img">
                                        {image==='/images/default-user.png' ? (
                                            <img src='/images/default-user.png' alt={name} />
                                            ) : (
                                            <img src={'/'+image} alt={name} />
                                        )}
                                     </div>
                                     <div className="user-name-city">
                                         <strong>{name}</strong>
                                         {address && (
                                            <p className='city'>
                                                <GiPositionMarker className='icon' />
                                                {address}
                                            </p>
                                         )}
                                     </div>
                                 </div>
                             </header>
                                 <div className="detailed-info">
                                 <div className="desc">
                                     {bio && (
                                         <p>
                                            {bio.substring(0, 100)}...
                                         </p>
                                     )}
                                 </div>
                                     <div className="skills">
                                        {skills && skills.length > 3 && skills.slice(0, skills.length-2).map((skill, index) => {
                                            return (
                                                <span key={index}>{skill.name}</span>
                                            )
                                        })}
                                        {skills && skills.length <= 3 && skills.map((skill, index) => {
                                            return (
                                                <span key={index}>{skill.name}</span>
                                            )
                                        })}
                                        {skills && skills.length > 3 && (
                                            <p className="dots">...</p>
                                        )}
                                        {skills && skills.length > 3 && (
                                            <span className='last-skill'>
                                                {skills.at(-1).name}
                                            </span>
                                        )}
                                     </div>
                             <div className="buttons">
                                     <Link to={`/freelancers/${_id}`} className='light-btn'>
                                         <FaUserCircle className='icon' />
                                         profile
                                     </Link>
                                     <button onClick={() => handlerStartConvo(_id)} className='special-btn'>
                                         <RiSendPlaneFill className='icon' />
                                         send
                                     </button>
                             </div>
                                 </div>
                         </article>
                   </>
                )
            })}
        </div>
        )}
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
        </div>
    </section>
  )
}

export default FreelancersScreen