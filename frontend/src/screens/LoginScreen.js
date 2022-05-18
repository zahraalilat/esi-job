import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import Loader from '../components/Loader'
import { IoArrowBack } from 'react-icons/io5'
import { USER_LOGIN_ERROR_RESET } from '../constants/userConstants'
import Meta from '../utils/Meta'

const LoginScreen = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [type, setType] = useState('password')

    const loginHandler = (e) => {
        e.preventDefault()
        if (email && password) {
            dispatch(login(email, password))
            passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            passwordRef.current.style.outline = 'none'
            emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            emailRef.current.style.outline = 'none'
        } else {
            if (!email) {
                emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
                emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
            } else {
                emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                emailRef.current.style.outline = 'none'
            }
            if (!password) {
                passwordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
                passwordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
            } else {
                passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                passwordRef.current.style.outline = 'none'
            }
        }
    }

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const popup = useRef()

    const [hide, setHide]= useState(true)

    useEffect(() => {
        if (error) {
            setHide(false)
        }
    }, [error])

    useEffect(() => {
        if(!hide) {
            popup.current.style.transform = 'translateY(0)'
            popup.current.style.opacity = '1'
            popup.current.style.transition = 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out'
        } else {
            popup.current.style.transform = 'translateY(-100%)'
            popup.current.style.opacity = '0'
            popup.current.style.transition = 'transform 0.2s ease-in-out, opacity 0.15s ease-in-out'
        }
    }, [hide])

    useEffect(() => {
        const messagePopUp = setTimeout(() => {
            setHide(true)
            const errorCleanUp = setTimeout(() => {
                dispatch({
                    type: USER_LOGIN_ERROR_RESET,
                })
            }, 100)
            return () => {
                clearTimeout(errorCleanUp)
            }
        }, 4000)
        
        return () => {
            clearTimeout(messagePopUp)
        }
    }, [hide, dispatch])

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleType = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    const emailRef = useRef()
    const passwordRef = useRef()

  return (
    <section className='login'>
        <Meta pageName={`ESI-JOB | Login`} />
        <article className="image">
            <img src="/images/login-img.png" alt="login image" />
        </article>
        <article className="content">
                <Link to='/' className='light-btn'>
                    <IoArrowBack className='icon' />
                </Link>
            <div>
                <article ref={popup} className='popup-parent'>
                    <Message text={error} />
                </article>
                    <>
                        <h2>Sign In</h2>
                        <form onSubmit={loginHandler}>
                            <div className='form-control'>
                                <label>email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} placeholder='Enter email' />
                            </div>
                            <div className='form-control'>
                                <label>password</label>
                                <div className="password-control" ref={passwordRef}>
                                    <input type={type} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                                    {type==='password' ? (
                                        <BiHide className='show-hide-toggle' onClick={handleType} style={password === '' && {pointerEvents: 'none', color: '#777'}} />
                                        ) : (
                                        <BiShowAlt className='show-hide-toggle' onClick={handleType} />
                                    )}
                                </div>
                                <small onClick={() => navigate('/forgot-password')}>Forgot password?</small>
                            </div>
                            <button type='submit'>
                                Login
                                {loading && <Loader  />}
                            </button>
                        </form>
                        <p>A new user? <Link to='/register' className='link'>Register</Link></p>
                    </>
            </div>
        </article>
    </section>
  )
}

export default LoginScreen