import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { MdOutlineClose } from 'react-icons/md'
import { getConvos } from '../actions/convoActions'
import Loader from '../components/Loader'

const Messanger = () => {

    const dispatch = useDispatch()

    const convoGetUserConvos = useSelector(state => state.convoGetUserConvos)
    const { loading: convosLoading, convos } = convoGetUserConvos

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [isOpen, setIsOpen] = useState(false)

    const msg = useRef()

    const toggle = useRef()

    useEffect(() => {
        dispatch(getConvos())
    }, [])

    useEffect(() => {
        if (isOpen) {
            msg.current.style.transform = 'translate(0)'
            msg.current.style.transition = 'transform 0.2s ease-in-out'
            toggle.current.style.transform = 'translate(100%)'
            toggle.current.style.transition = 'transform 0.2s ease-in-out'
        } else {
            msg.current.style.transform = 'translate(100%)'
            msg.current.style.transition = 'transform 0.2s ease-in-out'
            toggle.current.style.transform = 'translate(0)'
            toggle.current.style.transition = 'transform 0.2s ease-in-out'
        }
    }, [isOpen])

  return (
    <section className='messanger'>
        <div className="toggle" onClick={() => setIsOpen(!isOpen)} ref={toggle}>
            <span className='icon' >
                <BiMessageSquareDetail/>
            </span>
        </div>
        <div className="main-content" ref={msg}>
            <header>
                Messages
                <MdOutlineClose className='icon' onClick={() => setIsOpen(!isOpen)} />
            </header>
            <div className="contact-list">
                {convos && convos.length > 0 ? (
                    <>
                        {!convosLoading ? convos.map((convo) => {
                        const user = convo.users[0]._id === userInfo._id ? convo.users[1] : convo.users[0]
                        return (
                            <>
                                {user && (
                                    <div className='contact'>
                                        <div className="grand-img">
                                            {!user ? (
                                                <div classNmae='skelton-image'></div>
                                            ) : user.image === '/images/default-user.png' ? (
                                                <div className="img">
                                                    <img src='/images/default-user.png' alt={user.name} />
                                                </div>
                                            ) : (
                                                <div className="img">
                                                    <img src={'/'+user.image} alt={user.name} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <strong>
                                                <Link to={`/conversations/${convo._id}`} className='link'>{user.name}</Link>
                                            </strong>
                                            {convo.convo_msgs.length > 0 ? (
                                                <span>{convo.convo_msgs[convo.convo_msgs.length - 1].msg_body.substring(0, 20)}...</span>
                                            ) : (
                                                <span>Say 👋 to {user.name}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )
                    }) : <Loader />}
                </>
                ) : (
                    <span className='no-messages'>No messages yet!</span>
                )}
            </div>
        </div>
    </section>
  )
}

export default Messanger