import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'  
import { addTrainingStudent, getTraining, publicTraining } from '../actions/trainingActions'
import Sidebar from '../components/Sidebar'
import { determineMonth } from '../utils/determineMonth'
import { MdWorkOutline, MdWork } from 'react-icons/md'
import { BsChevronLeft, BsCheck2 } from 'react-icons/bs'
import Message from '../components/Message'
import createMarkup from '../utils/DOMSanitizer'
import { TRAINING_ADD_STUDENT_RESET, TRAINING_ALL_RESET, TRAINING_PUBLIC_RESET } from '../constants/trainingConstants'
import Messanger from '../components/Messanger'
import Meta from '../utils/Meta'

const OfferScreen = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const tab = location.state?.tab

    // company information
    const [companyId, setCompanyId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyImage, setCompanyImage] = useState('')
    const [companyEmail, setCompanyEmail] = useState('')
    const [companyAddress, setCompanyAddress] = useState('')
    const [companySite, setCompanySite] = useState('')
    const [companyPostalAddress, setCompanyPostalAddress] = useState('')

    // offer information
    const [trainingName, setTrainingName] = useState('')
    const [trainingDesc, setTrainingDesc] = useState('')
    const [trainingPlace, setTrainingPlace] = useState('')
    const [trainingPrice, setTrainingPrice] = useState('')
    const [trainingStartDate, setTrainingStartDate] = useState('')
    const [trainingEndDate, setTrainingEndDate] = useState('')
    const [trainingTags, setTrainingTags] = useState('')
    const [trainingCreatedAt, setTrainingCreatedAt] = useState('')
    const [trainingApplicants, setTrainingApplicants] = useState([])
    const [trainingAccepted, setTrainingAccepted] = useState([])
    const [trainingIsPublic, setTrainingIsPublic] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const trainingGet = useSelector(state => state.trainingGet)
    const { loading, error, training } = trainingGet

    const trainingAddStudent = useSelector(state => state.trainingAddStudent)
    const { success } = trainingAddStudent

    const trainingPublic = useSelector(state => state.trainingPublic)
    const { success: successUpdateToPublic } = trainingPublic

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else if (!training || success || successUpdateToPublic) {
            dispatch(getTraining(id))
        } else {
            setCompanyId(training.company._id)
            setCompanyName(training.company.name)
            setCompanyImage(training.company.image)
            setCompanyEmail(training.company.email)
            setCompanyAddress(training.company.address)
            setCompanySite(training.company.site)
            setCompanyPostalAddress(training.company.postalAddress)
            setTrainingName(training.name)
            setTrainingDesc(training.desc)
            setTrainingPlace(training.place)
            setTrainingPrice(training.price)
            setTrainingStartDate(training.startDate)
            setTrainingEndDate(training.endDate)
            setTrainingTags(training.tags)
            setTrainingCreatedAt(training.createdAt)
            setTrainingApplicants(training.applicants)
            setTrainingIsPublic(training.isPublic)
            setTrainingAccepted(training.accepted)
        }
    }, [userInfo, dispatch, navigate, training, id, success, successUpdateToPublic])

    useEffect(() => {
        if (successUpdateToPublic) {
            dispatch({
                type: TRAINING_PUBLIC_RESET,
            })
        }
    }, [successUpdateToPublic])

    const handleUpdateToPublic = () => {
        dispatch(publicTraining(id, true))
        dispatch({
            type: TRAINING_ALL_RESET,
        })
    }

    useEffect(() => {
        if (error) {
            navigate('/profile')
        }
    }, [training, navigate])

    useEffect(() => {
        if (success) {
            dispatch({
                type: TRAINING_ADD_STUDENT_RESET,
            })
        }
    }, [success])

  return (
    <section className='offer-details'>
        <Sidebar />
        <Messanger />
        <Meta pageName={trainingName} />
        <div className="main-offer-details">
                    <div className="offer-blog-parent">
                    <button onClick={() => navigate(tab ? '/positions' : -1, {  state:  tab  })} className='back sbm'>
                        <BsChevronLeft />
                    </button>
                    {loading ? (
                    <div className='skelton-loader' style={{height: '430px'}} />
                    ) : (
                        <div className="offer-blog">
                    {userInfo._id === companyId && (
                        (!trainingIsPublic && (
                            <Message text='Your training is pending approval by admins' success />
                        ))
                    )}
                    {userInfo.isAdmin && (
                        <div className='admin-msg'>
                            {!trainingIsPublic && (
                            <>
                                <Message text='This training is pending approval by admins' success />
                                <div className="back" onClick={handleUpdateToPublic}>
                                    <BsCheck2 />
                                </div>
                            </>
                            )}
                        </div>
                    )}
                <h1><span>#</span>{trainingName}</h1>
                <div className="heading">
                    <div className="img">
                        <img src={companyImage==='/images/default-user.png' ? '/images/default-user.png' : `/${companyImage}`} alt={companyName} />
                    </div>
                    <div className="offer-blog-company">
                        <Link to={`/freelancers/entreprise/${companyId}`} className='link'>{companyName}</Link>
                        <span className='date'><i className='bold'>published on </i>
                            {new Date(trainingCreatedAt).toDateString()}
                        </span>
                    </div>
                </div>
                <div className="offer-body">
                    <div dangerouslySetInnerHTML={createMarkup(trainingDesc)} className='editor-text' />
                </div>
                <div className="tags">
                    {trainingTags && trainingTags.split(',').map(skill => {
                        return (
                            <span className="skill">{skill}</span>
                        )
                    })}
                </div>
            </div>
                    )}
                </div>
            <div className="other-offers">
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px', marginBottom: '1.5rem'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Training details
                    </header>
                    <div className="offer-info-body">
                        <p className='place'><strong>Place</strong>{trainingPlace}</p>
                        <p><strong>Price</strong>{(trainingPrice)}DA</p>
                        <p><strong>Start Date</strong>
                            <span>
                                {trainingStartDate.substr(8, 2)} {determineMonth(trainingStartDate.substr(5, 2))} {trainingStartDate.substr(0, 4)}
                            </span>
                        </p>
                        <p><strong>End Date</strong>
                            <span className={Date.now() > new Date(trainingEndDate).getTime() ? 'ended' : 'available'}>
                                {trainingEndDate.substr(8, 2)} {determineMonth(trainingEndDate.substr(5, 2))} {trainingEndDate.substr(0, 4)}
                            </span>
                        </p>
                    </div>
                    <div className="buttons" style={userInfo.isCompany ? {gridTemplateColumns: '1fr'} : null}>
                        <button className='light-btn applicants-btn' style={userInfo.isCompany ? {borderRight: 'none'} : null}>
                            {training && trainingApplicants.length} Applicants
                        </button>
                        {!userInfo.isCompany && (
                            <button onClick={() => dispatch(addTrainingStudent(id))} className='light-btn' style={(trainingApplicants.includes(userInfo._id) || trainingAccepted.includes(userInfo._id)) ? {userSelect: 'none', pointerEvents: 'none', color: '#999'} : null}>
                                <span>
                                    {!trainingApplicants.includes(userInfo._id) ? <MdWorkOutline className='icon' /> : <MdWork className='icon' />}
                                    {(!trainingApplicants.includes(userInfo._id) && !trainingAccepted.includes(userInfo._id)) ? 'Apply' : 'Applied'}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
                )}
                {loading ? (
                    <div className='skelton-loader' style={{height: '170px'}} />
                ) : (
                    <div className="offer-info">
                    <header className="card-header">
                        Company details
                    </header>
                    <div className="offer-info-body">
                        <p className='link'><strong>Email</strong><a href={`mailto:${{companyEmail}}`}>{companyEmail}</a></p>
                        <p className='address'><strong>Address</strong>{companyAddress}</p>
                        <p><strong>Postal Address</strong>{companyPostalAddress}</p>
                        <p className='link'><strong>Website</strong><a href={`https://${{companySite}}`}>{companySite}</a></p>
                    </div>
                </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default OfferScreen