import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { forgotPassword, resetPassword } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { BsSoundwave, BsPatchCheck } from 'react-icons/bs'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import { USER_RESET_PASSWORD_RESET } from '../constants/userConstants'
import Meta from '../utils/Meta'

const ForgotPasswordScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { resetToken } = useParams()

    const userResetPassword = useSelector(state => state.userResetPassword)
    const { error, success, loading } = userResetPassword

    const [type, setType] = useState('password')

    const [hide, setHide] = useState(true)

    const popup = useRef()

    const passwordRef = useRef()

    const [password, setPassword] = useState('')

    useEffect(() => {
        if (success) {
            navigate('/profile')
            dispatch({
                type: USER_RESET_PASSWORD_RESET,
            })
        }
    }, [success])

    useEffect(() => {
        if (error) {
            setHide(false)
            const messagePopUp = setTimeout(() => {
                setHide(true)
                const errorCleanup = setTimeout(() => {
                    dispatch({
                        type: USER_RESET_PASSWORD_RESET,
                    })
                }, 100)

                return () => {
                    clearTimeout(errorCleanup)
                }
            }, 4000)

            return () => {
                clearTimeout(messagePopUp)
            }
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

    const handleForgotPassword = (e) => {
        e.preventDefault()
        if (password && resetToken) {
            dispatch(resetPassword(password, resetToken))
            passwordRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            passwordRef.current.style.outline = 'none'
        } else {
            passwordRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
            passwordRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
        }
    }

    const handleType = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

  return (
    <section className='forgot-password'>
        <Meta pageName={`Reset Password`} />
        <div className="main">
            <article ref={popup} className='popup-parent'>
                <Message text={error} />
            </article>
            <form onSubmit={handleForgotPassword}>
                <label>New passowrd</label>
                <div className="password-control" ref={passwordRef}>
                    <input type={type} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
                    {type==='password' ? (
                        <BiHide className='show-hide-toggle' onClick={handleType} style={password === '' && {pointerEvents: 'none', color: '#777'}} />
                    ) : (
                        <BiShowAlt className='show-hide-toggle' onClick={handleType} />
                    )}
                </div>
                <button type="submit">
                    Reset
                    {loading && (
                        <Loader className='icon' />
                    )}
                </button>
            </form>
        </div>
    </section>
  )
}

export default ForgotPasswordScreen