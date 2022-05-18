import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdPlace, MdNotificationsActive } from 'react-icons/md'
import { IoBookmark, IoHelpBuoy } from 'react-icons/io5'
import { RiShieldStarFill } from 'react-icons/ri'
import { ImArrowLeft2 } from 'react-icons/im'
import { HiHome } from 'react-icons/hi'
import { CgOptions } from 'react-icons/cg'
import { BsPersonFill, BsFillShieldLockFill, BsQuestionLg } from 'react-icons/bs'
import { listProfile, logout } from '../actions/userActions'
import ListElement from './ListElement'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const userProfile = useSelector(state => state.userProfile)
  const { user, loading } = userProfile

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else if (!user.name) {
      dispatch(listProfile())
    }
  }, [dispatch, user, userInfo, navigate])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const tabElements = useRef([])

  const [clicked, setClicked] = useState(-1)

  const handleClick = (index) => {
    setClicked(index)

    switch(index) {
      case 0:
        navigate('/')
        break
      case 1:
        navigate('/notifications')
        break
      case 2:
        navigate('/dashboard')
        break
      case 3:
        navigate('/positions')
        break
      case 4:
        navigate('/freelancers')
        break
      case 5:
        navigate('/bookmarks')
        break
      case 6:
        navigate('/dashboard')
        break
      case 7:
        navigate('/faq')
        break
    }
    
    tabElements.map((elem, index) => {
      tabElements.current[index].style.background = 'none'
    })

    tabElements.current[index].style.backgroundColor = 'red'
  }
  
  return (
    <article className="left-tab">
          <ul>
            <li onClick={() => navigate('/profile')}>
                <div className="link">
                  {loading ? (
                    <div className="skelton-image"></div>
                    ) : user.image==='/images/default-user.png' ? (
                      <img src='/images/default-user.png' alt={user.name} />
                    ) : (
                      <img src={'/'+user.image} alt={user.name} />
                    )}
                </div>
            <div className='text'>
                {loading ? (
                    <div className="skelton-loader" style={{marginBottom: '0.4rem'}}></div>
                ) : (
                    <p>{user.name}</p>
                )}
                {loading ? (
                    <div className="skelton-loader"></div>
                ) : (
                    <span>{user.isCompany && !user.isAdmin ? 'Entreprise' : !user.isCompany && !user.isAdmin ? 'Student' : !user.isCompany && user.isAdmin && 'Student/Admin'}</span>
                )}
                
            </div>
            </li>
            <span>menu</span>
                  <div ref={(element) => tabElements.current[0] = element} onClick={() => handleClick(0)}>
                    <ListElement link='/' text='Discover' Icon={HiHome} />
                  </div>
                  <div ref={(element) => tabElements.current[3] = element} onClick={() => handleClick(3)}>
                    <ListElement link='/positions' text='Positions' Icon={MdPlace} active={window.location.href.split('/')[3]==='positions' ? true : false} />
                  </div>
            
            {userInfo && userInfo.isCompany && (
              <div ref={(element) => tabElements.current[4] = element} onClick={() => handleClick(4)}>
                <ListElement link='/freelancers' text='Freelancers' Icon={BsPersonFill} active={window.location.href.split('/')[3]==='freelancers' ? true : false} />
              </div>
            )}
              <div ref={(element) => tabElements.current[5] = element} onClick={() => handleClick(5)}>
                <ListElement link='/bookmarks' text='Bookmarks' Icon={IoBookmark} active={window.location.href.split('/')[3]==='bookmarks' ? true : false} />
              </div>
              <div ref={(element) => tabElements.current[7] = element} onClick={() => handleClick(7)}>
                <ListElement link='/help' text='Help Center' Icon={IoHelpBuoy} active={window.location.href.split('/')[3]==='faq' ? true : false} />
              </div>
              {userInfo && userInfo.isAdmin && (
                <div ref={(element) => tabElements.current[6] = element} onClick={() => handleClick(6)}>
                  <ListElement link='/dashboard' text='Dashboard' Icon={RiShieldStarFill} active={((window.location.href.split('/')[3]==='dashboard') || (window.location.href.split('/')[3]==='admin')) ? true : false} />
              </div>
              )}
          </ul>
          <ul>
            <li onClick={handleLogout}>
              <Link to='/' className='link'>
                <ImArrowLeft2 />
              </Link>
              <p>Sign out</p>
            </li>
          </ul>
      </article>
  )
}

export default Sidebar