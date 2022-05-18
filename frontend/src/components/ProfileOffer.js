import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { determineMonth } from '../utils/determineMonth'
import { acceptDeleteStudent, acceptStudent, deleteOffer, listCompanyOffers } from '../actions/offerActions'
import { BiDotsVerticalRounded, BiCheckDouble } from 'react-icons/bi'
import { GiPositionMarker } from 'react-icons/gi'
import { BsPeople, BsFillPeopleFill, BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'
import { MdOutlineClose, MdRemoveCircleOutline, MdOutlineRemove } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { acceptDeleteTrainingStudent, acceptTrainingStudent, deleteTraining, listTrainings } from '../actions/trainingActions'
import { acceptDeleteInternshipStudent, acceptInternshipStudent, deleteInternship, listInternships } from '../actions/internshipActions'
import { OFFER_ACCEPT_STUDENT_RESET } from '../constants/offerConstants'
import Applicant from './Applicant'
import { TRAINING_ACCEPT_STUDENT_RESET } from '../constants/trainingConstants'
import { INTERNSHIP_ACCEPT_STUDENT_RESET } from '../constants/internshipConstants'
import { addBookmark, deleteBookmark, getBookmarks } from '../actions/userActions'
import { USER_ADD_BOOKMARK_RESET, USER_DELETE_BOOKMARK_RESET } from '../constants/userConstants'

const ProfileOffer = ({ _id, name, company, neededSkills, createdAt, appliants, tags, applicants, accepted, paymentIncluded, price, disactivateEdits, tab, bookmarking, bookmarked }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const offerAcceptStudent = useSelector(state => state.offerAcceptStudent)
    const { success, loading } = offerAcceptStudent

    const trainingAcceptStudent = useSelector(state => state.trainingAcceptStudent)
    const { success: trainingSuccess, loading: trainingLoading } = trainingAcceptStudent

    const internshipAcceptStudent = useSelector(state => state.internshipAcceptStudent)
    const { success: internshipSuccess, loading: internshipLoading } = internshipAcceptStudent

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userGetBookmarks = useSelector(state => state.userGetBookmarks)
    const { bookmarks } = userGetBookmarks

    const userAddBookmark = useSelector(state => state.userAddBookmark)
    const { success: successAddBookmark, loading: loadingAddBookmark } = userAddBookmark

    const userDeleteBookmark = useSelector(state => state.userDeleteBookmark)
    const { success: successDeleteBookmark, loading: loadingDeleteBookmark } = userDeleteBookmark

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else if (!bookmarks || successAddBookmark || successDeleteBookmark) {
            dispatch(getBookmarks())
        }
    }, [userInfo, navigate, dispatch, bookmarks, successAddBookmark, successDeleteBookmark])

    const [toggle, setToggle] = useState(false)

    const [model, setModel] = useState(false)

    const [acceptedModel, setAcceptedModel] = useState(false)

    const toggler = useRef()
    const appliantsRef = useRef()
    const modelRef = useRef()
    const layerRef = useRef()

    const acceptedRef = useRef()
    const acceptedModelRef = useRef()
    const acceptedLayerRef = useRef()

    const edit = useRef()

    const handleDeleteOffer = (id) => {
        if (!tags && !paymentIncluded && !price) {
            if (window.confirm('Delete offer?')) {
                dispatch(deleteOffer(id))
            }
        } else if (tags && price && !paymentIncluded) {
            if (window.confirm('Delete Training?')) {
                dispatch(deleteTraining(id))
            }
        } else {
            if (window.confirm('Delete Internship?')) {
                dispatch(deleteInternship(id))
            }
        }
    }

    const handleToggle = () => {
        if (toggle) {
            toggler.current.style.opacity = '0'
            setToggle(false)
        } else {
            toggler.current.style.opacity = '1'
        }

        setToggle(!toggle)
    }
    
    useEffect(() => {
        const hideWhenOutsideClick = (e) => {
            if (toggle && edit.current && !edit.current.contains(e.target)) {
                setToggle(false)
                toggler.current.style.opacity = '0'
            }
        }

            document.addEventListener('mousedown', hideWhenOutsideClick)
            
            return () => {
                document.removeEventListener('mousedown', hideWhenOutsideClick)
            }
    }, [toggle, edit])

    useEffect(() => {
        if (!disactivateEdits) {
            if (model) {
                appliantsRef.current.style.display = 'block'
                setTimeout(() => {
                    layerRef.current.style.opacity = '1'
                    layerRef.current.style.transition = 'opacity 0.4s ease-in-out'
                    modelRef.current.style.opacity = '1'
                    modelRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                    modelRef.current.style.transition = 'transform 0.22s ease-out, opacity 0.2s ease-in-out'
                }, 70)
            } else {
                layerRef.current.style.opacity = '0'
                layerRef.current.style.transition = 'opacity 0.5s ease-in-out'
                modelRef.current.style.opacity = '0'
                modelRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)'
                modelRef.current.style.transition = 'transform 0.2s ease-in, opacity 0.3s ease-in-out'
                setTimeout(() => {
                    appliantsRef.current.style.display = 'none'
                }, 150)
            }
        }
    }, [model, disactivateEdits])

    useEffect(() => {
        if (!disactivateEdits) {
            if (acceptedModel) {
                acceptedRef.current.style.display = 'block'
                setTimeout(() => {
                    acceptedLayerRef.current.style.opacity = '1'
                    acceptedLayerRef.current.style.transition = 'opacity 0.4s ease-in-out'
                    acceptedModelRef.current.style.opacity = '1'
                    acceptedModelRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                    acceptedModelRef.current.style.transition = 'transform 0.22s ease-out, opacity 0.2s ease-in-out'
                }, 70)
            } else {
                acceptedLayerRef.current.style.opacity = '0'
                acceptedLayerRef.current.style.transition = 'opacity 0.5s ease-in-out'
                acceptedModelRef.current.style.opacity = '0'
                acceptedModelRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)'
                acceptedModelRef.current.style.transition = 'transform 0.2s ease-in, opacity 0.3s ease-in-out'
                setTimeout(() => {
                    acceptedRef.current.style.display = 'none'
                }, 150)
            }
        }
    }, [acceptedModel, disactivateEdits])

    const handleAcceptStudent = (acceptedUser) => {
        if (neededSkills) {
            dispatch(acceptStudent(_id, acceptedUser))
        } else if (applicants) {
            dispatch(acceptTrainingStudent(_id, acceptedUser))
        } else {
            dispatch(acceptInternshipStudent(_id, acceptedUser))
        }
    }

    const handleAcceptDeleteStudent = (user) => {
        if (neededSkills) {
            dispatch(acceptDeleteStudent(_id, user))
        } else if (price) {
            dispatch(acceptDeleteTrainingStudent(_id, user))
        } else {
            dispatch(acceptDeleteInternshipStudent(_id, user))
        }
    }

    useEffect(() => {
        if (success) {
            dispatch(listCompanyOffers(userInfo._id))
            dispatch({
                type: OFFER_ACCEPT_STUDENT_RESET,
            })
        }
    }, [success, userInfo, dispatch])

    useEffect(() => {
        if (trainingSuccess) {
            dispatch(listTrainings())
            dispatch({
                type: TRAINING_ACCEPT_STUDENT_RESET,
            })
        }
    }, [trainingSuccess, userInfo, dispatch])

    useEffect(() => {
        if (internshipSuccess) {
            dispatch(listInternships())
            dispatch({
                type: INTERNSHIP_ACCEPT_STUDENT_RESET,
            })
        }
    }, [internshipSuccess, userInfo, dispatch])

    const [isBookmarked, setIsBookmarked] = useState(bookmarked)

    const handleDeleteBookmark = (bookmarkId, docType) => {
        dispatch(deleteBookmark(bookmarkId, docType))
    }

    useEffect(() => {
        if (successDeleteBookmark) {
            dispatch({
                type: USER_DELETE_BOOKMARK_RESET
            })
        }
    }, [successDeleteBookmark, dispatch])

    const handleAddBookmark = (bookmarkId, docType) => {
        dispatch(addBookmark(bookmarkId, docType))
    }

    useEffect(() => {
        if (successAddBookmark) {
            dispatch({
                type: USER_ADD_BOOKMARK_RESET
            })
        }
    }, [successAddBookmark, dispatch])

  return (
    <>
        <article className='offer-card' style={(loadingAddBookmark || loadingDeleteBookmark) ? {opacity: '0.5'} : null}>
                    <p className='offer-title'>
                        {!tags ? (
                            <Link to={`/offers/${_id}`} className='link' state={{tab: tab}}>{name}</Link>
                            ) : price ? (
                                <Link to={`/trainings/${_id}`} className='link' state={{tab: tab}}>{name}</Link>
                                ) : (
                                    <Link to={`/internships/${_id}`} className='link' state={{tab: tab}}>{name}</Link>
                        )}
                        {bookmarking && (
                            <span className="bookmark">
                                {bookmarks && bookmarks.some(x => x._id === _id) ? (
                                    <BsFillBookmarkFill onClick={() => handleDeleteBookmark(_id, neededSkills ? 'offer' : price ? 'training' : 'internship')} />
                                ) : (
                                    <BsBookmark onClick={() => handleAddBookmark(_id, neededSkills ? 'offer' : price ? 'training' : 'internship')} />
                                )}
                            </span>
                        )}
                        {!disactivateEdits && (
                            <div className="edits-outter-container">
                            <span ref={toggler} onClick={handleToggle}>
                                <BiDotsVerticalRounded className='icon' />
                            </span>
                            <div className='edits-container' ref={edit}>
                                {toggle && (
                                    <div className="edits">
                                        <ul>
                                            <li onClick={() => setModel(true)}><BsPeople className='icon' />Applicants</li>
                                            <li onClick={() => setAcceptedModel(true)}><BsFillPeopleFill className='icon' />Accepted</li>
                                            <li onClick={() => handleDeleteOffer(_id)}><MdRemoveCircleOutline className='icon' />Remove</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                    </p>
                    <div className="offer-skills">
                            <div className="offers">
                                {neededSkills && neededSkills.split(',').map(skill => {
                                return (
                                    <span className="skill">{skill}</span>
                                )
                                })}
                                {tags && tags.split(',').map(skill => {
                                return (
                                    <span className="skill">{skill}</span>
                                )
                                })}
                            </div>
                            <div className="date">
                                <span className='bold'>published on</span> {createdAt.substr(8, 2)} {determineMonth(createdAt.substr(5, 2))} {createdAt.substr(0, 4)} at {new Date(createdAt).toString().substr(16, 5)} {disactivateEdits && (
                                    <>
                                        by <span className="bold">{company.name}</span>
                                    </>
                                )}
                            </div>
                    </div>
                <div>
            </div>
    </article>
        {!disactivateEdits && (
            <div className="appliants" ref={appliantsRef}>
            <div className="appliants-model" ref={modelRef}>
                <header className='card-header'>
                    List of applicants
                    <MdOutlineClose className='icon' onClick={() => setModel(!model)} />
                </header>
                <div className="model-body">
                    {appliants && appliants.length > 0 && (
                            <div className="appliants-list">
                                {appliants.map(app => {
                                    return (
                                        <article style={loading || internshipLoading ? { opacity: '0.5', userSelect: 'none', pointerEvents: 'none' } : null}>
                                            <div className="img">
                                                <img src={app.image} alt={app.name} />
                                            </div>
                                            <div className="appliant-info">
                                                <Link className='link' to={`/freelancers/${app._id}`}>{app.name}</Link>
                                                {app.address && (
                                                    <>
                                                        <p className='city'>
                                                        <GiPositionMarker className='icon' />
                                                        {app.address}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <button className="accept" onClick={() => handleAcceptStudent(app.id)}>
                                                    <BiCheckDouble className='icon' />
                                            </button>
                                            <button className="delete" style={{marginLeft: '0.3rem'}} onClick={() => handleAcceptDeleteStudent(app.id)}>
                                                    <MdOutlineClose className='icon' />
                                            </button>
                                        </article>
                                    )
                                })}
                            </div>
                    )}
                    {applicants && applicants.length > 0 && (
                            <div className="appliants-list">
                                {applicants.map(app => {
                                    return (
                                        <article style={trainingLoading ? { opacity: '0.5', userSelect: 'none', pointerEvents: 'none' } : null}>
                                            <div className="img">
                                                <img src={app.image} alt={app.name} />
                                            </div>
                                            <div className="appliant-info">
                                                <Link className='link' to={`/freelancers/${app._id}`}>{app.name}</Link>
                                                {app.address && (
                                                    <>
                                                        <p className='city'>
                                                        <GiPositionMarker className='icon' />
                                                        {app.address}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <button className="accept-user" onClick={() => handleAcceptStudent(app._id)}>
                                                    <BiCheckDouble className='icon' />
                                            </button>
                                            <button className="delete" style={{marginLeft: '0.3rem'}} onClick={() => handleAcceptDeleteStudent(app.id)}>
                                                    <MdOutlineClose className='icon' />
                                            </button>
                                        </article>
                                    )
                                })}
                            </div>
                    )}
                    {appliants && appliants.length === 0 && !tags && (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No applicants to this offer yet</p>
                        </div>
                    )}
                    {applicants && applicants.length === 0 && price &&  (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No applicants to this training yet</p>
                        </div>
                    )}
                    {appliants && appliants.length === 0 && tags &&  (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No applicants to this internship yet</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="layer" onClick={() => setModel(!model)} ref={layerRef}></div>
        </div>
        )}
        {!disactivateEdits && (
            <div className="appliants" ref={acceptedRef}>
            <div className="appliants-model" ref={acceptedModelRef}>
                <header className='card-header'>
                    List of accepted applicants
                    <MdOutlineClose className='icon' onClick={() => setAcceptedModel(!acceptedModel)} />
                </header>
                <div className="model-body">
                    {accepted && accepted.length > 0 && (
                            <div className="appliants-list">
                                {accepted.map(app => {
                                    return (
                                        <Applicant {...app} offerId={_id} neededSkills={neededSkills} price={price} />
                                    )
                                })}
                            </div>
                    )}
                    {accepted && accepted.length === 0 && neededSkills && (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No accepted applicants for this offer yet</p>
                        </div>
                    )}
                    {accepted && accepted.length === 0 && applicants && (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No accepted applicants for this offer yet</p>
                        </div>
                    )}
                    {accepted && accepted.length === 0 && !neededSkills && appliants && (
                        <div className='no-appliants'>
                            <img src="/images/empty-folder--v2.png" alt="empty folder" />
                            <p>No accepted applicants for this offer yet</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="layer" onClick={() => setAcceptedModel(!acceptedModel)} ref={acceptedLayerRef}></div>
        </div>
        )}
    </>
  )
}

export default ProfileOffer