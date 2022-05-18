import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { listAllInternships } from '../actions/internshipActions'
import { listOffers } from '../actions/offerActions'
import { listAllTrainings } from '../actions/trainingActions'
import Pagination from '../components/Pagination'
import ProfileOffer from '../components/ProfileOffer'
import Sidebar from '../components/Sidebar'
import { INTERNSHIP_GET_RESET } from '../constants/internshipConstants'
import { OFFER_GET_RESET } from '../constants/offerConstants'
import { TRAINING_GET_RESET } from '../constants/trainingConstants'
import { BsFilterLeft, BsPatchCheck } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { RiSettingsLine } from 'react-icons/ri'
import { getAcceptedRequests, getRequests, getBookmarks } from '../actions/userActions'
import Messanger from '../components/Messanger'
import Message from '../components/Message'
import SearchNavbar from '../components/SearchNavbar'
import Meta from '../utils/Meta'

const AllScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [tab, setTab] = useState('offers')

    const data = location ? location.state : null
    
    const [keyword, setKeyword] = useState('')

    const [algolia, setAlgolia] = useState(false)

    const [requestType, setRequestType] = useState('accepted')

    const [req, setReq] = useState(false)

    const reqBodyRef = useRef()

    useEffect(() => {
        if (req) {
            reqBodyRef.current.style.transform = 'translateX(0)'
            reqBodyRef.current.style.transition = 'transform 0.2s ease-in-out'
        } else {
            reqBodyRef.current.style.transform = 'translateX(100%)'
            reqBodyRef.current.style.transition = 'transform 0.2s ease-in-out'
        }
    }, [req])

    useEffect(() => {
        if (data) {
            setTab(data)
        }
    }, [data])

    const userGetBookmarks = useSelector(state => state.userGetBookmarks)
    const { bookmarks } = userGetBookmarks

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const offerAll = useSelector(state => state.offerAll)
    const { offers, pagination, page, nbrPages, loading } = offerAll

    const trainingAll = useSelector(state => state.trainingAll)
    const { 
        trainings, 
        pagination: trainingPagination, 
        page: trainingPage, 
        nbrPages: trainingNbrPages, 
        loading: trainingLoading 
    } = trainingAll

    const internshipAll = useSelector(state => state.internshipAll)
    const { 
        internships, 
        pagination: internshipPagination, 
        page: internshipPage, 
        nbrPages: internshipNbrPages, 
        loading: internshipLoading 
    } = internshipAll

    const userRequests = useSelector(state => state.userRequests)
    const { loading: requestsLoading, requests } = userRequests

    const userAcceptedRequests = useSelector(state => state.userAcceptedRequests)
    const { loading: acceptedLoading, accepted } = userAcceptedRequests

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            dispatch(listOffers())
            dispatch(listAllTrainings())
            dispatch(listAllInternships())
            dispatch(getRequests())
            dispatch(getAcceptedRequests())
            dispatch(getBookmarks())
        }
    }, [userInfo, navigate, dispatch])

    useEffect(() => {
        dispatch({
            type: OFFER_GET_RESET,
        })
        dispatch({
            type: TRAINING_GET_RESET,
        })
        dispatch({
            type: INTERNSHIP_GET_RESET,
        })
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(listOffers(1, keyword))
        dispatch(listAllTrainings(1, keyword))
        dispatch(listAllInternships(1, keyword))
        setAlgolia(false)
    }

    const searchRef = useRef()
    const escRef = useRef()
    const modelRef = useRef()
    const layerRef = useRef()
    const searchInput = useRef(false)

    useEffect(() => {
        if (algolia) {
            searchRef.current.style.display = 'block'
            setTimeout(() => {
                layerRef.current.style.opacity = '1'
                layerRef.current.style.transition = 'opacity 0.4s ease-in-out'
                modelRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
                modelRef.current.style.opacity = '1'
                modelRef.current.style.transition = 'transform 0.22s ease-in, opacity 0.2s ease-in'
                searchInput.current.focus()
            }, 70)
        } else {
            setTimeout(() => {
                searchRef.current.style.display = 'none'
            }, 120)
            layerRef.current.style.opacity = '0'
            layerRef.current.style.transition = 'opacity 0.4s ease-in-out'
            modelRef.current.style.transform = 'translate(-50%, -50%) scale(0)'
            modelRef.current.style.opacity = '1'
            modelRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.1s ease-in-out'
        }
    }, [algolia])

  return (
    <>
    <Meta pageName='ESI-JOB | Positions' />
    <section className='all-offers'>
        <Sidebar />
        <Messanger />
        <div className="main-all" style={userInfo && userInfo.isCompany ? {gridTemplateColumns: '1fr'} : null}>
            <div className="search-navbar">
                <SearchNavbar noSearch />
            </div>
            {tab === 'offers' ? (
                <div className="main-all-content">
                <header>
                    <p className='title'>
                        Latest Job Offers
                        <button onClick={() => setAlgolia(!algolia)}>
                            <BsFilterLeft className='icon' />
                            Search
                        </button>
                    </p>
                    <div className="navigation-tab">
                        <p>Navigate through and find your next position</p>
                        <div className="buttons-group">
                            <button onClick={() => setTab('offers')} className='active'>Job Offers</button>
                            <button onClick={() => setTab('trainings')}>Trainings</button>
                            <button onClick={() => setTab('internships')}>Internships</button>
                        </div>
                    </div>
                </header>
                <div className="offers">
                    {loading ? (
                        <>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px'}}></div>
                        </>
                    ) : offers && offers.length > 0 ? (
                       <>
                            {offers.map(offer => {
                                return (
                                    <ProfileOffer {...offer} disactivateEdits tab={tab} bookmarking />
                                )
                            })}
                            <Pagination pagination={pagination} nbrPages={nbrPages} page={page} type='offers' />
                       </>
                    ) : (
                        <Message text='No available offers yet' success />
                    )}
                </div>
            </div>
            ) : tab === 'trainings' ? (
                <div className="main-all-content">
                <header>
                    <p className='title'>
                        Latest Trainings
                        <button onClick={() => setAlgolia(!algolia)}>
                                <BsFilterLeft className='icon' />
                                Search
                        </button>
                    </p>
                    <div className="navigation-tab">
                        <p>Navigate through and find your next position</p>
                        <div className="buttons-group">
                            <button onClick={() => setTab('offers')}>Job Offers</button>
                            <button onClick={() => setTab('trainings')} className='active'>Trainings</button>
                            <button onClick={() => setTab('internships')}>Internships</button>
                        </div>
                    </div>
                </header>
                <div className="offers">
                    {trainingLoading ? (
                        <>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px'}}></div>
                        </>
                    ) : trainings && trainings.length > 0 ? (
                       <>
                            {trainings.map(tr => {
                                return (
                                    <ProfileOffer {...tr} disactivateEdits tab={tab} bookmarking />
                                )
                            })}
                            <Pagination pagination={trainingPagination} nbrPages={trainingNbrPages} page={trainingPage} type='trainings' />
                       </>
                    ) : (
                        <Message text='No available trainings yet' success />
                    )}
                </div>
            </div>
            ) : tab === 'internships' && (
                <div className="main-all-content">
                <header>
                    <p className='title'>
                        Latest Internships
                        <button onClick={() => setAlgolia(!algolia)}>
                            <BsFilterLeft className='icon' />
                            Search
                        </button>
                    </p>
                    <div className="navigation-tab">
                        <p>Navigate through and find your next position</p>
                        <div className="buttons-group">
                            <button onClick={() => setTab('offers')}>Job Offers</button>
                            <button onClick={() => setTab('trainings')}>Trainings</button>
                            <button onClick={() => setTab('internships')} className='active'>Internships</button>
                        </div>
                    </div>
                </header>
                <div className="offers">
                    {internshipLoading ? (
                        <>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px', marginBottom: '0.8rem'}}></div>
                            <div className='skelton-loader' style={{height: '70px'}}></div>
                        </>
                    ) : internships && internships.length > 0 ? (
                        <>
                            {internships.map(intr => {
                                return (
                                    <ProfileOffer {...intr} disactivateEdits tab={tab} bookmarking />
                                )
                            })}
                            <Pagination pagination={internshipPagination} nbrPages={internshipNbrPages} page={internshipPage} type='internships' />
                        </>
                    ) : (
                        <Message text='No available internships yet' success />
                    )}
                </div>
            </div>
            )}
            {userInfo && !userInfo.isCompany && (
                <div className="main-all-side">
                <header className="card-header">
                    All your requests
                    <div className="requests-accepted">
                        <span onClick={() => setRequestType('accepted')} style={requestType === 'accepted' ? {backgroundColor: '#f6f8fc'} : null}>accepted</span>
                        <span onClick={() => setRequestType('pending')} style={requestType === 'pending' ? {backgroundColor: '#f6f8fc'} : null}>pending</span>
                    </div>
                </header>
                <div className="requests-body">
                    <div className="model-body">
                        <>
                            {requestsLoading || acceptedLoading ? (
                                <>
                                    <div className='skelton-loader' style={{height: '60px', marginBottom: '0.4rem'}}></div>
                                    <div className='skelton-loader' style={{height: '60px'}}></div>
                                </>
                            ) : (
                                <>
                                    {requestType === 'pending' ? (
                                        requests && requests.length === 0 ? (
                                            <div className='no-appliants'>
                                                <img src="/images/empty-folder--v2.png" alt="empty folder" />
                                                <p>You have no pending requests</p>
                                            </div>
                                    ) : (
                                        requests && requests.map(req => {
                                            return (
                                                <article className='pending'>
                                                    <i className={req.price ? 'training' : req.neededSkills ? 'offer' : 'internship'}>{req.price ? 'training' : req.neededSkills ? 'job offer' : 'internship'}</i>
                                                    <Link to={req.applicants ? `/trainings/${req._id}` : req.neededSkills ? `/offers/${req._id}` : `/internships/${req._id}`} className='title'>{req.name}</Link>
                                                    <span>By <strong>{req.company.name}</strong></span>
                                                </article>
                                            )
                                        })
                                    )
                                    ) : requestType === 'accepted' && (
                                        accepted && accepted.length === 0 ? (
                                            <div className='no-appliants'>
                                                <img src="/images/empty-folder--v2.png" alt="empty folder" />
                                                <p>You have no accepted requests</p>
                                            </div>
                                    ) : (
                                        accepted && accepted.map(req => {
                                            return (
                                                <article className='accepted'>
                                                    <i className={req.price ? 'training' : req.neededSkills ? 'offer' : 'internship'}>{req.price ? 'training' : req.neededSkills ? 'job offer' : 'internship'}</i>
                                                    <Link to={req.applicants ? `/trainings/${req._id}` : req.neededSkills ? `/offers/${req._id}` : `/internships/${req._id}`} className='title'>{req.name}</Link>
                                                    <span>By <strong>{req.company.name}</strong></span>
                                                    <div className="checked">
                                                        <BsPatchCheck />
                                                    </div>
                                                </article>
                                            )
                                        })
                                    )
                                    )}
                                </>
                            )}
                        </>
                    </div>
                </div>
            </div>
            )}
                <div className="main-all-side mob-version" ref={reqBodyRef}>
             {userInfo && !userInfo.isCompany && (
               <>
                 <header className="card-header">
                    All your requests
                    <div className="requests-accepted">
                        <span onClick={() => setRequestType('accepted')} style={requestType === 'accepted' ? {backgroundColor: '#f6f8fc'} : null}>accepted</span>
                        <span onClick={() => setRequestType('pending')} style={requestType === 'pending' ? {backgroundColor: '#f6f8fc'} : null}>pending</span>
                    </div>
                </header>
                <div className="requests-body">
                    <div className="model-body">
                        <>
                            {requestsLoading || acceptedLoading ? (
                                <>
                                    <div className='skelton-loader' style={{height: '60px', marginBottom: '0.4rem'}}></div>
                                    <div className='skelton-loader' style={{height: '60px'}}></div>
                                </>
                            ) : (
                                <>
                                    {requestType === 'pending' ? (
                                        requests && requests.length === 0 ? (
                                            <div className='no-appliants'>
                                                <img src="/images/empty-folder--v2.png" alt="empty folder" />
                                                <p>You have no pending requests</p>
                                            </div>
                                    ) : (
                                        requests && requests.map(req => {
                                            return (
                                                <article className='pending'>
                                                    <i className={req.price ? 'training' : req.neededSkills ? 'offer' : 'internship'}>{req.price ? 'training' : req.neededSkills ? 'job offer' : 'internship'}</i>
                                                    <Link to={req.applicants ? `/trainings/${req._id}` : req.neededSkills ? `/offers/${req._id}` : `/internships/${req._id}`} className='title'>{req.name}</Link>
                                                    <span>By <strong>{req.company.name}</strong></span>
                                                </article>
                                            )
                                        })
                                    )
                                    ) : requestType === 'accepted' && (
                                        accepted && accepted.length === 0 ? (
                                            <div className='no-appliants'>
                                                <img src="/images/empty-folder--v2.png" alt="empty folder" />
                                                <p>You have no accepted requests</p>
                                            </div>
                                    ) : (
                                        accepted && accepted.map(req => {
                                            return (
                                                <article className='accepted'>
                                                    <i className={req.price ? 'training' : req.neededSkills ? 'offer' : 'internship'}>{req.price ? 'training' : req.neededSkills ? 'job offer' : 'internship'}</i>
                                                    <Link to={req.applicants ? `/trainings/${req._id}` : req.neededSkills ? `/offers/${req._id}` : `/internships/${req._id}`} className='title'>{req.name}</Link>
                                                    <span>By <strong>{req.company.name}</strong></span>
                                                    <div className="checked">
                                                        <BsPatchCheck />
                                                    </div>
                                                </article>
                                            )
                                        })
                                    )
                                    )}
                                </>
                            )}
                        </>
                    </div>
                </div>
               </>
                )}
            </div>
            {userInfo && !userInfo.isCompany && (
                <span className="main-all-side-mob-version-toggler" onClick={() => setReq(!req)}>
                    <RiSettingsLine className='icon' />
                </span>
            )}
        </div>
    </section>
        <div className="search-control layer" ref={searchRef}>
            <div className="model" ref={modelRef}>
                <h1>Find what you are looking for instantly!</h1>
                <form onSubmit={handleSearch}>
                    <div className="form-control">
                        <BiSearch className='icon' onClick={handleSearch} />
                        <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Enter a training name, a job name, or seach by tags' ref={searchInput} />
                    </div>
                </form> 
            </div>
            <span onClick={() => setAlgolia(!algolia)} ref={escRef}>
                <MdOutlineClose className='icon' />
                <p>esc</p>
            </span>
            <div className="overlay" onClick={() => setAlgolia(!algolia)} ref={layerRef}></div>
        </div>
    </>
  )
}

export default AllScreen