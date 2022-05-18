import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { forgotPassword } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { BsSoundwave, BsPatchCheck } from 'react-icons/bs'
import { USER_FORGOT_PASSWORD_RESET } from '../constants/userConstants'
import Meta from '../utils/Meta'

const ForgotPasswordScreen = () => {
    const dispatch = useDispatch()

    const userForgotPassword = useSelector(state => state.userForgotPassword)
    const { error, success, loading } = userForgotPassword

    const [hide, setHide] = useState(true)

    const [sent, setSent] = useState(false)

    const popup = useRef()

    const emailRef = useRef()

    const [email, setEmail] = useState('')

    useEffect(() => {
        if (success) {
            setSent(true)
            dispatch({
                type: USER_FORGOT_PASSWORD_RESET,
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
                        type: USER_FORGOT_PASSWORD_RESET,
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
    }, [error, dispatch])

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
        if (email) {
            dispatch(forgotPassword(email, window.location.protocol, window.location.hostname, window.location.port))
            emailRef.current.style.border = '1px solid rgba(85, 85, 85, 0.15)'
            emailRef.current.style.outline = 'none'
        } else {
            emailRef.current.style.border = '1px solid rgba(255, 0, 0, 0.3)'
            emailRef.current.style.outline = '3px solid rgba(255, 0, 0, 0.2)'
        }
    }

  return (
    <section className='forgot-password'>
        <Meta pageName='Forgot Password' />
       {!sent ? (
            <div className="main">
            <article ref={popup} className='popup-parent'>
                <Message text={error} />
            </article>
            <span>
                <BsSoundwave />
            </span>
            <p>Enter the email address associated with your account and we will send you a link to reset your password.</p>
            <form onSubmit={handleForgotPassword}>
                <label>Email</label>
                <input type="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                <button type="submit">
                    Continue
                    {loading && (
                        <Loader className='icon' />
                    )}
                </button>
            </form>
        </div>
       ) : (
           <div className="main sent">
               <span>
                   <BsPatchCheck />
                   <p>Check your email to update your passowrd</p>
                   <p>You have 10 minutes!</p>
                   <Link to='/' className='link'>Go Back</Link>
               </span>
           </div>
       )}
    </section>
  )
}

export default ForgotPasswordScreen