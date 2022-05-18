import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { BiSearch, BiHomeAlt, BiCheckDouble, BiExit } from 'react-icons/bi'
import { MdOutlineNotifications } from 'react-icons/md'
import { IoExitOutline } from 'react-icons/io5'
import { BsChevronLeft } from 'react-icons/bs'
import { listProfile, logout, markAsRead, markOneAsRead } from '../actions/userActions'
import { format } from 'timeago.js'

const SearchNavbar = ({ noSearch }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState('')

    const userMarkAsRead = useSelector(state => state.userMarkAsRead)
    const {success} = userMarkAsRead

    const userProfile = useSelector(state => state.userProfile)
    const {user} = userProfile

    useEffect(() => {
        dispatch(listProfile())
    }, [dispatch, success])

    const handleSearch = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/freelancers/search/${keyword}`)
        } else {
            navigate('/freelancers')
        }
    }
    // notifications
    const notificationsRef = useRef()
    const [notificationsActive, setNotificationsActive] = useState(false)

    useEffect(() => {
        if (notificationsActive) {
            notificationsRef.current.style.display = 'block'
            
            setTimeout(() => {
                notificationsRef.current.style.opacity = '1'
                notificationsRef.current.style.transition = 'opacity 0.2s ease-in'
            }, 70)
        } else {
            notificationsRef.current.style.opacity = '0'
            notificationsRef.current.style.transition = 'opacity 0.2s ease-in'

            setTimeout(() => {
                notificationsRef.current.style.display = 'none'
            }, 70)
        }
    }, [notificationsActive])

    useEffect(() => {
        const hideWhenClickOutside = (e) => {
            if (notificationsActive && notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setNotificationsActive(false)
            }
        }

        document.addEventListener('mousedown', hideWhenClickOutside)

        return () => {
            document.removeEventListener('mousedown', hideWhenClickOutside)
        }
    }, [notificationsActive])

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const handleNotificationClick = (notification) => {
        dispatch(markOneAsRead(notification._id))
        navigate(notification.notificationType === 'offer' ? `/offers/${notification.link}` : notification.notificationType === 'training' ? `/trainings/${notification.link}` : notification.notificationType === 'internship' ? `/internships/${notification.link}` : notification.notificationType === 'msg' ? `/conversations/${notification.link}` : '/profile')
    }

  return (
    <header className='search-navbar' style={noSearch ? {justifyContent: 'flex-end'} : null}>
                  {!noSearch && (
                        <Link to='/freelancers' className={`back ${!keyword && 'disactivated'}`} onClick={() => setKeyword('')}>
                            <BsChevronLeft className='icon' />
                        </Link>
                  )}
                  <div className="info">
                        {!noSearch && (
                            <form onSubmit={handleSearch}>
                                <div className="search-control">
                                    <BiSearch className='icon' onClick={handleSearch} />
                                    <input type="text" placeholder='Search...' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                                </div>
                            </form>
                        )}
                        <ul>
                            <li>
                                <span onClick={() => navigate('/')}>
                                    <BiHomeAlt className='icon' />
                                </span>
                            </li>
                            <li className='notification-container' onClick={() => setNotificationsActive(!notificationsActive)}>
                                <span>
                                    <MdOutlineNotifications className='icon' />
                                </span>

                                    <ul className='notification' ref={notificationsRef}>
                                        <header className='card-header'>
                                            Notifications
                                            {user.notifications && user.notifications.length > 0 && (
                                                <div className="mark" onClick={() => dispatch(markAsRead())}>
                                                    <BiCheckDouble className='icon' />
                                                    Mark as read
                                                </div>
                                            )}
                                        </header>
                                        {user && user.notifications && user.notifications.length > 0 ? user.notifications.reverse().map(notification => {
                                            return (
                                                <li onClick={() => handleNotificationClick(notification)}>
                                                    <div className="heading">
                                                        <div className="link-date">
                                                            <p className="title"><div className="dot"></div>{(notification.notificationType === 'offer' || notification.notificationType === 'training' || notification.notificationType === 'internship') && <strong> Congrats! </strong>}{(notification.notificationType === 'offer' || notification.notificationType === 'training' || notification.notificationType === 'internship') ? 'you have been selected' : notification.notificationType === 'apply' ?'New applicant to your publication' : 'You have a new message!'}</p>
                                                            {!(notification.notificationType === 'msg') ? (
                                                                <Link to={notification.notificationType === 'offer' ? `/offers/${notification.link}` : notification.notificationType === 'training' ? `/trainings/${notification.link}` : notification.notificationType === 'internship' ? `/internships/${notification.link}` : '/profile'} className='link'>{notification.title.substr(0, 30)}...</Link>
                                                            ) : (
                                                                <p className='link sender-name'>From <strong>{notification.title}</strong></p>
                                                            )}
                                                           {!(notification.notificationType === 'msg') ? (
                                                                <small>{new Date(notification.createdAt).toDateString()} at {notification.createdAt.substr(11, 5)}</small>
                                                           ) : (
                                                                <small>{format(notification.createdAt)}</small>
                                                           )}
                                                        </div>
                                                        <div className="img">
                                                            <img src={notification.image} alt="user picture" />
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }) : (
                                            <p className='no-notification'>No notifications</p>
                                        )}
                                    </ul>

                                    {user && user.notifications && user.notifications.length > 0 && (
                                        <div className="num-bubble"></div>
                                    )}
                            </li>
                            <li>
                                <span onClick={handleLogout}>
                                    <IoExitOutline className='icon' />
                                </span>
                            </li>
                        </ul>
                  </div>
               </header>
  )
}

export default SearchNavbar