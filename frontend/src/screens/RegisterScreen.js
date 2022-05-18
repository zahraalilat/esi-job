import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import Loader from '../components/Loader'
import { IoArrowBack } from 'react-icons/io5'
import { USER_REGISTER_ERROR_RESET } from '../constants/userConstants'
import Meta from '../utils/Meta'

const RegisterScreen = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [isCompany, setIsCompany] = useState(false)

    const [type, setType] = useState('password')
    const [typeConfirm, setTypeConfirm] = useState('password')

    const registerHandler = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            if (name && email && password) {
                if (/@esi-sba.dz\s*$/.test(email) || isCompany) {
                    dispatch(register(name, email, password, isCompany))
                    passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    passwordRef.current.style.outline = 'none'
                    emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    emailRef.current.style.outline = 'none'
                    nameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    nameRef.current.style.outline = 'none'
                    confirmPasswordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    confirmPasswordRef.current.style.outline = 'none'
                } else {
                    emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
                    emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
                }
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
                if (!name) {
                    nameRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
                    nameRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
                } else {
                    nameRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    nameRef.current.style.outline = 'none'
                }
                if (!confirmPassword) {
                    confirmPasswordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
                    confirmPasswordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
                } else {
                    confirmPasswordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
                    confirmPasswordRef.current.style.outline = 'none'
                }
            }
        } else {
            passwordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
            passwordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
            confirmPasswordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
            confirmPasswordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
        }
    }

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

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
                    type: USER_REGISTER_ERROR_RESET,
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
        nameRef.current.focus()
    }, [])

    const handleType = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    const handleTypeConfirm = () => {
        if (typeConfirm === 'password') {
            setTypeConfirm('text')
        } else {
            setTypeConfirm('password')
        }
    }

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const nameRef = useRef()

  return (
    <section className='login'>
        <Meta pageName={`ESI-JOB | Sign In`} />
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
                        <h2>Sign Up</h2>
                        <form onSubmit={registerHandler}>
                            <div className='form-control'>
                                <label>name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} ref={nameRef} placeholder='Enter name' />
                            </div>
                            <div className='form-control'>
                                <label>email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} placeholder='Enter email' />
                            </div>
                            <div className="password-controls">
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
                                </div>
                                <div className='form-control'>
                                    <label>confirm password</label>
                                    <div className="password-control" ref={confirmPasswordRef}>
                                        <input type={typeConfirm} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
                                        {typeConfirm==='password' ? (
                                            <BiHide className='show-hide-toggle' onClick={handleTypeConfirm} style={confirmPassword === '' && {pointerEvents: 'none', color: '#777'}} />
                                            ) : (
                                            <BiShowAlt className='show-hide-toggle' onClick={handleTypeConfirm} />
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="form-control check-box">
                                <input type="checkbox" onChange={(e) => setIsCompany(e.target.checked)} />
                                <label>Create my account as an entreprise account</label>
                            </div>
                            <button type='submit'>
                                Register
                                {loading && <Loader  />}
                            </button>
                        </form>
                        <p>Already have an account? <Link to='/login' className='link'>Login</Link></p>
                    </>
            </div>
        </article>
    </section>
  )
}

export default RegisterScreen