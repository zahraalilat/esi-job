import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BsSoundwave } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { FiBell } from 'react-icons/fi'
import { MdLogout } from 'react-icons/md'
import { listProfile, logout } from '../actions/userActions'
import styled from 'styled-components'
import { rgba } from 'polished'

// const HeaderStyled = styled.section`
//      color: ${({theme}) => rgba(theme.colors.mainColor, 0.9)};

//      .container {

//         .bell {
//             color: ${() => localStorage.getItem('theme')==='dark' ? '#fff' : '#555'};
//         }

//         .user-name {
//             .dp-menu {
//                 background: ${({theme}) => theme.bgs.primaryBg};
//                 border: 1px solid ${({theme}) => theme.colors.borderColor};
                
//                 ul {
//                     li {
//                         color: ${({theme}) => rgba(theme.colors.mainColor, 0.9)};

//                         &:hover {
//                             background: ${({theme}) => theme.colors.listHover};
//                         }

//                         .link-dp {
//                             color: ${({theme}) => rgba(theme.colors.mainColor, 0.9)};
//                         }

//                         &:not(:last-of-type) {
//                             border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};
//                         }
//                     }
//                 }
//             }
//         }

//          div {
//              .link {
//                  background: ${({theme}) => localStorage.getItem('theme')==='dark' ? `${theme.colors.primaryBlue}` : '#111'};
//                  border: ${() => localStorage.getItem('theme')==='dark' ? 'none' : `1px solid ${rgba('#fff', 0.4)}`};
//                  color: ${({theme}) => theme.colors.mainColor}
                 
//                  &:nth-of-type(1) {
//                      color: ${() => localStorage.getItem('theme')==='dark' ? `${rgba('#fff', 0.3)}` : `${rgba('#222', 0.7)}`};

//                      &:hover {
//                          color: ${({theme}) => localStorage.getItem('theme')==='dark' ? theme.colors.secondaryBlue : '#222'};
//                      }
//                  }

//                  &:nth-of-type(2) {
//                      color: #fff;

//                      &:hover {
//                          border: ${() => localStorage.getItem('theme')==='dark' ? 'none' : `1px solid ${rgba(155, 155, 155, 1)}`};
//                      }
//                  }
//                 }
//          }

//          article {
//              background: ${({theme}) => theme.bgs.primaryBg};
//              box-shadow: ${() => localStorage.getItem('theme')==='dark' && 'none'};

//              .sidebar {
//                  p {
//                     border-top: 2px solid ${({theme}) => theme.colors.borderColor};
//                  }
//                  .top-header {
//                      border-bottom: 2px solid ${({theme}) => theme.colors.borderColor};
//                      .title {
//                          h2 {
//                             color: ${({theme}) => theme.colors.secondaryColor};
//                          }
//                      }
//                  }

//                  li {
//                     &:hover {
//                         background: ${({theme}) => theme.colors.listHover};
//                     }

//                      .link {
//                          color: ${({theme}) => theme.colors.listColor};
//                      }
//                  }
//              }
//          }
//      }
//  `

const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userProfile = useSelector(state => state.userProfile)
    const { user, loading } = userProfile

    const [show, setShow] = useState(false)

    const [menuOpen, setMenuOpen] = useState(false)

    const ref = useRef(null)
    const sidebar = useRef(null)

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            dispatch(listProfile())
        }
    }, [userInfo, dispatch])

    const handleLogout = () => {
        dispatch(logout())
        setMenuOpen(false)
        sidebar.current.style.transform = 'translateX(-100%)'
    }

    useEffect(() => {
        if (menuOpen) {
            sidebar.current.style.transform = 'translateX(0)'
            sidebar.current.style.transition = 'transform 0.3s ease-in-out'
        } else {
            sidebar.current.style.transform = 'translateX(100%)'
            sidebar.current.style.transition = 'transform 0.3s ease-in-out'
        }
    }, [menuOpen])

    useEffect(() => {
        const hideWhenOutsideClick = (e) => {
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }

            document.addEventListener('mousedown', hideWhenOutsideClick)
            
            return () => {
            document.removeEventListener('mousedown', hideWhenOutsideClick)
             }
    }, [show])
  
    return (
    <header>
        <nav>
            <div className="container">
                <Link to='/' className='main-title link'>
                    <BsSoundwave />    
                </Link>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/faq' className='link'>Faq</Link></li>
                        <li><Link to='/about' className='link'>About</Link></li>
                        <li><Link to='/blog' className='link'>Contact</Link></li>
                    </ul>
                <article ref={sidebar}>
                {menuOpen && (
                    <ul className='sidebar active'>
                        <div className='top-header'>
                            <span className='title'>
                                <h2>Menu</h2>
                            </span>
                            <span className='burger-menu' onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? <MdClose /> : <FiMenu />}
                            </span> 
                        </div>
            
                        {userInfo && (
                            <li><Link to='/profile' className='link'>Profile</Link></li>
                        )}
                        <li><Link to='/blog' className='link'>Blog</Link></li>
                        <li><Link to='/about' className='link'>About</Link></li>
                        <li><Link to='/contact' className='link'>Contact</Link></li>
                        {userInfo && (
                            <li onClick={handleLogout}><Link to='/' className='link'>Logout</Link></li>
                        )}
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ex? Deserunt, exercitationem.</p>
                    </ul>
                )}
                </article>
                {userInfo ? (
                    <div className='user-name' onClick={() => setShow(!show)}>
                        <div className="user-avatar">
                            {loading ? (
                                <div className='skelton-image' />
                            ) : user && (
                                <img src={user.image} alt={user.name} />
                            )}
                        </div>
                        <p>{userInfo.name}</p>
                        <BiChevronDown className='down-arrow' />
                        {show && (
                            <div className="dp-menu" ref={ref}>
                                <ul >
                                    <li onClick={() => navigate('/profile')}>
                                        <span className="secondary-icon">
                                            <FaUserCircle />
                                        </span>
                                        <Link to='/profile' className='link-dp'>Profile</Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        <span className="secondary-icon">
                                        <MdLogout />
                                        </span>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <Link to='/register' className='link'>Sign Up</Link>
                        <Link to='/login' className='link'>
                            Sign In
                            <div className="layer"></div>
                        </Link>
                    </div>
                )}
                    <span className='burger-menu' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <MdClose /> : <FiMenu />}
                    </span>
            </div>
        </nav>
    </header>
  )
}

export default Header