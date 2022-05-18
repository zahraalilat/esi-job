import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {io} from 'socket.io-client'
import { format } from 'timeago.js'
import { getConvo, getConvos, newMessage } from '../actions/convoActions'
import Loader from '../components/Loader'
import { CONVO_EXIST_CONVO_RESET, CONVO_NEW_MESSAGE_RESET, CONVO_START_RESET } from '../constants/convoConstants'
import Sidebar from '../components/Sidebar'
import { RiSendPlane2Line } from 'react-icons/ri'
import Message from '../components/Message'
import Meta from '../utils/Meta'

const ConvoScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const socket = useRef()

    const inputRef = useRef()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const convoNewMessage = useSelector(state => state.convoNewMessage)
    const { loading, success } = convoNewMessage

    const [msgBody, setMsgBody] = useState('')

    const [arrivalMsg, setArrivalMsg] = useState(null)

    const [convo_msgs, setconvo_msgs] = useState([])

    const [connectedUsers, setConnectedUsers] = useState([])

    useEffect(() => {
        socket.current = io('ws://localhost:9000')
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', userInfo._id)
        socket.current.on('getUsers', users => {
            setConnectedUsers(users)
        })
    }, [userInfo])

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setArrivalMsg({
                sender: data.sender,
                msg_body: data.text,
                sentAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        setconvo_msgs((prev) => [...prev, arrivalMsg])
    }, [arrivalMsg])

    const convoGetConvo = useSelector(state => state.convoGetConvo)
    const { convo, loading: convoLoading, error } = convoGetConvo

    const convoGetUserConvos = useSelector(state => state.convoGetUserConvos)
    const { loading: convosLoading, convos, error: convosError } = convoGetUserConvos

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else if (success || !convo.users) {
            dispatch(getConvo(id))
            dispatch({
                type: CONVO_NEW_MESSAGE_RESET
            })
        }
    }, [dispatch, navigate, id, success, convo, userInfo])
    
    useEffect(() => {
        dispatch(getConvos())
    }, [dispatch])

    useEffect(() => {
        dispatch(getConvo(id))
    }, [dispatch, id])

    useEffect(() => {
        if (convo) {
            setconvo_msgs(convo.convo_msgs)
        }
    }, [convo])

    useEffect(() => {
        dispatch({
            type: CONVO_START_RESET,
        })
        dispatch({
            type: CONVO_EXIST_CONVO_RESET,
        })
    }, [dispatch])

    const handleSendMessage = (e) => {
        e.preventDefault()
        dispatch(newMessage(
            id,
            {
                msg_body: msgBody,
                sentAt: Date.now()
            }
        ))

        const receiver = convo.users.find(user => user._id !== userInfo._id)

        socket.current.emit('sendMessage', {
            userId: userInfo._id,
            receiverId: receiver,
            text: msgBody,
        })

        dispatch({
            type: CONVO_NEW_MESSAGE_RESET
        })

        setMsgBody('')
        inputRef.current.focus()
    }

    const chatList = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            scrollToMyRef()
        }, 0)
    }, [convo_msgs])

    const scrollToMyRef = () => {
        const scroll = chatList.current.scrollHeight - chatList.current.clientHeight
        chatList.current.scrollTo(0, scroll)
    }

    if (error) {
        return (
            <Message text={error} />
        )
    }
    
  return (
     <section className='conversation'>
        <Sidebar />
        <Meta pageName={`Messanger`} />
        <div className="container">
            <div className="contact-list">
                <header>
                    Conversations
                </header>
                {convos ? convos.map((convo) => {
                    const user = convo.users[0]._id === userInfo._id ? convo.users[1] : convo.users[0]
                    let isConnected = false

                    user && connectedUsers.map(target => {
                        if (target.userId === user._id) {
                            isConnected = true
                        }
                    })
                    return (
                        <>
                            {user && (
                                <div className={`contact ${id === convo._id && 'active'}`}>
                                    <div className="grand-img">
                                        {!user ? (
                                            <div classNmae='skelton-image'></div>
                                        ) : user.image === '/images/default-user.png' ? (
                                            <div className='img'>
                                                <img src='/images/default-user.png' alt={user.name} />
                                                {isConnected && (
                                                    <span className="connected"></span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className='img'>
                                                <img src={'/'+user.image} alt={user.name} />
                                                {isConnected && (
                                                    <span className="connected"></span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user-info">
                                        <strong>
                                            <Link to={`/conversations/${convo._id}`} className='link'>{user.name}</Link>
                                        </strong>
                                        {convo && convo.convo_msgs.length > 0 ? (
                                            <span>{convo.convo_msgs[convo.convo_msgs.length - 1].msg_body.substring(0, 20)}...</span>
                                        ) : (
                                            <span>Say 👋 to {user.name}</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )
                }) : (
                    <div>
                        <div className="skelton-loader" style={{height: '70px', borderRadius: '8px'}}></div>
                        <div className="skelton-loader" style={{height: '70px', borderRadius: '8px'}}></div>
                        <div className="skelton-loader" style={{height: '70px', borderRadius: '8px'}}></div>
                    </div>
                )}
            </div>
            <div className="messaging-body">
                <header>
                    <div className='target-contact'>
                        {convo && convo.users && (
                            <>
                                <div className="img">
                                    <img src={`${convo.users[0]._id === userInfo._id ? (convo.users[1].image === '/images/default-user.png' ? '/images/default-user.png' : '/'+convo.users[1].image) : (convo.users[0].image === '/images/default-user.png' ? '/images/default-user.png' : '/'+convo.users[0].image)}`} />
                                </div>
                                <Link to={`/freelancers/${convo.users[0]._id === userInfo._id ? convo.users[1]._id : convo.users[0]._id}`} className='link'>{convo.users[0]._id === userInfo._id ? convo.users[1].name : convo.users[0].name}</Link>
                            </>
                        )}
                    </div>
                </header>
            <article className="messages" ref={chatList}>
               <div className="chat-list">
               {convo && convo_msgs && convo_msgs.length > 0 ? (
                            (convo_msgs.map((msg) => {
                                return (
                                    <>
                                     {msg.sender === userInfo._id ? (
                                        <>
                                            <div className="msg-elem sender">
                                                <blockquote>{msg.msg_body}</blockquote>
                                                <small>{format(msg.sentAt)}</small>
                                            </div>
                                        </>
                                     ) : (
                                         <div className="msg-elem receiver">
                                            <blockquote>{msg.msg_body}</blockquote>
                                             <small>{format(msg.sentAt)}</small>
                                         </div>
                                    )}
                                    </>
                                )
                            }))
               ) : (
                   convo && convo.users && (
                    <span>Say 👋 to <i>{convo.users[0]._id === userInfo._id ? convo.users[1].name : convo.users[0].name}</i></span>
                   )
               )}
               </div>
            </article>
            <article className='msg-input'>
                <form onSubmit={handleSendMessage}>
                    <input type="text" onChange={(e) => setMsgBody(e.target.value)} value={msgBody} ref={inputRef} placeholder='Aa' />
                    <button type='submit'>
                        
                        {loading ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            <>
                                <RiSendPlane2Line />
                            </>
                        )}
                    </button>
                </form>
            </article>
            </div>
        </div>
    </section>
  )
}

export default ConvoScreen
