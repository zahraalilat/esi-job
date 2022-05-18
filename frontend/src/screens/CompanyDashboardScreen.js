import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getConvo, getConvos, newMessage } from '../actions/convoActions'
import Loader from '../components/Loader'
import { CONVO_NEW_MESSAGE_RESET } from '../constants/convoConstants'
import Sidebar from '../components/Sidebar'
import { RiSendPlaneFill } from 'react-icons/ri'
import Messanger from '../components/Messanger'

const CompanyDashboardScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [msgBody, setMsgBody] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const convoNewMessage = useSelector(state => state.convoNewMessage)
    const { loading, success } = convoNewMessage

    const convoGetConvo = useSelector(state => state.convoGetConvo)
    const { convo, loading: convoLoading } = convoGetConvo

    const convoGetUserConvos = useSelector(state => state.convoGetUserConvos)
    const { loading: convosLoading, convos } = convoGetUserConvos

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        }
    }, [dispatch, navigate])
    
    useEffect(() => {
        dispatch(getConvos())
    }, [])

    const handleSendMessage = (e) => {
    }

    const chatList = useRef(null)

    // useEffect(() => {
    //     setTimeout(() => {
    //         scrollToMyRef()
    //     }, 0)
    // }, [convo])

    const scrollToMyRef = () => {
        const scroll = chatList.current.scrollHeight - chatList.current.clientHeight
        chatList.current.scrollTo(0, scroll)
    }

  return (
     <section className='conversation'>
        <Sidebar />
        <Messanger />
        <div className="container">
            <div className="contact-list">
                {!convosLoading ? convos.map((convo) => {
                    const user = convo.users[0]._id === userInfo._id ? convo.users[1] : convo.users[0]
                    return (
                        <>
                            {user && (
                                <div>
                                    <div className="grand-img">
                                    {!user ? (
                                            <div classNmae='skelton-image'></div>
                                        ) : user.image === '/images/login-img.png' ? (
                                            <div className="img">
                                                <img src='/images/login-img.png' alt={user.name} />
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
            </div>
        </div>
    </section>
  )
}

export default CompanyDashboardScreen